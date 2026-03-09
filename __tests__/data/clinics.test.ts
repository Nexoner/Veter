import { clinics, Clinic } from "@/data/clinics";

describe("clinics data", () => {
    it("should have exactly 4 clinics", () => {
        expect(clinics).toHaveLength(4);
    });

    it("each clinic should have all required fields", () => {
        clinics.forEach((clinic: Clinic) => {
            expect(clinic.id).toBeDefined();
            expect(typeof clinic.id).toBe("number");
            expect(clinic.name).toBeTruthy();
            expect(clinic.address).toBeTruthy();
            expect(clinic.metro).toBeTruthy();
            expect(clinic.phone).toBeTruthy();
            expect(clinic.hours).toBeTruthy();
            expect(clinic.coordinates).toBeDefined();
            expect(typeof clinic.coordinates.lat).toBe("number");
            expect(typeof clinic.coordinates.lng).toBe("number");
        });
    });

    it("each clinic should have unique id", () => {
        const ids = clinics.map((c) => c.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("coordinates should be valid Moscow area lat/lng", () => {
        clinics.forEach((clinic) => {
            // Moscow lat: ~55.5–56.0, lng: ~37.3–38.0
            expect(clinic.coordinates.lat).toBeGreaterThan(55);
            expect(clinic.coordinates.lat).toBeLessThan(56.5);
            expect(clinic.coordinates.lng).toBeGreaterThan(37);
            expect(clinic.coordinates.lng).toBeLessThan(39);
        });
    });

    it("phone numbers should start with +7", () => {
        clinics.forEach((clinic) => {
            expect(clinic.phone).toMatch(/^\+7/);
        });
    });
});
