'use client';
import React from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { RainbowButton } from '../CTAButton';
import { useScroll } from '@/components/ui/use-scroll';
import { ThemeToggle } from '@/components/theme-toggle';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Features',
			href: '#features',
		},
		{
			label: 'Pricing',
			href: '#',
		},
		{
			label: 'Roadmap',
			href: '#',
		},
		{
			label: 'The Team',
			href: '#',
		},
	];

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts (important for Next.js)
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);
	
	return (
		
		<header
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
				{
					'bg-background/95 supports-backdrop-filter:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
						scrolled && !open,
					'bg-background/90': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
					{
						'md:px-2': scrolled,
					},
				)}
			>
				<WordmarkIcon className="h-4" />
				<div className="hidden items-center gap-2 md:flex">
					{links.map((link, i) => (
						<a key={i} className={buttonVariants({ variant: 'ghost' })} href={link.href}>
							{link.label}
						</a>
					))}
					<Link href="/login" className={buttonVariants({ variant: 'ghost' })}>
						Login
					</Link>
					<ThemeToggle />
					<RainbowButton href="#waitlist" className="w-full">Join Waitlist</RainbowButton>
				</div>
				<div className="flex items-center gap-2 md:hidden">
					<ThemeToggle />
					<Button size="icon" variant="outline" onClick={() => setOpen(!open)}>
						<MenuToggleIcon open={open} className="size-5" duration={300} />
					</Button>
				</div>
			</nav>
			{/* Header Mobile Menu */}
			<div
				className={cn(
					'bg-background/90 fixed top-14 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-2 p-4',
					)}
				>
					<div className="grid gap-y-2">
						{links.map((link) => (
							<a
								key={link.label}
								className={buttonVariants({
									variant: 'ghost',
									className: 'justify-start',
								})}
								href={link.href}
							>
								{link.label}
							</a>
						))}
						<Link
							href="/login"
							className={buttonVariants({
								variant: 'ghost',
								className: 'justify-start',
							})}
						>
							Login
						</Link>
					</div>
					<div className="flex flex-col gap-2">
						<RainbowButton href="#waitlist" className="w-full">Join Waitlist</RainbowButton>
					</div>
				</div>
			</div>
		</header>
	);
}

export const WordmarkIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 84 24" fill="currentColor" {...props}>
  </svg>
);
