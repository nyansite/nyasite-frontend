/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	async rewrites() {
		return [
			{
				source: "/api/:slug*",
				destination: "http://localhost:8000/api/:slug*",
				basePath: false,
			},
		];
	},
};

module.exports = nextConfig;
