import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'USA News Flow',
        short_name: 'USANewsFlow',
        description: 'Latest breaking news, politics, and updates across North America.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#dc2626',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}