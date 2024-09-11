import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontWeight: {
        extralight: "100",
        lightbold: "400",
        // 필요에 따라 더 추가할 수 있습니다.
      },
      height: {
        "7vh": "7vh",
      },
    },
  },
  plugins: [],
};
export default config;
