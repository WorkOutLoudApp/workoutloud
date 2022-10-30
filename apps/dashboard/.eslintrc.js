module.exports = {
  ...require('@shared/eslint-presets/next'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
  "react/function-component-definition": [
    2,
    {
      namedComponents: "function-declaration",
    },
  ],
}
