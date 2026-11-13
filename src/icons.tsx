import type { SVGProps } from 'react'

const base = (p: SVGProps<SVGSVGElement>) => ({ width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p })

export const Arrow = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ viewBox: '0 0 38 28', width: 26, height: 18, strokeWidth: 2.5, ...p })}><path d="M0 14h35M23 2l12 12-12 12" /></svg>
)
export const Sun = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
)
export const Moon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" /></svg>
)
export const Menu = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const Close = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const Copy = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M5 15V6a2 2 0 0 1 2-2h9" /></svg>
)
export const Check = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
)
export const Code = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>
)
export const Layout = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 10h18M10 10v10" /></svg>
)
export const Layers = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" transform="translate(0 -1.5)" /></svg>
)
export const Camera = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M4 8h3l1.5-2.5h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13" r="3.5" /></svg>
)
export const Figma = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M8 3h4a3 3 0 0 1 0 6H8zM12 3h4a3 3 0 0 1 0 6h-4zM8 9h4a3 3 0 0 1 0 6H8zM8 15h3v3a3 3 0 1 1-3-3zM12 9a3 3 0 1 1 0 6z" /></svg>
)
export const Github = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M9 19c-4 1.2-4-2-6-2.5m12 4.5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.700-.3 5.500-1.300 5.500-6a4.600 4.600 0 0 0-1.300-3.200 4.300 4.300 0 0 0-.1-3.200s-1-.3-3.300 1.300a11.400 11.400 0 0 0-6 0C6.700 2.900 5.700 3.200 5.700 3.200a4.300 4.300 0 0 0-.1 3.200A4.600 4.600 0 0 0 4.300 9.600c0 4.600 2.800 5.700 5.500 6a2.800 2.800 0 0 0-.8 2.200V21" /></svg>
)
export const Linkedin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 11v5M8 8v.01M12 16v-5m0 2.500c0-1.400 1-2.500 2.500-2.500S17 11.100 17 12.500V16" /></svg>
)
export const ArrowUp = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 19V5M5 12l7-7 7 7" /></svg>
)
export const Download = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 4v11M7 11l5 5 5-5M4 20h16" /></svg>
)
export const Eye = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const External = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>
)
