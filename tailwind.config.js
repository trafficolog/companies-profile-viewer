// tailwind.config.js
import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        // Define custom primary color and its variants
        primary: {
          50: '#fbe9ec',
          100: '#f8d2d9',
          200: '#f0a5b3',
          300: '#e8798d',
          400: '#e04c67',
          500: '#ba0c2e', // Main primary color
          600: '#950a25',
          700: '#70071c',
          800: '#4c0512',
          900: '#270209',
        }
      }
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      // Add custom theme to the plugin
      themes: {
        light: {
          colors: {
            // Override HeroUI primary colors
            primary: {
              50: '#fbe9ec',
              100: '#f8d2d9',
              200: '#f0a5b3',
              300: '#e8798d',
              400: '#e04c67',
              500: '#ba0c2e', // Main primary color
              600: '#950a25',
              700: '#70071c',
              800: '#4c0512',
              900: '#270209',
              DEFAULT: '#ba0c2e',
              foreground: '#ffffff'
            }
          }
        },
        dark: {
          colors: {
            // Override HeroUI primary colors for dark mode
            primary: {
              50: '#270209',
              100: '#4c0512',
              200: '#70071c',
              300: '#950a25',
              400: '#ba0c2e', 
              500: '#e04c67', // Main primary color in dark mode (brighter)
              600: '#e8798d',
              700: '#f0a5b3',
              800: '#f8d2d9',
              900: '#fbe9ec',
              DEFAULT: '#e04c67',
              foreground: '#000000'
            }
          }
        }
      }
    })
  ]
}

module.exports = config