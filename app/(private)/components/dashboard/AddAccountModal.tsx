"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { useState } from "react";
import { generatePKCE, generateState, getAuthorizationUrl, TIKTOK_SCOPES } from "@/lib/connectors/tiktok/oauth";
import Image from "next/image";

interface AddAccountModalProps {
	onClose: () => void;
	onSuccess: () => void;
}

export function AddAccountModal({ onClose, onSuccess }: AddAccountModalProps) {
	const [isConnecting, setIsConnecting] = useState(false);

	const handleConnectTikTok = async () => {
		setIsConnecting(true);
		try {
			// Generate PKCE challenge
			const { code_verifier, code_challenge } = await generatePKCE();
			const state = generateState();

			// Store PKCE verifier in cookie via API route
			const storeResponse = await fetch("/api/oauth/store-state", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					state,
					code_verifier,
				}),
			});

			if (!storeResponse.ok) {
				throw new Error("Failed to store OAuth state");
			}

			// Build authorization URL
			const clientKey = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY || "";
			if (!clientKey) {
				throw new Error("TikTok client key not configured");
			}
			// Use baseUrl from env, fallback to window.location.origin
			const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || window.location.origin).replace(/\/$/, '');
			const redirectUri = `${baseUrl}/accounts/callback/tiktok`;
			
			const authUrl = getAuthorizationUrl(
				clientKey,
				redirectUri,
				state,
				code_challenge,
				TIKTOK_SCOPES
			);

			// Open popup window
			const width = 600;
			const height = 700;
			const left = window.screen.width / 2 - width / 2;
			const top = window.screen.height / 2 - height / 2;

			const popup = window.open(
				authUrl,
				"TikTok Authorization",
				`width=${width},height=${height},left=${left},top=${top}`
			);

			if (!popup) {
				throw new Error("Popup blocked. Please allow popups for this site.");
			}

			// Listen for messages from popup
			const messageHandler = (event: MessageEvent) => {
				if (event.data.type === "tiktok-auth-success") {
					window.removeEventListener("message", messageHandler);
					setIsConnecting(false);
					onSuccess();
					onClose();
				}
			};

			window.addEventListener("message", messageHandler);

			// Check if popup was closed without completion
			const checkPopupClosed = setInterval(() => {
				if (popup.closed) {
					clearInterval(checkPopupClosed);
					window.removeEventListener("message", messageHandler);
					setIsConnecting(false);
				}
			}, 500);
		} catch (error) {
			console.error("Failed to initiate TikTok OAuth:", error);
			setIsConnecting(false);
			alert(
				error instanceof Error
					? error.message
					: "Failed to connect TikTok account"
			);
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
			<Card className="w-full max-w-md mx-4 relative">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
					disabled={isConnecting}
				>
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</button>

				<CardHeader>
					<CardTitle>Connect Social Account</CardTitle>
					<CardDescription>
						Choose a platform to connect to Weaver
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4">
					{/* TikTok */}
					<Button
						onClick={handleConnectTikTok}
						disabled={isConnecting}
						variant="outline"
						className="w-full h-auto py-4 justify-start gap-4"
					>
						<div className="relative h-10 w-10 flex-shrink-0">
							<Image
								src="/assets/logos/weaver_icon.png"
								alt="TikTok"
								fill
								className="object-contain"
							/>
						</div>
						<div className="text-left flex-1">
							<div className="font-semibold">TikTok</div>
							<div className="text-xs text-muted-foreground">
								Connect your TikTok account
							</div>
						</div>
					</Button>

					{/* Coming soon platforms */}
					<div className="space-y-2">
						<p className="text-sm text-muted-foreground text-center">
							More platforms coming soon
						</p>
						<div className="grid grid-cols-3 gap-2">
							{["Instagram", "YouTube", "Twitter"].map((platform) => (
								<Button
									key={platform}
									variant="outline"
									disabled
									className="h-auto py-3 opacity-50"
								>
									<span className="text-xs">{platform}</span>
								</Button>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
