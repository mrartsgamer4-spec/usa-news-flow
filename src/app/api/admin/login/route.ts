import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // .env.local থেকে সিক্রেট পাসওয়ার্ড রিড করা
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (expectedPassword && password === expectedPassword) {
            const response = NextResponse.json(
                { success: true, message: "Login successful" },
                { status: 200 }
            );

            // সিকিউর কুকি সেট
            response.cookies.set("admin_token", "authenticated", {
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24, // ১ দিন
            });

            return response;
        }

        return NextResponse.json(
            { success: false, message: "Incorrect password" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error occurred" },
            { status: 500 }
        );
    }
}