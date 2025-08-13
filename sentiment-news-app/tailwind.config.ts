import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBg: '#E6E8EA',
        lightCard: '#FFFFFF',
        lightText: '#010419',
        lightAccent: '#4051B5',

        darkBg: '#0a0a0a',
        darkCard: '#171717',
        darkText: '#ededed',
        darkAccent: '#4F8BFF',
      },
    },
  },
  plugins: [],
}

export default config