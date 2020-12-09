module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['svelte3'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', 'src']],
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'global-require': 0,
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/no-mutable-exports': 0,
        'import/first': 0,
        'import/no-duplicates': 0,
        'import/order': 0,
        'import/no-unresolved': 0,
        'import/prefer-default-export': 0,
        'no-labels': 0,
        'no-restricted-syntax': 0,
      },
    },
  ],
};
