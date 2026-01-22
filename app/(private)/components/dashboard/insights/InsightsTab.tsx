"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

interface InsightsTabProps {
	accountId: string;
}

export function InsightsTab({ accountId }: InsightsTabProps) {
	return (
		<div className="p-6 space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">AI Insights</h2>
				<p className="text-muted-foreground">
					Personalized recommendations to grow your account
				</p>
			</div>

			<div className="flex items-center justify-center min-h-[400px]">
				<Card className="max-w-md w-full">
					<CardHeader className="text-center">
						<div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
							<Lightbulb className="h-6 w-6 text-primary" />
						</div>
						<CardTitle>AI Insights Coming Soon</CardTitle>
						<CardDescription>
							We're building intelligent insights to help you understand your
							audience and optimize your content strategy.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3 text-sm text-muted-foreground">
						<p>Future features will include:</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Best time to post analysis</li>
							<li>Content performance predictions</li>
							<li>Audience behavior patterns</li>
							<li>Engagement trend forecasting</li>
							<li>Personalized growth recommendations</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
