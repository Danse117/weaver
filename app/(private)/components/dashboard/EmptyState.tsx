"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface EmptyStateProps {
	onAddAccount: () => void;
}

export function EmptyState({ onAddAccount }: EmptyStateProps) {
	return (
		<div className="flex items-center justify-center min-h-screen p-6 bg-muted/30">
			<Card className="max-w-md w-full">
				<CardHeader className="text-center">
					<div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
						<Plus className="h-6 w-6 text-primary" />
					</div>
					<CardTitle className="text-2xl">Get Started with Weaver</CardTitle>
					<CardDescription className="text-base">
						Connect your first social media account to start tracking analytics and insights
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Button
						onClick={onAddAccount}
						size="lg"
						className="w-full"
					>
						<Plus className="mr-2 h-4 w-4" />
						Connect TikTok Account
					</Button>

					<div className="text-center">
						<p className="text-sm text-muted-foreground">
							More platforms coming soon
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
