import { comparisonData } from './data';

interface ComparisonRow {
	category: string;
	manual: string;
	withWeaver: string;
}

export function TeamsSection() {
	return (
		<section className="py-16 lg:py-24">
			<div className="mx-auto max-w-6xl px-6">
				<div className="text-center">
					<h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
						How teams get more done with{' '}
						<span className="text-primary">Weaver</span>
					</h2>
				</div>

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
							<tbody className="divide-y bg-card dark:bg-card/50">
								{comparisonData.map((row, index) => (
									<tr
										key={index}
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
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
}
