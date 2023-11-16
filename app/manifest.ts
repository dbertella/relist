import { MetadataRoute } from 'next'

export const PARAM_KEY = 'homescreen'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Relist',
    short_name: 'Relist',
    description: 'List generated with ❤️',
    start_url: '/',
    id: `?${PARAM_KEY}=1`,
    display: 'standalone',
    background_color: 'rgb(14, 25, 43)',
    theme_color: 'rgb(26, 39, 73)',
    icons: [
      {
        src: 'favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: 'icon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: 'icon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
  }
}
