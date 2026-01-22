import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

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
