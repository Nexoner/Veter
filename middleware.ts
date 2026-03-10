import { NextRequest, NextResponse } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "default-secret";

async function hmacSha256(secret: string, message: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
    return Array.from(new Uint8Array(signature))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect admin routes (except login page and auth API)
    const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
    const isAdminApi = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth");

    // Allow GET requests to entity API (public data reading)
    if (pathname.startsWith("/api/admin/") && request.method === "GET" && !pathname.startsWith("/api/admin/auth")) {
        return NextResponse.next();
    }

    if (!isAdminPage && !isAdminApi) {
        return NextResponse.next();
    }

    // Check auth token
    const token = request.cookies.get("admin_token")?.value;
    const storedHash = request.cookies.get("admin_token_hash")?.value;

    if (!token || !storedHash) {
        if (isAdminPage) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const expectedHash = await hmacSha256(ADMIN_SECRET, token);

    if (expectedHash !== storedHash) {
        if (isAdminPage) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
