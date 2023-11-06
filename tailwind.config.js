/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        //my css colors
        white: {
          100: 'rgb(var(--white),1)',
          75: 'rgb(var(--white),0.75)',
          50: 'rgb(var(--white),0.5)',
          20: 'rgb(var(--white),0.2)',
          10: 'rgb(var(--white),0.1)',
          5: 'rgb(var(--white),0.05)',
        },
        black: {
          100: 'rgb(var(--black),1)',
          75: 'rgb(var(--black),0.75)',
          50: 'rgb(var(--black),0.5)',
          20: 'rgb(var(--black),0.2)',
          10: 'rgb(var(--black),0.1)',
          5: 'rgb(var(--black),0.05)',
        },
        action: {
          100: 'rgb(var(--yellow),1)',
          75: 'rgb(var(--yellow),0.75)',
          50: 'rgb(var(--yellow),0.5)',
          20: 'rgb(var(--yellow),0.2)',
          10: 'rgb(var(--yellow),0.1)',
        },
        level1: {
          100: 'rgb(var(--black-blue),1)',
          75: 'rgb(var(--black-blue),0.75)',
          50: 'rgb(var(--black-blue),0.5)',
          20: 'rgb(var(--black-blue),0.2)',
          10: 'rgb(var(--black-blue),0.1)',
        },
        level2: {
          100: 'rgb(var(--dark-blue),1)',
          75: 'rgb(var(--dark-blue),0.75)',
          50: 'rgb(var(--dark-blue),0.5)',
          20: 'rgb(var(--dark-blue),0.2)',
          10: 'rgb(var(--dark-blue),0.1)',
        },
        level3: 'rgb(var(--white),0.1)',
        green: {
          100: 'rgb(var(--green),1)',
          75: 'rgb(var(--green),0.75)',
          50: 'rgb(var(--green),0.5)',
          20: 'rgb(var(--green),0.2)',
          10: 'rgb(var(--green),0.1)',
        },
        salmon: {
          100: 'rgb(var(--salmon),1)',
          75: 'rgb(var(--salmon),0.75)',
          50: 'rgb(var(--salmon),0.5)',
          20: 'rgb(var(--salmon),0.2)',
          10: 'rgb(var(--salmon),0.1)',
        },
        emphasis: 'rgb(var(--lillish),1)',
        wording: 'rgb(var(--dark-lillish),1)',
        gradient: {
          top: 'rgb(var(--middle-blue),1)',
          bottom: 'rgb(var(--black-blue),1)', 
        },
        


        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        innercard: {
          DEFAULT: "var(--innercard)",
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
        "sm" : "0 -1px 0px 0px rgba(198,204,248,0.15)",
      },




      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}