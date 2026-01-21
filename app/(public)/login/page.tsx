import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedBackground } from "../components/home/AnimatedBackground";

export default function LoginPage() {
	return (
        <>
        <AnimatedBackground />
		<div className="flex min-h-[calc(100vh-14rem)] items-center justify-center px-4 py-12">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Welcome back</CardTitle>
					<CardDescription>
						Sign in to your Weaver account to continue
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							placeholder="you@example.com"
							autoComplete="email"
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
							type="password"
							placeholder="••••••••"
							autoComplete="current-password"
						/>
					</div>
					<Button className="w-full" size="lg">
						Sign in
					</Button>
					<div className="text-center text-sm text-muted-foreground">
						Don&apos;t have an account?{" "}
						<Link href="/signup" className="text-primary hover:underline font-medium">
							Sign up
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
        </>
	);
}
