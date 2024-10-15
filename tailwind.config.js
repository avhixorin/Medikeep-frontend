/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
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
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
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
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
        'custom-dark': '0 4px 6px rgba(21, 16, 48, 0.1), 0 1px 3px rgba(21, 16, 48, 0.06)',
      },
      backgroundImage: {
        'doctors': 'url("./public/publicAssets/homepage/doctors.png")',
        'signInLogo': 'url("./public/publicAssets/homepage/signInLogo.png")',
        'sign-in': 'url("./src/assets/sign-in.png")',
        'sign-up': 'url("./src/assets/sign-up.png")',
        'herobg': 'url("./src/assets/homepage/herobg.png")',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'oleo': ["Oleo Script", 'cursive'],
        'playwrite': ["Playwrite IN", 'cursive'],
        'lato': ['Lato', 'sans-serif'],
        'helmet': ['Helmet', 'sans-serif'],
        'frick':['Frick','sans-serif'],
        'rozha':['Rozha One','serif'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarColor: "rgb(193, 193, 193) transparent",
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar:hover": {
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgb(193, 193, 193)",
            borderRadius: "20px",
          },
        },
      };
      addUtilities(newUtilities, ['responsive', 'dark', 'hover']);
    },
  ],
  
    
}