module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "@vue/typescript/recommended",
    "plugin:vue/recommended",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-unused-vars": 0,
    "indent": ["error", 2],
    "comma-dangle": ["error", "always-multiline"],
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {"delimiter": "none",},
    }],
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
