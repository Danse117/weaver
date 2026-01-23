'use client';

import { comparisonData } from './data';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { FadeIn } from '@/components/animations/animations';

export function TeamsSection() {
	const tableRef = useRef<HTMLTableSectionElement>(null);
	const isInView = useInView(tableRef, { once: true, amount: 0.2 });

	return (
		<section className="py-16 lg:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<FadeIn direction="up" className="text-center">
					<h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
						How teams get more done with{' '}
						<span className="text-primary">Weaver</span>
					</h2>
				</FadeIn>

				<FadeIn direction="up" delay={0.2}>
					<div className="mt-12 overflow-hidden rounded-lg border">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="border-b bg-muted/50">
									<tr>
										<th className="px-6 py-4 text-left text-sm font-semibold">
											Category
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold">
											Manual
										</th>
										<th className="px-6 py-4 text-left text-sm font-semibold">
											With Weaver
										</th>
									</tr>
								</thead>
								<tbody ref={tableRef} className="divide-y bg-card dark:bg-card/50">
									{comparisonData.map((row, index) => (
										<motion.tr
											key={index}
											initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
											animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
											transition={{
												duration: 0.4,
												delay: 0.3 + index * 0.1,
												ease: [0.25, 0.4, 0.25, 1],
											}}
											className="transition-colors hover:bg-muted/30"
										>
											<td className="px-6 py-6">
												<span className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground">
													{row.category}
												</span>
											</td>
											<td className="px-6 py-6 text-sm text-muted-foreground">
												{row.manual}
											</td>
											<td className="px-6 py-6 text-sm font-medium">
												{row.withWeaver}
											</td>
										</motion.tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}
