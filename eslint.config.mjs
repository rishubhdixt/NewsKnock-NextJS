import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Convert classic ESLint config to flat config
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add custom rule overrides here
  {
    rules: {
      "@next/next/no-img-element": "off", // ✅ disable warning for <img>
    },
  },
];

export default eslintConfig;
