import { NextRequest, NextResponse } from "next/server";
import { getData, saveData } from "@/lib/data-store";
import type { EntityName } from "@/lib/types";

const VALID_ENTITIES: EntityName[] = [
    "doctors",
    "services",
    "articles",
    "clinics",
    "contacts",
    "homepage",
    "volunteers",
];

function isValidEntity(entity: string): entity is EntityName {
    return VALID_ENTITIES.includes(entity as EntityName);
}

// GET — read data for an entity
export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ entity: string }> }
) {
    const { entity } = await params;

    if (!isValidEntity(entity)) {
        return NextResponse.json(
            { error: `Unknown entity: ${entity}` },
            { status: 404 }
        );
    }

    try {
        const data = await getData(entity);
        return NextResponse.json(data);
    } catch {
        return NextResponse.json(
            { error: "Failed to read data" },
            { status: 500 }
        );
    }
}

// PUT — save data for an entity (protected by middleware)
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ entity: string }> }
) {
    const { entity } = await params;

    if (!isValidEntity(entity)) {
        return NextResponse.json(
            { error: `Unknown entity: ${entity}` },
            { status: 404 }
        );
    }

    try {
        const data = await request.json();
        await saveData(entity, data);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Failed to save data" },
            { status: 500 }
        );
    }
}
