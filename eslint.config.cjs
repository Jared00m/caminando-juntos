const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')
const nextTypescript = require('eslint-config-next/typescript')

module.exports = [
  {
    ignores: [
      'eslint.config.*',
      'next.config.*',
      'postcss.config.*',
      'tailwind.config.*',
      '**/*.config.{js,cjs,mjs,ts,cts,mts}',
    ],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]
