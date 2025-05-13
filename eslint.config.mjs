import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      "@next/next/no-img-element": "off", // allow using <img />
      "react/no-unescaped-entities": "off", // allow apostrophes and quotes
      "@typescript-eslint/no-explicit-any": "off", // allow use of 'any'
      "react-hooks/exhaustive-deps": "warn", // show warning but not error on missing deps
    },
  },
];

export default eslintConfig;
