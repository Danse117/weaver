'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { faqQuestions } from './data';
import { FadeIn } from '@/components/animations/animations';

export function FaqsSection() {
	return (
		<div className="mx-auto w-full max-w-3xl space-y-7 px-4 pt-16">
			<FadeIn direction="up">
				<div className="space-y-2">
					<h2 className="text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
					<p className="text-muted-foreground max-w-2xl">
						Here are some common questions and answers that you might encounter when using Efferd. If
						you don't find the answer you're looking for, feel free to reach out.
					</p>
				</div>
			</FadeIn>
			<FadeIn direction="up" delay={0.15}>
				<Accordion
					type="single"
					collapsible
					className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg"
					defaultValue="item-1"
				>
					{faqQuestions.map((item) => (
						<AccordionItem
							value={item.id}
							key={item.id}
							className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
						>
							<AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
								{item.title}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pb-4 px-4">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</FadeIn>
			<FadeIn direction="up" delay={0.25}>
				<p className="text-muted-foreground">
					Can't find what you're looking for? Contact our{' '}
					<a href="#" className="text-primary hover:underline">
						customer support team
					</a>
				</p>
			</FadeIn>
		</div>
	);
}
