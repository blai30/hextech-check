import type { Config } from 'prettier'

const config: Config = {
  plugins: ['prettier-plugin-tailwindcss'],
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'es5',
}

export default config
