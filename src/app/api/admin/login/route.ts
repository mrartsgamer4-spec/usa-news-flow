export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        // Replace with secure authentication logic
        if (password === process.env.ADMIN_PASSWORD || password === 'admin123') {
            return NextResponse.json({ success: true, token: 'mock-admin-token' });
        }

        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, message: 'Bad request' },
            { status: 400 }
        );
    }
}