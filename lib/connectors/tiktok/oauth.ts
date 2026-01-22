import {
	PKCEChallenge,
	TikTokOAuthTokenResponse,
	TikTokRefreshTokenResponse,
} from "./types";

const TIKTOK_AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";

// Required scopes for TikTok integration
export const TIKTOK_SCOPES = [
	"user.info.basic",
	"user.info.profile",
	"user.info.stats",
	"video.list",
];

/**
 * Generate a random string for code verifier
 */
function generateRandomString(length: number): string {
	const charset =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
	const randomValues = new Uint8Array(length);
	crypto.getRandomValues(randomValues);
	return Array.from(randomValues)
		.map((val) => charset[val % charset.length])
		.join("");
}

/**
 * Generate SHA256 hash
 */
async function sha256(plain: string): Promise<ArrayBuffer> {
	const encoder = new TextEncoder();
	const data = encoder.encode(plain);
	return await crypto.subtle.digest("SHA-256", data);
}

/**
 * Base64 URL encode
 */
function base64UrlEncode(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary)
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=/g, "");
}

/**
 * Generate PKCE challenge and verifier
 */
export async function generatePKCE(): Promise<PKCEChallenge> {
	const code_verifier = generateRandomString(128);
	const hashed = await sha256(code_verifier);
	const code_challenge = base64UrlEncode(hashed);

	return {
		code_verifier,
		code_challenge,
	};
}

/**
 * Generate random state for CSRF protection
 */
export function generateState(): string {
	return generateRandomString(32);
}

/**
 * Build TikTok authorization URL
 */
export function getAuthorizationUrl(
	clientKey: string,
	redirectUri: string,
	state: string,
	codeChallenge: string,
	scopes: string[] = TIKTOK_SCOPES
): string {
	const params = new URLSearchParams({
		client_key: clientKey,
		response_type: "code",
		scope: scopes.join(","),
		redirect_uri: redirectUri,
		state: state,
		code_challenge: codeChallenge,
		code_challenge_method: "S256",
	});

	return `${TIKTOK_AUTH_URL}?${params.toString()}`;
}

/**
 * Exchange authorization code for access token
 */
export async function exchangeCodeForToken(
	code: string,
	codeVerifier: string,
	clientKey: string,
	clientSecret: string,
	redirectUri: string
): Promise<TikTokOAuthTokenResponse> {
	const response = await fetch(TIKTOK_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "authorization_code",
			code: code,
			client_key: clientKey,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
			code_verifier: codeVerifier,
		}),
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		console.error('Token exchange failed:', {
			status: response.status,
			statusText: response.statusText,
			errorData,
		});
		throw new Error(
			`Failed to exchange code for token: ${errorData.error?.message || errorData.error_description || response.statusText}`
		);
	}

	const tokenData = await response.json();
	return tokenData;
}

/**
 * Refresh access token using refresh token
 */
export async function refreshAccessToken(
	refreshToken: string,
	clientKey: string,
	clientSecret: string
): Promise<TikTokRefreshTokenResponse> {
	const response = await fetch(TIKTOK_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: refreshToken,
			client_key: clientKey,
			client_secret: clientSecret,
		}),
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			`Failed to refresh token: ${errorData.error?.message || response.statusText}`
		);
	}

	return await response.json();
}

/**
 * Revoke access token
 */
export async function revokeToken(
	accessToken: string,
	clientKey: string,
	clientSecret: string
): Promise<void> {
	const response = await fetch(
		"https://open.tiktokapis.com/v2/oauth/revoke/",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				token: accessToken,
				client_key: clientKey,
				client_secret: clientSecret,
			}),
		}
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			`Failed to revoke token: ${errorData.error?.message || response.statusText}`
		);
	}
}
