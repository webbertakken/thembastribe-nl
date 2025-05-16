/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro"],
  options: {
    printWidth: 120,
    proseWrap: "always",
    astroSkipFrontmatter: false,
  },
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
        astroSkipFrontmatter: false,
      },
    },
  ],
};
