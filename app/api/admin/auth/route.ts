import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";
const ADMIN_SECRET = process.env.ADMIN_SECRET || "default-secret";

function generateToken(): string {
    return crypto
        .createHmac("sha256", ADMIN_SECRET)
        .update(Date.now().toString() + crypto.randomBytes(16).toString("hex"))
        .digest("hex");
}

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
            const cookieStore = await cookies();

            cookieStore.set("admin_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/",
            });

            // Store token hash for validation
            cookieStore.set("admin_token_hash",
                crypto.createHmac("sha256", ADMIN_SECRET).update(token).digest("hex"),
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 60 * 60 * 24,
                    path: "/",
                }
            );

            return NextResponse.json({ success: true });
        }

        if (action === "logout") {
            const cookieStore = await cookies();
            cookieStore.delete("admin_token");
            cookieStore.delete("admin_token_hash");
            return NextResponse.json({ success: true });
        }

        if (action === "check") {
            const cookieStore = await cookies();
            const token = cookieStore.get("admin_token")?.value;
            const storedHash = cookieStore.get("admin_token_hash")?.value;

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
