/** @type {import('tailwindcss').Config} */
import { mfeShellSafelist } from './scripts/mfe-shell-safelist.js';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Include the React MFE Shell package for proper class detection
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.{js,cjs}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Add the color palette that matches our CSS custom properties
      colors: {
        primary: {
          50: 'rgb(239 246 255)',
          100: 'rgb(219 234 254)',
          200: 'rgb(191 219 254)',
          300: 'rgb(147 197 253)',
          400: 'rgb(96 165 250)',
          500: 'rgb(59 130 246)',
          600: 'rgb(37 99 235)',
          700: 'rgb(29 78 216)',
          800: 'rgb(30 64 175)',
          900: 'rgb(30 58 138)',
        },
        success: {
          50: 'rgb(240 253 244)',
          100: 'rgb(220 252 231)',
          200: 'rgb(187 247 208)',
          300: 'rgb(134 239 172)',
          400: 'rgb(74 222 128)',
          500: 'rgb(34 197 94)',
          600: 'rgb(22 163 74)',
          700: 'rgb(21 128 61)',
          800: 'rgb(22 101 52)',
          900: 'rgb(20 83 45)',
        },
        warning: {
          50: 'rgb(255 251 235)',
          100: 'rgb(254 243 199)',
          200: 'rgb(253 230 138)',
          300: 'rgb(252 211 77)',
          400: 'rgb(251 191 36)',
          500: 'rgb(245 158 11)',
          600: 'rgb(217 119 6)',
          700: 'rgb(180 83 9)',
          800: 'rgb(146 64 14)',
          900: 'rgb(120 53 15)',
        },
        danger: {
          50: 'rgb(254 242 242)',
          100: 'rgb(254 226 226)',
          200: 'rgb(254 202 202)',
          300: 'rgb(252 165 165)',
          400: 'rgb(248 113 113)',
          500: 'rgb(239 68 68)',
          600: 'rgb(220 38 38)',
          700: 'rgb(185 28 28)',
          800: 'rgb(153 27 27)',
          900: 'rgb(127 29 29)',
        },
        error: {
          50: 'rgb(254 242 242)',
          100: 'rgb(254 226 226)',
          200: 'rgb(254 202 202)',
          300: 'rgb(252 165 165)',
          400: 'rgb(248 113 113)',
          500: 'rgb(239 68 68)',
          600: 'rgb(220 38 38)',
          700: 'rgb(185 28 28)',
          800: 'rgb(153 27 27)',
          900: 'rgb(127 29 29)',
        },
        // Semantic colors using CSS custom properties
        background: {
          primary: 'rgb(var(--color-background-primary))',
          secondary: 'rgb(var(--color-background-secondary))',
        },
        surface: {
          primary: 'rgb(var(--color-surface-primary))',
          secondary: 'rgb(var(--color-surface-secondary))',
          tertiary: 'rgb(var(--color-surface-tertiary))',
          elevated: 'rgb(var(--color-surface-elevated))',
        },
        text: {
          primary: 'rgb(var(--color-text-primary))',
          secondary: 'rgb(var(--color-text-secondary))',
          tertiary: 'rgb(var(--color-text-tertiary))',
          inverse: 'rgb(var(--color-text-inverse))',
          disabled: 'rgb(var(--color-text-disabled))',
        },
        border: {
          primary: 'rgb(var(--color-border-primary))',
          secondary: 'rgb(var(--color-border-secondary))',
          tertiary: 'rgb(var(--color-border-tertiary))',
          focus: 'rgb(var(--color-border-focus))',
        },
      },
      // Minimal extensions for app-specific needs
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
    },
  },
  // Use the MFE Shell safelist which includes dark mode classes
  safelist: mfeShellSafelist,
  plugins: [],
};