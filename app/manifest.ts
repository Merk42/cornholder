import type { MetadataRoute } from 'next'
export const dynamic = 'force-static';
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cornholder',
    short_name: 'Cornholder',
    description: 'A tool to keep score in cornhole',
    scope:'/pwa/cornholder',
    start_url:'/pwa/cornholder/index.html',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/pwa/cornholder/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa/cornholder/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}