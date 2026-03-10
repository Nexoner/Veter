import { head, put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import type {
    EntityName,
    Doctor,
    ServiceCategory,
    Article,
    Clinic,
    ContactInfo,
    HomepageData,
    VolunteersData,
} from "./types";

// Blob store path prefix
const BLOB_PREFIX = "veterok-data";

// Check if running on Vercel (production)
const isVercel = !!process.env.BLOB_READ_WRITE_TOKEN;

/**
 * Read default (seed) data from local JSON file
 */
function readDefaults<T>(entity: EntityName): T {
    const filePath = path.join(process.cwd(), "data", "defaults", `${entity}.json`);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
}

/**
 * Get data for an entity.
 * - On Vercel: tries Blob store first, falls back to defaults
 * - Locally: reads from defaults
 */
export async function getData<T>(entity: EntityName): Promise<T> {
    if (isVercel) {
        try {
            const blobPath = `${BLOB_PREFIX}/${entity}.json`;
            // Check if blob exists
            const blobInfo = await head(blobPath);
            if (blobInfo) {
                const response = await fetch(blobInfo.url);
                return (await response.json()) as T;
            }
        } catch {
            // Blob doesn't exist yet — use defaults
        }
    }

    return readDefaults<T>(entity);
}

/**
 * Save data for an entity to Vercel Blob store.
 * In dev mode, saves to local JSON file for convenience.
 */
export async function saveData<T>(entity: EntityName, data: T): Promise<void> {
    const jsonString = JSON.stringify(data, null, 2);

    if (isVercel) {
        await put(`${BLOB_PREFIX}/${entity}.json`, jsonString, {
            access: "public",
            addRandomSuffix: false,
            contentType: "application/json",
        });
    } else {
        // Dev mode: save to defaults folder
        const filePath = path.join(process.cwd(), "data", "defaults", `${entity}.json`);
        fs.writeFileSync(filePath, jsonString, "utf-8");
    }
}

// ===== Typed getters for Server Components =====

export async function getDoctors(): Promise<Doctor[]> {
    return getData<Doctor[]>("doctors");
}

export async function getServices(): Promise<ServiceCategory[]> {
    return getData<ServiceCategory[]>("services");
}

export async function getArticles(): Promise<Article[]> {
    return getData<Article[]>("articles");
}

export async function getClinics(): Promise<Clinic[]> {
    return getData<Clinic[]>("clinics");
}

export async function getContacts(): Promise<ContactInfo> {
    return getData<ContactInfo>("contacts");
}

export async function getHomepageData(): Promise<HomepageData> {
    return getData<HomepageData>("homepage");
}

export async function getVolunteersData(): Promise<VolunteersData> {
    return getData<VolunteersData>("volunteers");
}
