/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api',
                destination: 'localhost:8000/api',
                basePath: false
            },
        ]
    },
}

module.exports = nextConfig
