module.exports = {
  ...require('@shared/eslint-presets/next'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
}
