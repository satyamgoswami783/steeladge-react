import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function run() {
  const { projectsData } = await import('../src/data/projects.js');
  let totalSaved = 0;

  for (const project of projectsData) {
    const relPath = project.image.replace(/^\//, '');
    const fullPath = path.join(rootDir, 'public', relPath);

    if (!fs.existsSync(fullPath)) continue;

    const fileBuf = fs.readFileSync(fullPath);
    const origSize = fileBuf.length;

    if (origSize > 120 * 1024) {
      const meta = await sharp(fileBuf).metadata();
      const targetWidth = Math.min(meta.width || 1000, 960);

      let optimizedBuf;
      if (relPath.endsWith('.png')) {
        // If PNG is a photo without alpha, convert to high-quality JPEG to reduce from 3.7MB to 70KB
        const hasAlpha = meta.hasAlpha;
        if (!hasAlpha) {
          optimizedBuf = await sharp(fileBuf)
            .resize({ width: targetWidth, withoutEnlargement: true })
            .jpeg({ quality: 84, mozjpeg: true })
            .toBuffer();
        } else {
          optimizedBuf = await sharp(fileBuf)
            .resize({ width: targetWidth, withoutEnlargement: true })
            .png({ quality: 85, compressionLevel: 8 })
            .toBuffer();
        }
      } else {
        optimizedBuf = await sharp(fileBuf)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .jpeg({ quality: 84, mozjpeg: true })
          .toBuffer();
      }

      if (optimizedBuf.length < origSize) {
        fs.writeFileSync(fullPath, optimizedBuf);
        totalSaved += (origSize - optimizedBuf.length);
        console.log(`✓ ${project.slug}: ${Math.round(origSize / 1024)}KB -> ${Math.round(optimizedBuf.length / 1024)}KB`);

        // Also sync to Next.js repository if present
        const nextFullPath = path.resolve(rootDir, '../steelage', 'public', relPath);
        if (fs.existsSync(path.dirname(nextFullPath))) {
          fs.writeFileSync(nextFullPath, optimizedBuf);
        }
      }
    }
  }

  console.log(`Total data saved: ${Math.round(totalSaved / 1024)} KB!`);
}

run().catch(console.error);
