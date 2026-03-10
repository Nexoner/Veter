import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "default-secret";

function generateToken(): string {
    return crypto
        .createHmac("sha256", ADMIN_SECRET)
        .update(Date.now().toString() + crypto.randomBytes(16).toString("hex"))
        .digest("hex");
}

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, password } = body;

        if (action === "login") {
            if (password !== ADMIN_PASSWORD) {
                return NextResponse.json(
                    { error: "Неверный пароль" },
                    { status: 401 }
                );
            }

            const token = generateToken();
            const tokenHash = crypto
                .createHmac("sha256", ADMIN_SECRET)
                .update(token)
                .digest("hex");

            const response = NextResponse.json({ success: true });

            response.cookies.set("admin_token", token, COOKIE_OPTIONS);
            response.cookies.set("admin_token_hash", tokenHash, COOKIE_OPTIONS);

            return response;
        }

        if (action === "logout") {
            const response = NextResponse.json({ success: true });
            response.cookies.delete("admin_token");
            response.cookies.delete("admin_token_hash");
            return response;
        }

        if (action === "check") {
            const token = request.cookies.get("admin_token")?.value;
            const storedHash = request.cookies.get("admin_token_hash")?.value;

            if (!token || !storedHash) {
                return NextResponse.json({ authenticated: false });
            }

            const expectedHash = crypto
                .createHmac("sha256", ADMIN_SECRET)
                .update(token)
                .digest("hex");

            return NextResponse.json({
                authenticated: expectedHash === storedHash,
            });
        }

        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    } catch {
        return NextResponse.json(
            { error: "Invalid request" },
            { status: 400 }
        );
    }
}
