import fs from "fs/promises";
import { servicesData } from "../src/data/services.js";
import { projectsData } from "../src/data/projects.js";

const baseUrl = "https://steelage.ca";
const today = new Date().toISOString().split("T")[0]; // e.g. "2026-10-26"

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

const staticRoutes = [
  "",
  "/services",
  "/projects",
  "/our-process",
  "/about",
  "/service-area",
  "/contact",
];

staticRoutes.forEach((r) => {
  xml += `  <url>\n    <loc>${baseUrl}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${r === "" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
});

servicesData.forEach((s) => {
  xml += `  <url>\n    <loc>${baseUrl}/services/${s.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
});

projectsData.forEach((p) => {
  xml += `  <url>\n    <loc>${baseUrl}/projects/${p.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
});

xml += "</urlset>\n";

await fs.writeFile("./public/sitemap.xml", xml, "utf8");
console.log("sitemap.xml generated with lastmod tags successfully in public directory!");
