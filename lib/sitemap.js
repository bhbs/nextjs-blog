/* eslint-disable */

const sitemap = require("nextjs-sitemap-generator");

sitemap({
  baseUrl: "https://blog.mimaty.com",
  pagesDirectory: __dirname + "/../.next/server/pages",
  targetDirectory: "public/",
  ignoredExtensions: ["js", "map"],
});