import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
  extend: {
    fontFamily: {
      retro: ['"Press Start 2P"', 'monospace']
    }
  }
},
theme: {
    ...defaultConfig.theme,
    extend: {
       keyframes: {//
    heartbeat: {
      '0%, 100%': { transform: 'scale(1)' },
      '14%': { transform: 'scale(1.3)' },
      '28%': { transform: 'scale(1)' },
      '42%': { transform: 'scale(1.3)' },
      '70%': { transform: 'scale(1)' },
    },
  },
  animation: {
    heartbeat: 'heartbeat 1.4s ease-in-out infinite',
  },//
      ...defaultConfig.theme.extend,
      colors: {
        ...defaultConfig.theme.extend.colors,
        primary: {
          DEFAULT: "#ec4899",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#f97316",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#8b5cf6",
          foreground: "#ffffff",
        },
        neutral: "#374151",
        "base-100": "#ffffff",
        "base-200": "#f9fafb",
        "base-300": "#f3f4f6",
        "base-content": "#1f2937",
      },


      
    },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
        },
      },
      "cupcake", // predefined themes
    ],
    darkTheme: "dark",         // sets default dark theme
    base: true,
    styled: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: "",
  },
}


};
