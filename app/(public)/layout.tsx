import React from 'react';
import { Header, WordmarkIcon } from '@/app/(public)/components/home/Navigation';
import { Footer } from '@/app/(public)/components/home/Footer';
import { TwitterLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons';

// TikTok icon (Radix doesn't have one, using custom SVG)
const TikTokIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
		<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
	</svg>
);

export default function PublicLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="w-full">
			<Header />
			{children}
			<Footer
				logo={<WordmarkIcon className="h-4" />}
				brandName=""
				socialLinks={[
					{
						icon: <TwitterLogoIcon className="h-5 w-5" />,
						href: 'https://x.com/aadiwrks',
						label: 'X (Twitter)',
					},
					{
						icon: <TikTokIcon />,
						href: 'https://www.tiktok.com/@adi.works',
						label: 'TikTok',
					},
					{
						icon: <InstagramLogoIcon className="h-5 w-5" />,
						href: '#',
						label: 'Instagram',
					},
				]}
				mainLinks={[
					{ href: '#', label: 'Features' },
					{ href: '#', label: 'Pricing' },
					{ href: '#', label: 'About' },
					{ href: '#', label: 'Blog' },
					{ href: '#', label: 'Support' },
				]}
				legalLinks={[
					{ href: '#', label: 'Privacy Policy' },
					{ href: '#', label: 'Terms of Service' },
				]}
				copyright={{
					text: `© ${new Date().getFullYear()} Weaver. All rights reserved.`,
				}}
			/>
		</div>
	);
}
