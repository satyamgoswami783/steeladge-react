const fs = require('fs');
const path = require('path');

const layoutPath = 'D:/kiaan/steelage/src/app/layout.tsx';
if (fs.existsSync(layoutPath)) {
  let code = fs.readFileSync(layoutPath, 'utf8');
  
  code = code.replace(
    /icons:\s*\{[\s\S]*?apple:\s*["'][^"']+["'],?\s*\}/,
    `icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }`
  );

  fs.writeFileSync(layoutPath, code, 'utf8');
  console.log('Successfully updated layout.tsx icons in Next.js repo');
} else {
  console.log('layoutPath not found');
}
