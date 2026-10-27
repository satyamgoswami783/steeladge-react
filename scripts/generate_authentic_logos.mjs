import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateAuthenticLogos() {
  const inputPath = 'public/WhatsApp Image 2026-09-07 at 12.14.42 PM.jpeg';
  const img = sharp(inputPath);
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;

  // 1. Content bounds
  let minX = W, maxX = 0, minY = H, maxY = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const idx = (y * W + x) * 3;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 240 || g < 240 || b < 240) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add 1px padding
  minX = Math.max(0, minX - 1);
  maxX = Math.min(W - 1, maxX + 1);
  minY = Math.max(0, minY);
  maxY = Math.min(H - 1, maxY + 1);

  const cW = maxX - minX + 1;
  const cH = maxY - minY + 1;

  // Upscale to high-res master (1024 width)
  const scale = 4;
  const targetW = cW * scale;
  const targetH = cH * scale;

  const cropped = await sharp(inputPath)
    .extract({ left: minX, top: minY, width: cW, height: cH })
    .resize(targetW, targetH, { kernel: 'lanczos3' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const cData = cropped.data;

  // Dividing bar Y
  let barY = Math.floor(targetH * 0.65);
  for (let y = Math.floor(targetH * 0.60); y < Math.floor(targetH * 0.70); y++) {
    let dark = 0;
    for (let x = Math.floor(targetW * 0.2); x < Math.floor(targetW * 0.8); x++) {
      const idx = (y * targetW + x) * 3;
      if (cData[idx] < 60 && cData[idx+1] < 60 && cData[idx+2] < 60) dark++;
    }
    if (dark > targetW * 0.5) {
      barY = y;
      break;
    }
  }

  const darkBuf = Buffer.alloc(targetW * targetH * 4);
  const lightBuf = Buffer.alloc(targetW * targetH * 4);
  const badgeBuf = Buffer.alloc(targetW * targetH * 4);

  // First pass: classify background vs foreground
  const isBg = new Uint8Array(targetW * targetH);
  for (let y = 0; y < targetH; y++) {
    for (let x = 0; x < targetW; x++) {
      const idx = y * targetW + x;
      const sIdx = idx * 3;
      const r = cData[sIdx], g = cData[sIdx+1], b = cData[sIdx+2];
      const minRGB = Math.min(r, g, b);
      const sat = Math.max(r, g, b) - minRGB;
      if (minRGB >= 244 && sat < 15) {
        isBg[idx] = 1;
      }
    }
  }

  for (let y = 0; y < targetH; y++) {
    for (let x = 0; x < targetW; x++) {
      const idx = y * targetW + x;
      const sIdx = idx * 3;
      const dIdx = idx * 4;

      const r = cData[sIdx];
      const g = cData[sIdx+1];
      const b = cData[sIdx+2];

      const minRGB = Math.min(r, g, b);
      const maxRGB = Math.max(r, g, b);
      const sat = maxRGB - minRGB;

      // Badge buffer
      badgeBuf[dIdx] = r;
      badgeBuf[dIdx+1] = g;
      badgeBuf[dIdx+2] = b;
      badgeBuf[dIdx+3] = 255;

      // Check distance to pure white
      let alpha = 255;
      if (minRGB >= 246 && sat < 12) {
        alpha = 0;
      } else if (minRGB >= 236 && sat < 15) {
        alpha = Math.round(255 * (246 - minRGB) / 10);
      } else if (minRGB >= 215 && sat < 20) {
        alpha = Math.round(255 * (246 - minRGB) / 31);
      }

      if (alpha === 0) {
        darkBuf[dIdx+3] = 0;
        lightBuf[dIdx+3] = 0;
        continue;
      }

      const isTextRegion = (y >= barY - 14);

      // Color detection:
      // Dark/Black:
      const isBlack = (maxRGB < 65) || (minRGB < 50 && sat < 25);
      // Blue:
      const isBlue = (b > 120 && b - r > 40 && b - g > 20);
      // Red:
      const isRed = (r > 130 && r - b > 50 && r - g > 50);
      // Orange:
      const isOrange = (r > 160 && g > 90 && b < 80 && r - g > 25);
      // Green:
      const isGreen = (g > 100 && g - r > 15 && g - b > 40);

      let fgR = r, fgG = g, fgB = b;
      if (alpha < 255) {
        // If near background, clamp edge to avoid white halo
        if (isBlack || isTextRegion) {
          fgR = 17; fgG = 24; fgB = 39;
        } else if (isBlue) {
          fgR = 0; fgG = 159; fgB = 227;
        } else if (isRed) {
          fgR = 227; fgG = 6; fgB = 19;
        } else if (isOrange) {
          fgR = 250; fgG = 166; fgB = 26;
        } else if (isGreen) {
          fgR = 140; fgG = 198; fgB = 63;
        } else {
          // If in towers region but shadow border:
          fgR = 17; fgG = 24; fgB = 39;
        }
      }

      // 1. Dark logo
      if (isBlack || (isTextRegion && minRGB < 150)) {
        darkBuf[dIdx] = 17;
        darkBuf[dIdx+1] = 24;
        darkBuf[dIdx+2] = 39;
      } else {
        darkBuf[dIdx] = fgR;
        darkBuf[dIdx+1] = fgG;
        darkBuf[dIdx+2] = fgB;
      }
      darkBuf[dIdx+3] = alpha;

      // 2. Light logo (for dark background)
      if (isTextRegion) {
        lightBuf[dIdx] = 255;
        lightBuf[dIdx+1] = 255;
        lightBuf[dIdx+2] = 255;
      } else {
        if (isBlack) {
          lightBuf[dIdx] = 17;
          lightBuf[dIdx+1] = 24;
          lightBuf[dIdx+2] = 39;
        } else {
          lightBuf[dIdx] = fgR;
          lightBuf[dIdx+1] = fgG;
          lightBuf[dIdx+2] = fgB;
        }
      }
      lightBuf[dIdx+3] = alpha;
    }
  }

  const darkPng = await sharp(darkBuf, { raw: { width: targetW, height: targetH, channels: 4 } }).png().toBuffer();
  const lightPng = await sharp(lightBuf, { raw: { width: targetW, height: targetH, channels: 4 } }).png().toBuffer();
  const badgePng = await sharp(badgeBuf, { raw: { width: targetW, height: targetH, channels: 4 } }).png().toBuffer();

  // Create preview on dark background (#08171A)
  const preview = await sharp({
    create: { width: (targetW + 60) * 2, height: targetH + 60, channels: 4, background: { r: 8, g: 23, b: 26, alpha: 1 } }
  }).composite([
    { input: lightPng, left: 30, top: 30 },
    { input: badgePng, left: targetW + 90, top: 30 }
  ]).png().toFile('public/test-defringed-preview.png');

  console.log('Saved test-defringed-preview.png');

  // Let's now deploy these authentic logos to replace ALL the bad AI files!
  const targets = [
    // 1. Dark variant transparent (black text for light bg)
    { path: 'public/logo-transparent.png', buf: darkPng },
    // 2. Light variant transparent (white text for dark header/footer)
    { path: 'public/logo-transparent-light.png', buf: lightPng },
    // 3. new-logo.png
    { path: 'public/new-logo.png', buf: darkPng },
    // 4. images/assets/logo.png
    { path: 'public/images/assets/logo.png', buf: darkPng },
    // 5. steelage-official-logo.png
    { path: 'public/images/steelage-official-logo.png', buf: darkPng },
    // 6. steelage-exact-logo-transparent.png
    { path: 'public/images/steelage-exact-logo-transparent.png', buf: darkPng },
    // 7. Badge version (white bg, crisp)
    { path: 'public/logo-badge.png', buf: badgePng },
  ];

  for (const t of targets) {
    fs.writeFileSync(t.path, t.buf);
    console.log(`Updated ${t.path}`);
  }

  // Also sync to dist if dist exists
  if (fs.existsSync('dist')) {
    const distTargets = [
      { path: 'dist/logo-transparent.png', buf: darkPng },
      { path: 'dist/logo-transparent-light.png', buf: lightPng },
      { path: 'dist/new-logo.png', buf: darkPng },
      { path: 'dist/images/assets/logo.png', buf: darkPng },
      { path: 'dist/logo-badge.png', buf: badgePng },
    ];
    for (const dt of distTargets) {
      const p = path.dirname(dt.path);
      if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
      fs.writeFileSync(dt.path, dt.buf);
      console.log(`Updated ${dt.path}`);
    }
  }

  // Also sync to ../steelage if it exists
  const nextDir = path.resolve('..', 'steelage');
  if (fs.existsSync(nextDir)) {
    const nextTargets = [
      'logo-transparent.png',
      'logo-transparent-light.png',
      'new-logo.png',
      'logo-badge.png',
    ];
    for (const file of nextTargets) {
      const srcFile = path.join('public', file);
      const destFile = path.join(nextDir, 'public', file);
      if (fs.existsSync(srcFile) && fs.existsSync(path.dirname(destFile))) {
        fs.copyFileSync(srcFile, destFile);
        console.log(`Synced to Next.js: ${destFile}`);
      }
    }
  }
}

generateAuthenticLogos().catch(console.error);
