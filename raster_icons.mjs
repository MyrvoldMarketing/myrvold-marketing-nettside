// Regenerates the service-icon WebPs from their source SVGs.
//   node raster_icons.mjs
// Sources live in icons-src/ (kept out of public/ so the heavy raster-wrapped
// SVGs aren't served). Outputs go to public/icons/<name>.webp at 256px.
import sharp from 'sharp';
import { writeFileSync } from 'fs';
const icons = ['globe','search','facebook','shop','pen'];
let totalIn = 0, totalOut = 0;
for (const name of icons) {
  const src = `icons-src/${name}.svg`;
  const png = await sharp(src, { density: 300 })
    .resize(256, 256, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } })
    .toBuffer();
  // try lossy and lossless webp, keep smaller
  const lossy = await sharp(png).webp({ quality: 88, effort: 6 }).toBuffer();
  const lossless = await sharp(png).webp({ lossless: true, effort: 6 }).toBuffer();
  const best = lossless.length < lossy.length ? lossless : lossy;
  const kind = lossless.length < lossy.length ? 'lossless' : 'lossy';
  writeFileSync(`public/icons/${name}.webp`, best);
  const { statSync } = await import('fs');
  const inSize = statSync(src).size;
  totalIn += inSize; totalOut += best.length;
  console.log(`${name}: ${(inSize/1024).toFixed(0)}KB svg -> ${(best.length/1024).toFixed(1)}KB webp (${kind})`);
}
console.log(`TOTAL: ${(totalIn/1024).toFixed(0)}KB -> ${(totalOut/1024).toFixed(1)}KB`);
