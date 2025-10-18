import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/**
 * ESLint v9+ Flat Config for TypeScript + Node (Hapi.js)
 * Ready to lint .ts, .mjs, .cjs, .js files without errors.
 */
export default tseslint.config(
  js.configs.recommended, // base JS rules
  ...tseslint.configs.recommended, // TypeScript recommended rules
  prettier, // disable conflicting formatting rules
  {
    files: ['**/*.{ts,js,mjs,cjs}'],
    ignores: ['dist', 'node_modules', '.env'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        ...globals.node, // because you're using Hapi (Node)
      },
    },
    plugins: { prettier: prettierPlugin },
    rules: {
      // --- Custom rules for better DX ---
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',
      'prettier/prettier': 'warn', // disable if you use prettier separately
    },
  },
);
