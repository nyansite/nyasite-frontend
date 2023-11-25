/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination: 'http://localhost:8000/api/:slug*',
                basePath: false
            },
        ]
    },
    experimental: {
		serverActions: true,
	},
}

module.exports = nextConfig
