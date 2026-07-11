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
        primary: "var(--color-primary)",
        background: {
          page: "var(--color-bg-page)",
          section: "var(--color-bg-surface)",
          elevated: "var(--color-bg-elevated)",
        },
        text: {
          body: "var(--color-text-body)",
          heading: "var(--color-text-heading)",
          muted: "var(--color-text-muted)",
          inverse: "var(--color-text-inverse)",
        },
      },
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      maxWidth: {
        container: "var(--layout-container-max)",
      },
      spacing: {
        section: "var(--space-section-y)",
        sectionMobile: "var(--space-section-y-mobile)",
      },
    },
  },
  plugins: [],
};

export default config;
