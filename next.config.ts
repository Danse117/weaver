import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.tiktokcdn-us.com",
			},
			{
				protocol: "https",
				hostname: "**.tiktokcdn.com",
			},
		],
	},
};

export default nextConfig;
