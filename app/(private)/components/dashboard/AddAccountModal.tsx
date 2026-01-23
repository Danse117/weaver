"use client";

/**
 * AddAccountModal component
 * 
 * Displays a modal with a button to connect a new TikTok account.
 * 
 * @param onClose - Function to call when the modal is closed
 * @param onSuccess - Function to call when the account is connected successfully
 */

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

interface AddAccountModalProps {
	onClose: () => void;
	onSuccess: () => void;
}

// Platform icon components - Add your SVGs here
const PlatformIcons = {
	TikTok: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor" >
			<path d="M24.562,7.613c-1.508-.983-2.597-2.557-2.936-4.391-.073-.396-.114-.804-.114-1.221h-4.814l-.008,19.292c-.081,2.16-1.859,3.894-4.039,3.894-.677,0-1.315-.169-1.877-.465-1.288-.678-2.169-2.028-2.169-3.582,0-2.231,1.815-4.047,4.046-4.047,.417,0,.816,.069,1.194,.187v-4.914c-.391-.053-.788-.087-1.194-.087-4.886,0-8.86,3.975-8.86,8.86,0,2.998,1.498,5.65,3.783,7.254,1.439,1.01,3.19,1.606,5.078,1.606,4.886,0,8.86-3.975,8.86-8.86V11.357c1.888,1.355,4.201,2.154,6.697,2.154v-4.814c-1.345,0-2.597-.4-3.647-1.085Z"></path>
		</svg>
	),
	Instagram: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M10.202,2.098c-1.49,.07-2.507,.308-3.396,.657-.92,.359-1.7,.84-2.477,1.619-.776,.779-1.254,1.56-1.61,2.481-.345,.891-.578,1.909-.644,3.4-.066,1.49-.08,1.97-.073,5.771s.024,4.278,.096,5.772c.071,1.489,.308,2.506,.657,3.396,.359,.92,.84,1.7,1.619,2.477,.779,.776,1.559,1.253,2.483,1.61,.89,.344,1.909,.579,3.399,.644,1.49,.065,1.97,.08,5.771,.073,3.801-.007,4.279-.024,5.773-.095s2.505-.309,3.395-.657c.92-.36,1.701-.84,2.477-1.62s1.254-1.561,1.609-2.483c.345-.89,.579-1.909,.644-3.398,.065-1.494,.081-1.971,.073-5.773s-.024-4.278-.095-5.771-.308-2.507-.657-3.397c-.36-.92-.84-1.7-1.619-2.477s-1.561-1.254-2.483-1.609c-.891-.345-1.909-.58-3.399-.644s-1.97-.081-5.772-.074-4.278,.024-5.771,.096m.164,25.309c-1.365-.059-2.106-.286-2.6-.476-.654-.252-1.12-.557-1.612-1.044s-.795-.955-1.05-1.608c-.192-.494-.423-1.234-.487-2.599-.069-1.475-.084-1.918-.092-5.656s.006-4.18,.071-5.656c.058-1.364,.286-2.106,.476-2.6,.252-.655,.556-1.12,1.044-1.612s.955-.795,1.608-1.05c.493-.193,1.234-.422,2.598-.487,1.476-.07,1.919-.084,5.656-.092,3.737-.008,4.181,.006,5.658,.071,1.364,.059,2.106,.285,2.599,.476,.654,.252,1.12,.555,1.612,1.044s.795,.954,1.051,1.609c.193,.492,.422,1.232,.486,2.597,.07,1.476,.086,1.919,.093,5.656,.007,3.737-.006,4.181-.071,5.656-.06,1.365-.286,2.106-.476,2.601-.252,.654-.556,1.12-1.045,1.612s-.955,.795-1.608,1.05c-.493,.192-1.234,.422-2.597,.487-1.476,.069-1.919,.084-5.657,.092s-4.18-.007-5.656-.071M21.779,8.517c.002,.928,.755,1.679,1.683,1.677s1.679-.755,1.677-1.683c-.002-.928-.755-1.679-1.683-1.677,0,0,0,0,0,0-.928,.002-1.678,.755-1.677,1.683m-12.967,7.496c.008,3.97,3.232,7.182,7.202,7.174s7.183-3.232,7.176-7.202c-.008-3.97-3.233-7.183-7.203-7.175s-7.182,3.233-7.174,7.203m2.522-.005c-.005-2.577,2.08-4.671,4.658-4.676,2.577-.005,4.671,2.08,4.676,4.658,.005,2.577-2.08,4.671-4.658,4.676-2.577,.005-4.671-2.079-4.676-4.656h0"></path>
		</svg>
	),
	Facebook: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M16,2c-7.732,0-14,6.268-14,14,0,6.566,4.52,12.075,10.618,13.588v-9.31h-2.887v-4.278h2.887v-1.843c0-4.765,2.156-6.974,6.835-6.974,.887,0,2.417,.174,3.043,.348v3.878c-.33-.035-.904-.052-1.617-.052-2.296,0-3.183,.87-3.183,3.13v1.513h4.573l-.786,4.278h-3.787v9.619c6.932-.837,12.304-6.74,12.304-13.897,0-7.732-6.268-14-14-14Z"></path>
		</svg>
	),
	X: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M18.42,14.009L27.891,3h-2.244l-8.224,9.559L10.855,3H3.28l9.932,14.455L3.28,29h2.244l8.684-10.095,6.936,10.095h7.576l-10.301-14.991h0Zm-3.074,3.573l-1.006-1.439L6.333,4.69h3.447l6.462,9.243,1.006,1.439,8.4,12.015h-3.447l-6.854-9.804h0Z"></path>
		</svg>
	),
	YouTube: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M31.331,8.248c-.368-1.386-1.452-2.477-2.829-2.848-2.496-.673-12.502-.673-12.502-.673,0,0-10.007,0-12.502,.673-1.377,.37-2.461,1.462-2.829,2.848-.669,2.512-.669,7.752-.669,7.752,0,0,0,5.241,.669,7.752,.368,1.386,1.452,2.477,2.829,2.847,2.496,.673,12.502,.673,12.502,.673,0,0,10.007,0,12.502-.673,1.377-.37,2.461-1.462,2.829-2.847,.669-2.512,.669-7.752,.669-7.752,0,0,0-5.24-.669-7.752ZM12.727,20.758V11.242l8.364,4.758-8.364,4.758Z"></path>
		</svg>
	),
	LinkedIn: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M26.111,3H5.889c-1.595,0-2.889,1.293-2.889,2.889V26.111c0,1.595,1.293,2.889,2.889,2.889H26.111c1.595,0,2.889-1.293,2.889-2.889V5.889c0-1.595-1.293-2.889-2.889-2.889ZM10.861,25.389h-3.877V12.87h3.877v12.519Zm-1.957-14.158c-1.267,0-2.293-1.034-2.293-2.31s1.026-2.31,2.293-2.31,2.292,1.034,2.292,2.31-1.026,2.31-2.292,2.31Zm16.485,14.158h-3.858v-6.571c0-1.802-.685-2.809-2.111-2.809-1.551,0-2.362,1.048-2.362,2.809v6.571h-3.718V12.87h3.718v1.686s1.118-2.069,3.775-2.069,4.556,1.621,4.556,4.975v7.926Z" fill-rule="evenodd"></path>
		</svg>
	),
	Threads: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M22.7,14.977c-.121-.058-.243-.113-.367-.167-.216-3.982-2.392-6.262-6.046-6.285-.017,0-.033,0-.05,0-2.185,0-4.003,.933-5.122,2.63l2.009,1.378c.836-1.268,2.147-1.538,3.113-1.538,.011,0,.022,0,.033,0,1.203,.008,2.111,.357,2.698,1.04,.428,.497,.714,1.183,.855,2.049-1.067-.181-2.22-.237-3.453-.166-3.474,.2-5.707,2.226-5.557,5.041,.076,1.428,.788,2.656,2.003,3.459,1.028,.678,2.351,1.01,3.727,.935,1.817-.1,3.242-.793,4.236-2.06,.755-.963,1.233-2.21,1.444-3.781,.866,.523,1.507,1.21,1.862,2.037,.603,1.405,.638,3.714-1.246,5.596-1.651,1.649-3.635,2.363-6.634,2.385-3.326-.025-5.842-1.091-7.478-3.171-1.532-1.947-2.323-4.759-2.353-8.359,.03-3.599,.821-6.412,2.353-8.359,1.636-2.079,4.151-3.146,7.478-3.171,3.35,.025,5.91,1.097,7.608,3.186,.833,1.025,1.461,2.313,1.874,3.815l2.355-.628c-.502-1.849-1.291-3.443-2.365-4.764-2.177-2.679-5.361-4.051-9.464-4.08h-.016c-4.094,.028-7.243,1.406-9.358,4.095-1.882,2.393-2.853,5.722-2.886,9.895v.01s0,.01,0,.01c.033,4.173,1.004,7.503,2.886,9.895,2.115,2.689,5.264,4.067,9.358,4.095h.016c3.64-.025,6.206-.978,8.32-3.09,2.765-2.763,2.682-6.226,1.771-8.352-.654-1.525-1.901-2.763-3.605-3.581Zm-6.285,5.909c-1.522,.086-3.104-.598-3.182-2.061-.058-1.085,.772-2.296,3.276-2.441,.287-.017,.568-.025,.844-.025,.909,0,1.76,.088,2.533,.257-.288,3.602-1.98,4.187-3.471,4.269Z"></path>
		</svg>
	),
	Tumblr: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M18.5,30c-4.211,0-7.349-2.166-7.349-7.349V14.35h-3.827v-4.495c4.211-1.094,5.972-4.717,6.175-7.856h4.373v7.127h5.102v5.224h-5.102v7.228c0,2.166,1.094,2.915,2.834,2.915h2.47v5.507h-4.677Z"></path>
		</svg>
	),
	Twitch: () => (
		<svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
			<path d="M8.5,2L3.143,7.357V26.643h6.429v5.357l5.357-5.357h4.286l9.643-9.643V2H8.5ZM26.714,15.929l-4.286,4.286h-4.286l-3.75,3.75v-3.75h-4.821V4.143H26.714V15.929Z"></path>
			<path d="M21.357 7.893H23.5V14.322H21.357z"></path>
			<path d="M15.464 7.893H17.607V14.322H15.464z"></path>
		</svg>
	),
	Snapchat: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M30.893,22.837c-.208-.567-.606-.871-1.058-1.122-.085-.05-.163-.09-.23-.12-.135-.07-.273-.137-.41-.208-1.41-.747-2.51-1.69-3.274-2.808-.217-.315-.405-.648-.562-.996-.065-.186-.062-.292-.015-.389,.046-.074,.108-.138,.18-.188,.242-.16,.492-.323,.661-.432,.302-.195,.541-.35,.695-.46,.579-.405,.983-.835,1.236-1.315,.357-.672,.404-1.466,.13-2.175-.383-1.009-1.336-1.635-2.49-1.635-.243,0-.486,.025-.724,.077-.064,.014-.127,.028-.189,.044,.011-.69-.005-1.418-.066-2.135-.218-2.519-1.1-3.84-2.02-4.893-.589-.66-1.283-1.218-2.053-1.653-1.396-.797-2.979-1.202-4.704-1.202s-3.301,.405-4.698,1.202c-.773,.434-1.468,.994-2.057,1.656-.92,1.053-1.802,2.376-2.02,4.893-.061,.717-.077,1.449-.067,2.135-.062-.016-.125-.031-.189-.044-.238-.051-.481-.077-.724-.077-1.155,0-2.109,.626-2.491,1.635-.276,.71-.23,1.505,.126,2.178,.254,.481,.658,.911,1.237,1.315,.153,.107,.393,.262,.695,.46,.163,.106,.402,.261,.635,.415,.082,.053,.151,.123,.204,.205,.049,.1,.051,.208-.022,.408-.155,.341-.34,.668-.553,.976-.747,1.092-1.815,2.018-3.179,2.759-.723,.383-1.474,.639-1.791,1.502-.239,.651-.083,1.391,.525,2.015h0c.223,.233,.482,.429,.766,.58,.592,.326,1.222,.578,1.876,.75,.135,.035,.263,.092,.379,.169,.222,.194,.19,.486,.485,.914,.148,.221,.336,.412,.555,.564,.619,.428,1.315,.455,2.053,.483,.666,.025,1.421,.054,2.283,.339,.357,.118,.728,.346,1.158,.613,1.032,.635,2.446,1.503,4.811,1.503s3.789-.873,4.829-1.51c.427-.262,.796-.488,1.143-.603,.862-.285,1.617-.313,2.283-.339,.737-.028,1.433-.055,2.053-.483,.259-.181,.475-.416,.632-.69,.212-.361,.207-.613,.406-.789,.109-.074,.229-.129,.356-.162,.662-.173,1.301-.428,1.901-.757,.302-.162,.575-.375,.805-.63l.008-.009c.57-.61,.714-1.329,.48-1.964Zm-2.102,1.13c-1.282,.708-2.135,.632-2.798,1.059-.563,.363-.23,1.144-.639,1.426-.503,.347-1.989-.025-3.909,.609-1.584,.524-2.594,2.029-5.442,2.029s-3.835-1.502-5.444-2.033c-1.916-.634-3.406-.262-3.909-.609-.409-.282-.077-1.064-.639-1.426-.664-.427-1.516-.351-2.798-1.055-.816-.451-.353-.73-.081-.862,4.645-2.249,5.386-5.721,5.419-5.979,.04-.312,.084-.557-.259-.875-.332-.307-1.804-1.218-2.213-1.503-.676-.472-.973-.944-.754-1.523,.153-.401,.527-.552,.92-.552,.124,0,.248,.014,.369,.041,.742,.161,1.462,.533,1.879,.633,.05,.013,.102,.02,.153,.021,.222,0,.3-.112,.285-.366-.048-.812-.162-2.394-.034-3.872,.176-2.034,.831-3.042,1.61-3.934,.374-.428,2.132-2.286,5.493-2.286s5.123,1.85,5.497,2.276c.78,.891,1.436,1.899,1.61,3.934,.128,1.479,.018,3.061-.034,3.872-.018,.268,.063,.366,.285,.366,.052,0,.103-.008,.153-.021,.417-.1,1.137-.472,1.879-.633,.121-.027,.245-.041,.369-.041,.395,0,.766,.153,.92,.552,.219,.579-.077,1.051-.753,1.523-.409,.285-1.881,1.196-2.213,1.503-.344,.317-.299,.563-.259,.875,.033,.261,.773,3.734,5.419,5.979,.274,.137,.737,.416-.079,.871Z"></path>
		</svg>
	),
	Kick: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
  			<path fill="currentColor" fill-rule="evenodd" d="M5 1C2.79086 1 1 2.79086 1 5v14c0 2.2091 1.79086 4 4 4h14c2.2091 0 4 -1.7909 4 -4V5c0 -2.20914 -1.7909 -4 -4 -4H5Zm5.3696 3.5H5.47827v15h4.89133v-3.2609H12v1.6305h1.6304V19.5h4.8913v-4.8913h-1.6304v-1.6304h-1.6304v-1.9566h1.6304V9.3913h1.6304V4.5h-4.8913v1.63043H12v1.63044h-1.6304V4.5Z" stroke-width="1"></path>
		</svg>
	),
	OnlyFans: () => (
		<svg width="100" height="100" viewBox="0 0 32 32" fill="currentColor">
			<path d="M10.667,5.333C4.776,5.333,0,10.109,0,16s4.776,10.667,10.667,10.667,10.667-4.776,10.667-10.667S16.558,5.333,10.667,5.333Zm0,13.867c-1.767,0-3.2-1.433-3.2-3.2s1.433-3.2,3.2-3.2,3.2,1.433,3.2,3.2c.002,1.765-1.427,3.198-3.191,3.2-.003,0-.006,0-.009,0Z" opacity=".8"></path><path d="M22.656,13.333c2.71,.78,5.909,0,5.909,0-.928,4.053-3.872,6.592-8.118,6.901-1.683,3.906-5.528,6.435-9.781,6.432l3.2-10.171c3.29-10.454,4.976-11.162,12.777-11.162h5.356c-.896,3.947-3.984,6.961-9.344,8Z"></path>
		</svg>
	),
};

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
			<Card className="w-full max-w-md mx-4 relative max-h-[90vh] flex flex-col">
				<button
					onClick={onClose}
					className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
					disabled={isConnecting}
				>
					<X className="h-4 w-4" />
					<span className="sr-only">Close</span>
				</button>

				<CardHeader>
					<CardTitle>Connect A Social Media Account</CardTitle>
					<CardDescription>
						Choose a platform to connect to Weaver
					</CardDescription>
				</CardHeader>

				<CardContent className="space-y-4 overflow-y-auto">
					{/* TikTok - Active */}
					<Button
						onClick={handleConnectTikTok}
						disabled={isConnecting}
						variant="outline"
						className="w-full h-auto py-3 justify-start gap-3"
					>
						<div className="relative h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-[#000000] dark:text-[#FFFFFF]">
							<PlatformIcons.TikTok />
						</div>
						<div className="text-left flex-1">
							<div className="font-semibold">TikTok</div>
							<div className="text-xs text-muted-foreground">
								Connect your TikTok account
							</div>
						</div>
					</Button>

					{/* Coming soon platforms */}
					<div className="space-y-3">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 text-muted-foreground">
									Coming Soon
								</span>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-2">
							{[
								{ name: "Instagram", Icon: PlatformIcons.Instagram },
								{ name: "Facebook", Icon: PlatformIcons.Facebook },
								{ name: "X (Twitter)", Icon: PlatformIcons.X },
								{ name: "YouTube", Icon: PlatformIcons.YouTube },
								{ name: "LinkedIn", Icon: PlatformIcons.LinkedIn },
								{ name: "Threads", Icon: PlatformIcons.Threads },
								{ name: "Tumblr", Icon: PlatformIcons.Tumblr },
								{ name: "Twitch", Icon: PlatformIcons.Twitch },
								{ name: "Snapchat", Icon: PlatformIcons.Snapchat },
								{ name: "Kick", Icon: PlatformIcons.Kick },
								{ name: "OnlyFans", Icon: PlatformIcons.OnlyFans },
							].map((platform) => (
								<Button
									key={platform.name}
									variant="outline"
									disabled
									className="w-full h-auto py-3 justify-start gap-3 opacity-50 cursor-not-allowed"
								>
									<div className="relative h-8 w-8 shrink-0 rounded-lg flex items-center justify-center text-muted-foreground">
										<platform.Icon />
									</div>
									<div className="text-left flex-1">
										<div className="font-semibold">{platform.name}</div>
										<div className="text-xs text-muted-foreground">
											Coming soon
										</div>
									</div>
								</Button>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
