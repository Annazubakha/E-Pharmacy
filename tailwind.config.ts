import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "sm-max": { max: "374.99px" },
      md: "768px",
      lg: "1440px",
    },
    fontFamily: {
      inter: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ],
    },
    extend: {
      colors: {
        "color-bg": "#f7f7f7",
        "my-green": "#59B17A",
        "green-dark": "#3F945F",
        "green-bg": "#e7f1ed",
        "green-super-light": "rgba(231, 241, 237, 0.4);",
        "green-10": "rgba(89, 177, 122, 0.1)",
        "my-black": "#1D1E21",
        "gris-dark": "#93939A",
        "my-yellow": "#FFC531",
        "my-red": "#E85050",
        "red-10": "rgba(232, 80, 80, 0.1)",
        "my-white": "#f7f8fa",
        "white-second": "#FDFDFD",
        "white-text": "#f1f1f1",
        "before-color": "rgba(247, 248, 250, 0.3)",
        "border-color-50": "rgba(241, 241, 241, 0.5);",
        "loader-bg": "rgba(63, 148, 95, 0.5);",
        "burger-menu-bg": "rgba(29, 30, 33, 0.45);",
        "nav-bg": "#d9d9d9",
        "social-media-hover-color": "rgba(247, 248, 250, 0.5);",
        "input-border-color": "rgba(29, 30, 33, 0.1)",
        "gris-light": "rgba(29, 30, 33, 0.6)",
      },
    },
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    ({ addComponents }) => {
      addComponents({
        ".container": {
          minWidth: "320px",
          maxWidth: "375px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "20px",
          paddingRight: "20px",
          "@screen md": {
            paddingLeft: "32px",
            paddingRight: "32px",
            maxWidth: "768px",
          },
          "@screen lg": {
            paddingLeft: "128px",
            paddingRight: "128px",
            maxWidth: "1440px",
          },
        },
      });
    },
  ],
} satisfies Config;
