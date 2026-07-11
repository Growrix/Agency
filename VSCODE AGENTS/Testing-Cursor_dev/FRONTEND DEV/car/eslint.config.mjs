import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    files: ["src/components/pages/native/**/*.tsx"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "jsx-a11y/alt-text": "off",
    },
  },
  {
    files: [
      "src/components/site/parity-home.tsx",
      "src/components/site/header.tsx",
      "src/components/site/footer.tsx",
      "src/components/site/page-shell.tsx",
    ],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "jsx-a11y/alt-text": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/**",
    "DOC/**",
    "memories/**",
    "Car-subdomain/**",
  ]),
]);
