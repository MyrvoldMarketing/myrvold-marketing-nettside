/* Service icons. The illustrated ones (globe/search/facebook/shop/pen) were
   raster-wrapped-in-SVG (~2.5 MB total); they're now rasterized to small
   transparent WebPs at 256px (~40 KB total) — see raster_icons.mjs. The chart
   is a true vector and stays SVG. All render at 64px (h-16 w-16). */
type P = { className?: string };

function ImgIcon({ src, className }: { src: string } & P) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" aria-hidden className={className} width={256} height={256} />;
}

export function IconGlobe({ className }: P) {
  return <ImgIcon src="/icons/globe.webp" className={className} />;
}
export function IconSearch({ className }: P) {
  return <ImgIcon src="/icons/search.webp" className={className} />;
}
export function IconFacebook({ className }: P) {
  return <ImgIcon src="/icons/facebook.webp" className={className} />;
}
export function IconShop({ className }: P) {
  return <ImgIcon src="/icons/shop.webp" className={className} />;
}
export function IconChart({ className }: P) {
  return <ImgIcon src="/icons/chart.svg" className={className} />;
}
export function IconPen({ className }: P) {
  return <ImgIcon src="/icons/pen.webp" className={className} />;
}
