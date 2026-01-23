'use client';
import { useEffect, useRef } from 'react';
import { ScaleIn, FadeIn } from '@/components/animations/animations';

export function WaitlistSection() {
	const scriptLoadedRef = useRef(false);
	const styleLoadedRef = useRef(false);

	useEffect(() => {
		// Load CSS if not already loaded
		if (!styleLoadedRef.current) {
			const existingLink = document.querySelector(
				'link[href*="getwaitlist.min.css"]'
			);
			if (!existingLink) {
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href =
					'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.css';
				document.head.appendChild(link);
			}
			styleLoadedRef.current = true;
		}

		// Load script if not already loaded
		if (!scriptLoadedRef.current) {
			const existingScript = document.querySelector(
				'script[src*="getwaitlist.min.js"]'
			);
			if (!existingScript) {
				const script = document.createElement('script');
				script.src =
					'https://prod-waitlist-widget.s3.us-east-2.amazonaws.com/getwaitlist.min.js';
				script.async = true;
				document.body.appendChild(script);
			}
			scriptLoadedRef.current = true;
		}
	}, []);

	return (
		<section id="waitlist" className="py-8 lg:py-24">
			<div className="mx-auto max-w-xl px-6">
				<ScaleIn scale={0.95}>
					<div className="rounded-xl border bg-card p-8 shadow-sm">
						<div className="space-y-6">
							<FadeIn direction="up" delay={0.1}>
								<div className="text-center">
									<h2 className="text-3xl font-semibold">Join our waitlist</h2>
									<p className="mt-3 text-muted-foreground">
										Be the first to access new features. Enter your email below to
										join the waitlist.
									</p>
								</div>
							</FadeIn>
							<FadeIn direction="up" delay={0.2}>
								<div
									id="getWaitlistContainer"
									data-waitlist_id="32428"
									data-widget_type="WIDGET_1"
								></div>
							</FadeIn>
						</div>
					</div>
				</ScaleIn>
			</div>
		</section>
	);
}