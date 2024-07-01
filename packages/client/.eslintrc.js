module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:import/typescript',
    'prettier',
    'plugin:import/warnings',
  ],
  plugins: ['tailwindcss', '@typescript-eslint'],
  settings: {
    tailwindcss: {
      callees: ['tw', 'cva'],
      cssFiles: ['src/app/globals.scss'],
    },
  },
  rules: {
    'react/jsx-curly-brace-presence': 'error',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
      },
    ],
  },
}
