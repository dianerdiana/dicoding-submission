# Feature-Based Clean Architecture (Light) — Example untuk Personal Project

Dokumen ini berisi struktur folder lengkap dan contoh kode minimal untuk **feature-based Clean Architecture** (lebih ringan dari DDD, cocok untuk solo/portfolio).

> Fokus: `users` dan `auth` feature, TypeScript + Hapi.js (struktur mudah diikuti & refactorable).

---

## Struktur Folder

```
src/
├── app/
│   ├── server.ts                # Hapi server bootstrap
│   ├── index.ts                 # entry point (start app)
│   └── config.ts                # konfigurasi env sederhana
│
├── features/
│   ├── users/
│   │   ├── domain/
│   │   │   ├── user.entity.ts
│   │   ├── application/
│   │   │   └── create-user.use-case.ts
│   │   ├── infrastructure/
│   │   │   └── user.repository.ts
│   │   └── interface/
│   │       ├── http/
│   │       │   ├── user.routes.ts
│   │       │   └── user.controller.ts
│   │       └── validators/
│   │           └── create-user.validator.ts
│   │
│   └── auth/
│       ├── application/
│       │   └── auth.service.ts
│       ├── infrastructure/
│       │   └── jwt.service.ts
│       └── interface/
│           └── http/
│               ├── auth.routes.ts
│               └── auth.controller.ts
│
├── shared/
│   ├── utils/
│   │   └── result.ts
│   └── libs/
│       └── in-memory-db.ts      # contoh DB in-memory untuk demo

├── tests/
└── package.json
```

---

## File contoh (singkat) — TypeScript

> Gunakan file-file ini sebagai starting point. Implementasi dibuat minimal agar mudah dipahami dan langsung jalan.

---

### `src/app/server.ts`

```ts
import Hapi from '@hapi/hapi';
import { userRoutes } from '../features/users/interface/http/user.routes';
import { authRoutes } from '../features/auth/interface/http/auth.routes';

export async function createServer() {
  const server = Hapi.server({
    port: process.env.PORT ? +process.env.PORT : 3000,
    host: '0.0.0.0',
  });

  server.route([...userRoutes, ...authRoutes]);

  return server;
}

if (require.main === module) {
  (async () => {
    const server = await createServer();
    await server.start();
    console.log('Server running on %s', server.info.uri);
  })();
}
```

---

### `src/shared/libs/in-memory-db.ts`

```ts
export const DB = {
  users: [] as any[],
};
```

---

### `src/features/users/domain/user.entity.ts`

```ts
import { UserEmail } from './user-email.vo';
import { v4 as uuidv4 } from 'uuid';

export class User {
  readonly id: string;
  readonly name: string;
  readonly email: UserEmail;
  readonly passwordHash: string;

  private constructor(id: string, name: string, email: UserEmail, passwordHash: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  static create({
    name,
    email,
    passwordHash,
  }: {
    name: string;
    email: string;
    passwordHash: string;
  }) {
    const id = uuidv4();
    return new User(id, name, new UserEmail(email), passwordHash);
  }

  static reconstitute({ id, name, email, passwordHash }: any) {
    return new User(id, name, new UserEmail(email), passwordHash);
  }
}
```

---

### `src/features/users/domain/user-email.vo.ts`

```ts
export class UserEmail {
  readonly value: string;

  constructor(value: string) {
    if (!value || !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      throw new Error('Invalid email');
    }
    this.value = value.toLowerCase();
  }

  equals(other: UserEmail) {
    return this.value === other.value;
  }
}
```

---

### `src/features/users/infrastructure/user.repository.ts`

```ts
import { DB } from '../../../shared/libs/in-memory-db';
import { User } from '../domain/user.entity';

export class UserRepository {
  async save(user: User) {
    DB.users.push({
      id: user.id,
      name: user.name,
      email: user.email.value,
      passwordHash: user.passwordHash,
    });
    return user;
  }

  async findByEmail(email: string) {
    const row = DB.users.find((u) => u.email === email.toLowerCase());
    return row ? User.reconstitute(row) : null;
  }

  async findById(id: string) {
    const row = DB.users.find((u) => u.id === id);
    return row ? User.reconstitute(row) : null;
  }
}
```

---

### `src/features/users/application/user.service.ts`

```ts
import { UserRepository } from '../infrastructure/user.repository';
import * as bcrypt from 'bcryptjs';
import { User } from '../domain/user.entity';
import { Result } from '../../../shared/utils/result';

export class UserService {
  constructor(private readonly userRepo = new UserRepository()) {}

  async register({ name, email, password }: { name: string; email: string; password: string }) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) return Result.fail('Email already used');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = User.create({ name, email, passwordHash });
    await this.userRepo.save(user);

    return Result.ok({ id: user.id, name: user.name, email: user.email.value });
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user) return null;
    const ok = await bcrypt.compare(password, (user as any).passwordHash);
    return ok ? user : null;
  }
}
```

---

### `src/features/users/interface/http/create-user.validator.ts`

```ts
import Joi from 'joi';

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
```

---

### `src/features/users/interface/http/user.controller.ts`

```ts
import { Request, ResponseToolkit } from '@hapi/hapi';
import { UserService } from '../../application/user.service';

export class UserController {
  constructor(private readonly userService = new UserService()) {}

  async register(request: Request, h: ResponseToolkit) {
    try {
      const { name, email, password } = request.payload as any;
      const res = await this.userService.register({ name, email, password });
      if (res.isFailure) return h.response({ error: res.error }).code(400);
      return h.response({ data: res.value }).code(201);
    } catch (err: any) {
      return h.response({ error: err.message }).code(500);
    }
  }
}
```

---

### `src/features/users/interface/http/user.routes.ts`

```ts
import { ServerRoute } from '@hapi/hapi';
import { UserController } from './user.controller';
import { createUserSchema } from './create-user.validator';

const controller = new UserController();

export const userRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/users',
    handler: controller.register.bind(controller),
    options: {
      validate: { payload: createUserSchema },
      auth: false,
      tags: ['api', 'users'],
      description: 'Register user',
    },
  },
];
```

---

### `src/features/auth/infrastructure/jwt.service.ts`

```ts
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

export class JwtService {
  sign(payload: any, opts?: any) {
    return jwt.sign(payload, SECRET, { expiresIn: '7d', ...opts });
  }

  verify(token: string) {
    try {
      return jwt.verify(token, SECRET);
    } catch (err) {
      return null;
    }
  }
}
```

---

### `src/features/auth/application/auth.service.ts`

```ts
import { UserService } from '../../users/application/user.service';
import { JwtService } from '../infrastructure/jwt.service';

export class AuthService {
  constructor(
    private readonly userService = new UserService(),
    private readonly jwtService = new JwtService(),
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.validateCredentials(email, password);
    if (!user) return null;

    const token = this.jwtService.sign({
      sub: (user as any).id,
      email: (user as any).email,
    });
    return { token };
  }
}
```

---

### `src/features/auth/interface/http/auth.controller.ts`

```ts
import { Request, ResponseToolkit } from '@hapi/hapi';
import { AuthService } from '../application/auth.service';

export class AuthController {
  constructor(private readonly authService = new AuthService()) {}

  async login(request: Request, h: ResponseToolkit) {
    try {
      const { email, password } = request.payload as any;
      const result = await this.authService.login(email, password);
      if (!result) return h.response({ error: 'Invalid credentials' }).code(401);
      return h.response({ data: result }).code(200);
    } catch (err: any) {
      return h.response({ error: err.message }).code(500);
    }
  }
}
```

---

### `src/features/auth/interface/http/auth.routes.ts`

```ts
import { ServerRoute } from '@hapi/hapi';
import { AuthController } from './auth.controller';

const controller = new AuthController();

export const authRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/auth/login',
    handler: controller.login.bind(controller),
    options: { auth: false, tags: ['api', 'auth'], description: 'User login' },
  },
];
```

---

### `src/shared/utils/result.ts`

```ts
export class Result<T = any> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error?: string | null;
  public value?: T | null;

  private constructor(isSuccess: boolean, error?: string | null, value?: T | null) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error || null;
    this.value = value || null;
  }

  static ok<U>(value?: U) {
    return new Result<U>(true, null, value || null);
  }

  static fail<U = any>(error: string) {
    return new Result<U>(false, error, null);
  }
}
```

---

## package.json (minimal)

```json
{
  "name": "clean-feature-sample",
  "version": "1.0.0",
  "main": "dist/app/server.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/app/server.ts",
    "build": "tsc",
    "start": "node dist/app/server.js"
  },
  "dependencies": {
    "@hapi/hapi": "latest",
    "bcryptjs": "latest",
    "joi": "latest",
    "jsonwebtoken": "latest",
    "uuid": "latest"
  },
  "devDependencies": {
    "ts-node-dev": "latest",
    "typescript": "latest",
    "@types/node": "latest",
    "@types/jsonwebtoken": "latest",
    "@types/joi": "latest"
  }
}
```

---

## Cara jalanin (dev)

1. `npm install`
2. `npm run dev`
3. POST `/users` + POST `/auth/login`

---

## Catatan & Tips Singkat

- Struktur ini ringan tapi terpisah secara jelas: **interface → application → domain → infrastructure**.
- Untuk project portfolio, tambahkan README dan sedikit dokumentasi (contoh request/response).
- Kalau mau pakai DB sungguhan: ganti `in-memory-db` & `user.repository` dengan ORM (Prisma/TypeORM/Sequelize).
- Tambahkan unit test sederhana untuk `UserService` & `AuthService`.

---

Kalau kamu mau, saya bisa:

- Generate versi lengkap file-file ini sebagai ZIP, atau
- Tambah middleware auth (JWT) di Hapi server, atau
- Tunjukkan contoh unit test untuk `UserService`.

Pilih salah satu ya — saya langsung buat.
