type ServiceInstances = Record<string, any>;

class ServiceContainer {
  private services: ServiceInstances = {};

  register<T>(name: string, instance: T): void {
    if (this.services[name]) {
      console.warn(`[ServiceContainer] Service '${name}' sudah terdaftar, akan ditimpa.`);
    }
    this.services[name] = instance;
  }

  get<T>(name: string, fallback?: () => T): T {
    const instance = this.services[name];
    if (!instance) {
      if (fallback) {
        const created = fallback();
        this.services[name] = created;
        return created;
      }
      throw new Error(`[ServiceContainer] '${name}' belum terdaftar.`);
    }
    return instance as T;
  }

  has(name: string): boolean {
    return Boolean(this.services[name]);
  }
}

export const container = new ServiceContainer();
