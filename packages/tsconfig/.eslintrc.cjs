/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['geminai'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json'],
  },
}
