import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // Environment Variable অথবা Hardcoded Fallback
        const adminPassword = process.env.ADMIN_PASSWORD || process.env.SECRET_PASSWORD || "admin123";

        // Input trimming to prevent space issues
        if (password && password.trim() === adminPassword.trim()) {
            const response = NextResponse.json({ success: true, message: "Login successful" });

            // Set Secure HTTP-Only Cookie
            response.cookies.set("admin_token", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
                maxAge: 60 * 60 * 24, // 1 day
            });

            return response;
        }

        return NextResponse.json(
            { success: false, message: "Invalid password" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}