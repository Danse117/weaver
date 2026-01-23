/**
 * OAuth State Storage API Route
 * 
 * Securely stores OAuth state and PKCE code_verifier in HTTP-only cookies
 * before redirecting the user to the OAuth provider.
 * 
 * Why this is needed:
 * - OAuth state and PKCE verifier must persist across the redirect to the OAuth provider
 * - HTTP-only cookies protect against XSS attacks
 * - Session storage/localStorage are not accessible from popups in some browsers
 * 
 * Flow:
 * 1. Client generates state and PKCE challenge/verifier
 * 2. Client POSTs state and verifier to this endpoint
 * 3. Server stores them in secure HTTP-only cookie
 * 4. Client opens OAuth URL in popup/redirect
 * 5. OAuth callback reads cookie to verify state and complete PKCE
 * 
 * Security:
 * - HTTP-only cookies (not accessible via JavaScript)
 * - SameSite=Lax to prevent CSRF
 * - Short expiry (10 minutes)
 * - State is used as cookie suffix for multi-account scenarios
 */

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Store OAuth state and PKCE verifier in secure cookie
 * 
 * Request body:
 * - state: Random OAuth state string
 * - code_verifier: PKCE code verifier
 * 
 * @param request - Next.js request with JSON body
 * @returns JSON success response with cookie set
 */
export async function POST(request: NextRequest) {
	try {
		const { state, code_verifier } = await request.json();

		if (!state || !code_verifier) {
			return NextResponse.json(
				{ error: "Missing required fields" },
				{ status: 400 }
			);
		}

		const cookieStore = await cookies();

		// Store OAuth state in cookie (expires in 10 minutes)
		cookieStore.set(`oauth_state_${state}`, JSON.stringify({ code_verifier }), {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 600, // 10 minutes
			path: "/",
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to store OAuth state:", error);
		return NextResponse.json(
			{ error: "Failed to store OAuth state" },
			{ status: 500 }
		);
	}
}
