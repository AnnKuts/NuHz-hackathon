module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './backend/tsconfig.json', // вказуємо точний tsconfig
    tsconfigRootDir: __dirname,        // базова директорія для шляху
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
};

