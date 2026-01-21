import { Button } from '@/components/ui/button';

// Icon components
const ChatGPTIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
		<path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
	</svg>
);

const ClaudeIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
		<path d="M17.75 13.969c-.312.156-.624.312-.937.468-2.812 1.407-5.78 1.563-8.906.469-1.594-.562-2.969-1.407-4.032-2.719-.625-.75-1.093-1.593-1.374-2.531-.063-.188-.063-.375 0-.563.375-1.03 1.03-1.874 1.905-2.53 1.25-.938 2.657-1.47 4.188-1.595 1.781-.156 3.5.094 5.093.938 1.469.781 2.563 1.906 3.282 3.406.281.594.406 1.219.406 1.875 0 .438-.125.875-.281 1.282-.032.094-.094.156-.188.219-.281.156-.562.312-.843.468-.094.032-.188.094-.282.125Zm-8.594 6.093c1.313.594 2.688.907 4.125.907 1.531 0 2.969-.344 4.344-1.031 1.281-.625 2.344-1.5 3.156-2.625.625-.875 1.031-1.844 1.219-2.875.031-.188.031-.375 0-.563-.188-.656-.5-1.25-.938-1.781-.625-.75-1.375-1.344-2.25-1.781-1.25-.625-2.594-.906-4-.844-1.625.063-3.125.563-4.469 1.469-1.218.812-2.124 1.906-2.687 3.281-.219.531-.313 1.094-.313 1.656 0 .594.094 1.156.313 1.688.281.656.687 1.25 1.218 1.75.032.031.063.063.094.094.719.594 1.532 1.031 2.438 1.281.281.063.531.156.781.219Z" />
	</svg>
);

const PerplexityIcon = () => (
	<svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
		<path d="M13.85 2v18.5h-3.7V2h3.7ZM21.7 4.25v14h-3.7v-14h3.7ZM6 6.5v9.25H2.3V6.5H6Zm15.7 13.25V22H2.3v-2.25h19.4Z" />
	</svg>
);

export function UnsureSection() {
	const productName = 'Weaver';
	const question = `Tell me why ${productName} social media analytics platform is a great choice for me`;

	const aiPlatforms = [
		{
			name: 'ChatGPT',
			icon: <ChatGPTIcon />,
			url: `https://chat.openai.com/?q=${encodeURIComponent(question)}`,
		},
		{
			name: 'Claude',
			icon: <ClaudeIcon />,
			url: `https://claude.ai/new?q=${encodeURIComponent(question)}`,
		},
		{
			name: 'Perplexity',
			icon: <PerplexityIcon />,
			url: `https://www.perplexity.ai/?q=${encodeURIComponent(question)}`,
		},
	];

	return (
		<section className="py-16 lg:py-24">
			<div className="mx-auto max-w-3xl px-6 text-center">
				<h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
					Still not sure that{' '}
					<span className="text-primary">{productName}</span> is right for you?
				</h2>
				<p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
					Let ChatGPT, Claude, or Perplexity do the thinking for you. Click a
					button and see what your favourite AI says about {productName}
				</p>

				<div className="mt-8 flex flex-wrap items-center justify-center gap-4">
					{aiPlatforms.map((platform) => (
						<Button
							key={platform.name}
							variant="outline"
							size="lg"
							asChild
							className="gap-2"
						>
							<a href={platform.url} target="_blank" rel="noopener noreferrer">
								{platform.icon}
								<span>Ask {platform.name}</span>
							</a>
						</Button>
					))}
				</div>
			</div>
		</section>
	);
}
