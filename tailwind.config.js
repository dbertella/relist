/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        //my css colors
        paper: {
          100: 'rgb(var(--paper),1)',
          75: 'rgb(var(--paper),0.75)',
          50: 'rgb(var(--paper),0.5)',
          20: 'rgb(var(--paper),0.2)',
          10: 'rgb(var(--paper),0.1)',
          5: 'rgb(var(--paper),0.05)',
        },
        ink: {
          100: 'rgb(var(--ink),1)',
          75: 'rgb(var(--ink),0.75)',
          50: 'rgb(var(--ink),0.5)',
          20: 'rgb(var(--ink),0.2)',
          10: 'rgb(var(--ink),0.1)',
          5: 'rgb(var(--ink),0.05)',
        },
        action: {
          100: 'rgb(var(--action),1)',
          75: 'rgb(var(--action),0.75)',
          50: 'rgb(var(--action),0.5)',
          20: 'rgb(var(--action),0.2)',
          10: 'rgb(var(--action),0.1)',
        },
        level1: {
          100: 'rgb(var(--level1),1)',
          75: 'rgb(var(--level1),0.75)',
          50: 'rgb(var(--level1),0.5)',
          20: 'rgb(var(--level1),0.2)',
          10: 'rgb(var(--level1),0.1)',
        },
        level2: {
          100: 'rgb(var(--level2),1)',
          75: 'rgb(var(--level2),0.75)',
          50: 'rgb(var(--level2),0.5)',
          20: 'rgb(var(--level2),0.2)',
          10: 'rgb(var(--level2),0.1)',
        },
        level3: 'rgb(var(--paper),0.05)',
        highlight: {
          100: 'rgb(var(--highlight),1)',
          75: 'rgb(var(--highlight),0.75)',
          50: 'rgb(var(--highlight),0.5)',
          20: 'rgb(var(--highlight),0.2)',
          10: 'rgb(var(--highlight),0.1)',
        },
        neon: {
          100: 'rgb(var(--neon),1)',
          75: 'rgb(var(--neon),0.75)',
          50: 'rgb(var(--neon),0.5)',
          20: 'rgb(var(--neon),0.2)',
          10: 'rgb(var(--neon),0.1)',
        },
        emphasis: 'rgb(var(--emphasis),1)',
        wording: 'rgb(var(--wording),1)',
        track: 'rgb(var(--wording),0.1)',
        gradient: {
          top: 'rgb(var(--gradient-top),1)',
          bottom: 'rgb(var(--gradient-bottom),1)',
        },
      },

      // my lineheights
      lineHeight: {
        'leading-tight': '1',
        'leading-snug': '1.3',
        'leading-normal': '1.5',
        'leading-relaxed': '1.6',
        'leading-loose': '1.8',
      },

      // my css boxshadow
      boxShadow: {
        sm: '0 -1px 0px 0px rgba(198,204,248,0.15)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 6px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
