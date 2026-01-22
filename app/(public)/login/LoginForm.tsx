"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { login } from "@/app/actions/auth";

export function LoginForm() {
	const [state, formAction, isPending] = useActionState(login, null);

	useEffect(() => {
		if (state?.error) {
			console.error("Login error:", state.error);
		}
	}, [state]);

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle className="text-2xl">Welcome back</CardTitle>
				<CardDescription>
					Sign in to your Weaver account to continue
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form action={formAction} className="space-y-4">
					{state?.error && (
						<div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
							{state.error}
						</div>
					)}
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							autoComplete="email"
							required
							disabled={isPending}
						/>
					</div>
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
							<Link
								href="#"
								className="text-sm text-primary hover:underline"
							>
								Forgot password?
							</Link>
						</div>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="••••••••"
							autoComplete="current-password"
							required
							disabled={isPending}
						/>
					</div>
					<Button
						className="w-full"
						size="lg"
						type="submit"
						disabled={isPending}
					>
						{isPending ? "Signing in..." : "Sign in"}
					</Button>
					<div className="text-center text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link
							href="/signup"
							className="font-medium text-primary hover:underline"
						>
							Sign up
						</Link>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
