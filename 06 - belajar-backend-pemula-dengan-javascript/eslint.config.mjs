import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/**
 * ESLint v9+ Flat Config
 * TypeScript + Node (Hapi.js)
 * Modern setup tanpa tseslint.config() (deprecated)
 */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // gunakan config baru dengan type checking
  prettier, // matikan aturan yang bentrok dengan Prettier
  {
    files: ['**/*.{ts,js,mjs,cjs}'],
    ignores: ['dist', 'node_modules', '.env'],
    languageOptions: {
      parser: tseslint.parser, // gunakan parser TypeScript modern
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // projectService: true,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
      '@typescript-eslint': tseslint.plugin, // tambahkan plugin TS secara eksplisit
    },
    rules: {
      // --- Custom rules for better DX ---
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off',

      // Prettier integration
      'prettier/prettier': 'off', // ubah ke 'warn' jika mau aktif lint-nya
    },
  },
];
