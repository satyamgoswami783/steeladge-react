const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerLen = 6 + 16 * numImages;
  let offset = headerLen;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // icon type
  header.writeUInt16LE(numImages, 4);

  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(item.buffer.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    entries.push(entry);
    offset += item.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
}

async function run() {
  const rootDir = path.resolve(__dirname, '..');
  
  // Use the authentic logo-badge.png (from WhatsApp client source) as the master source
  const badgePath = path.join(rootDir, 'public/logo-badge.png');
  const badgeBuffer = fs.readFileSync(badgePath);
  const svgPath = path.join(rootDir, 'public/steelage-logo-white-bg.svg');

  // Render high-res base PNG (512x512) with clean white background and balanced padding
  const base512 = await sharp(badgeBuffer)
    .resize(460, 460, { fit: 'contain' })
    .extend({ top: 26, bottom: 26, left: 26, right: 26, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toBuffer();

  const s16 = await sharp(base512).resize(16, 16).png().toBuffer();
  const s32 = await sharp(base512).resize(32, 32).png().toBuffer();
  const s48 = await sharp(base512).resize(48, 48).png().toBuffer();
  const s64 = await sharp(base512).resize(64, 64).png().toBuffer();
  const s192 = await sharp(base512).resize(192, 192).png().toBuffer();

  const icoBuffer = await createIco([
    { width: 16, height: 16, buffer: s16 },
    { width: 32, height: 32, buffer: s32 },
    { width: 48, height: 48, buffer: s48 }
  ]);

  // 1. Save in steelage -react/public
  const reactPublic = path.join(rootDir, 'public');
  fs.writeFileSync(path.join(reactPublic, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(reactPublic, 'favicon-16x16.png'), s16);
  fs.writeFileSync(path.join(reactPublic, 'favicon-32x32.png'), s32);
  fs.writeFileSync(path.join(reactPublic, 'favicon-48x48.png'), s48);
  fs.writeFileSync(path.join(reactPublic, 'apple-touch-icon.png'), s192);
  fs.writeFileSync(path.join(reactPublic, 'android-chrome-192x192.png'), s192);
  fs.writeFileSync(path.join(reactPublic, 'android-chrome-512x512.png'), base512);
  fs.copyFileSync(svgPath, path.join(reactPublic, 'favicon.svg'));

  console.log('Saved proper Steelage logo favicon suite to steelage -react/public/');

  // 2. Sync to Next.js project (steelage)
  const steelageDir = path.resolve(rootDir, '../steelage');
  if (fs.existsSync(steelageDir)) {
    const nextAppDir = path.join(steelageDir, 'src/app');
    if (fs.existsSync(nextAppDir)) {
      fs.writeFileSync(path.join(nextAppDir, 'favicon.ico'), icoBuffer);
      fs.writeFileSync(path.join(nextAppDir, 'icon.png'), s32);
      fs.writeFileSync(path.join(nextAppDir, 'apple-icon.png'), s192);
      fs.copyFileSync(svgPath, path.join(nextAppDir, 'icon.svg'));
      console.log('Updated Next.js src/app (favicon.ico, icon.png, apple-icon.png, icon.svg)');
    }

    const nextPublicDir = path.join(steelageDir, 'public');
    if (fs.existsSync(nextPublicDir)) {
      fs.writeFileSync(path.join(nextPublicDir, 'favicon.ico'), icoBuffer);
      fs.writeFileSync(path.join(nextPublicDir, 'favicon-16x16.png'), s16);
      fs.writeFileSync(path.join(nextPublicDir, 'favicon-32x32.png'), s32);
      fs.writeFileSync(path.join(nextPublicDir, 'apple-touch-icon.png'), s192);
      fs.copyFileSync(svgPath, path.join(nextPublicDir, 'favicon.svg'));
      console.log('Updated Next.js public/ directory');
    }

    const nextOutDir = path.join(steelageDir, 'out');
    if (fs.existsSync(nextOutDir)) {
      fs.writeFileSync(path.join(nextOutDir, 'favicon.ico'), icoBuffer);
      console.log('Updated Next.js out/favicon.ico');
    }
  }
}

run().catch(console.error);
