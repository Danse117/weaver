/**
 * TikTok OAuth 2.0 with PKCE Implementation
 * 
 * This module handles the complete OAuth 2.0 authorization flow for TikTok,
 * implementing PKCE (Proof Key for Code Exchange) for enhanced security.
 * 
 * Flow:
 * 1. Generate PKCE challenge and verifier
 * 2. Build authorization URL with challenge
 * 3. User authorizes on TikTok
 * 4. Exchange authorization code for access/refresh tokens using verifier
 * 5. Refresh tokens when they expire
 * 
 * @see https://developers.tiktok.com/doc/login-kit-web
 */

import {
	PKCEChallenge,
	TikTokOAuthTokenResponse,
	TikTokRefreshTokenResponse,
} from "./types";

const TIKTOK_AUTH_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";

/**
 * Required OAuth scopes for TikTok integration
 * - user.info.basic: Basic user information (open_id, union_id)
 * - user.info.profile: Profile details (username, display name, avatar, bio)
 * - user.info.stats: Account stats (followers, following, likes, video count)
 * - video.list: List and query user's videos with metrics
 */
export const TIKTOK_SCOPES = [
	"user.info.basic",
	"user.info.profile",
	"user.info.stats",
	"video.list",
];

/**
 * Generate a cryptographically secure random string
 * Used for PKCE code verifier and OAuth state parameter
 * 
 * @param length - Length of the string to generate
 * @returns Random string using unreserved characters per RFC 7636
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
 * Generate SHA-256 hash of a string
 * Used to create PKCE code challenge from code verifier
 * 
 * @param plain - The plain text string to hash
 * @returns SHA-256 hash as ArrayBuffer
 */
async function sha256(plain: string): Promise<ArrayBuffer> {
	const encoder = new TextEncoder();
	const data = encoder.encode(plain);
	return await crypto.subtle.digest("SHA-256", data);
}

/**
 * Base64 URL-safe encoding (RFC 4648 §5)
 * Converts ArrayBuffer to base64 and replaces URL-unsafe characters
 * 
 * @param buffer - The ArrayBuffer to encode
 * @returns Base64 URL-safe encoded string (no +, /, or = characters)
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
 * Generate PKCE (Proof Key for Code Exchange) challenge and verifier
 * 
 * PKCE prevents authorization code interception attacks by:
 * 1. Client generates a random code_verifier
 * 2. Client creates code_challenge = SHA256(code_verifier)
 * 3. Client sends code_challenge with auth request
 * 4. Client sends code_verifier with token request
 * 5. Server verifies SHA256(code_verifier) === code_challenge
 * 
 * @returns Object containing code_verifier (store securely) and code_challenge (send to TikTok)
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
 * Generate random state parameter for CSRF protection
 * 
 * The state parameter prevents CSRF attacks by:
 * 1. Client generates random state before redirect
 * 2. Client stores state in session/cookie
 * 3. TikTok returns state in callback
 * 4. Client verifies returned state matches stored state
 * 
 * @returns Random 32-character state string
 */
export function generateState(): string {
	return generateRandomString(32);
}

/**
 * Build TikTok OAuth authorization URL
 * 
 * Constructs the URL to redirect users to TikTok for authorization.
 * User will be prompted to allow Weaver to access their TikTok account.
 * 
 * @param clientKey - TikTok app client key from developer portal
 * @param redirectUri - Where TikTok redirects after authorization (must match portal config)
 * @param state - Random state for CSRF protection
 * @param codeChallenge - PKCE code challenge (SHA256 of code verifier)
 * @param scopes - Array of permission scopes to request
 * @returns Full authorization URL to redirect user to
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
 * Exchange authorization code for access and refresh tokens
 * 
 * Called after user authorizes and TikTok redirects back with a code.
 * Exchanges the one-time authorization code for:
 * - access_token: Used for API requests (expires in 24 hours)
 * - refresh_token: Used to get new access tokens (long-lived)
 * - open_id: TikTok's unique identifier for the user
 * 
 * @param code - Authorization code from TikTok callback
 * @param codeVerifier - PKCE code verifier (matches the challenge sent earlier)
 * @param clientKey - TikTok app client key
 * @param clientSecret - TikTok app client secret
 * @param redirectUri - Same redirect URI used in authorization (for validation)
 * @returns Token response with access_token, refresh_token, expires_in, open_id, and scopes
 * @throws Error if token exchange fails or parameters are invalid
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
 * Refresh an expired access token using a refresh token
 * 
 * TikTok access tokens expire after 24 hours. Use this function to get a new
 * access token without requiring the user to re-authorize.
 * 
 * Note: Each refresh invalidates the old access token and may issue a new refresh token.
 * Always update both tokens in your database after refreshing.
 * 
 * @param refreshToken - The refresh token from previous OAuth flow or refresh
 * @param clientKey - TikTok app client key
 * @param clientSecret - TikTok app client secret
 * @returns New token response with fresh access_token and possibly new refresh_token
 * @throws Error if refresh fails (token expired, revoked, or invalid)
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
 * Revoke an access token (disconnect account)
 * 
 * Call this when a user wants to disconnect their TikTok account from Weaver.
 * Immediately invalidates the access token, preventing further API access.
 * 
 * Best practice: Revoke the token before deleting it from your database.
 * 
 * @param accessToken - The access token to revoke
 * @param clientKey - TikTok app client key
 * @param clientSecret - TikTok app client secret
 * @throws Error if revocation fails
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
