module.exports = {
  parser: '@babel/eslint-parser',
  extends: ['standard', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended'],
    },
  ],
}
