"use client";

import { useEffect, useRef, useState } from "react";
import { Clinic } from "@/data/clinics";

interface YandexMapProps {
    clinics: Clinic[];
}

declare global {
    interface Window {
        ymaps: any;
    }
}

export default function YandexMap({ clinics }: YandexMapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const [status, setStatus] = useState<"loading" | "ready" | "error">(
        "loading"
    );

    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

    useEffect(() => {
        if (!apiKey || !mapContainerRef.current) return;

        // Prevent double-init in StrictMode
        if (mapInstanceRef.current) return;

        let cancelled = false;

        async function initMap() {
            try {
                // Load the API script if not already loaded
                if (!window.ymaps) {
                    await new Promise<void>((resolve, reject) => {
                        // Check if script already exists
                        if (
                            document.querySelector(
                                'script[src*="api-maps.yandex.ru"]'
                            )
                        ) {
                            const check = () => {
                                if (window.ymaps) resolve();
                                else setTimeout(check, 100);
                            };
                            check();
                            return;
                        }

                        const script = document.createElement("script");
                        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
                        script.async = true;
                        script.onload = () => {
                            const check = () => {
                                if (window.ymaps) resolve();
                                else setTimeout(check, 100);
                            };
                            check();
                        };
                        script.onerror = () =>
                            reject(
                                new Error("Failed to load Yandex Maps API")
                            );
                        document.head.appendChild(script);
                    });
                }

                if (cancelled) return;

                // Wait for ymaps to be ready
                await new Promise<void>((resolve) => {
                    window.ymaps.ready(resolve);
                });

                if (cancelled) return;

                // Calculate center from clinics
                const lats = clinics.map((c) => c.coordinates.lat);
                const lngs = clinics.map((c) => c.coordinates.lng);
                const centerLat =
                    (Math.min(...lats) + Math.max(...lats)) / 2;
                const centerLng =
                    (Math.min(...lngs) + Math.max(...lngs)) / 2;

                const map = new window.ymaps.Map(mapContainerRef.current, {
                    center: [centerLat, centerLng],
                    zoom: 10,
                    controls: ["zoomControl", "fullscreenControl"],
                });

                // Add placemarks for each clinic
                clinics.forEach((clinic) => {
                    const placemark = new window.ymaps.Placemark(
                        [clinic.coordinates.lat, clinic.coordinates.lng],
                        {
                            balloonContentHeader: `<strong>${clinic.name}</strong>`,
                            balloonContentBody: `
                                <div style="font-size:13px;line-height:1.6">
                                    <div style="color:#374151">${clinic.address}</div>
                                    <div style="color:#6b7280">${clinic.metro}</div>
                                    <div style="margin-top:4px">
                                        <a href="tel:${clinic.phone.replace(/\D/g, "")}" 
                                           style="color:#10b981;font-weight:500;text-decoration:none">
                                            ${clinic.phone}
                                        </a>
                                    </div>
                                    <div style="color:#6b7280;font-size:12px;margin-top:2px">${clinic.hours}</div>
                                </div>
                            `,
                            hintContent: clinic.name,
                        },
                        {
                            preset: "islands#greenVeterinaryIcon",
                            iconColor: "#10b981",
                        }
                    );

                    map.geoObjects.add(placemark);
                });

                // Auto-fit bounds to show all markers
                if (clinics.length > 1) {
                    map.setBounds(
                        map.geoObjects.getBounds(),
                        { checkZoomRange: true, zoomMargin: 40 }
                    );
                }

                mapInstanceRef.current = map;

                if (!cancelled) {
                    setStatus("ready");
                }
            } catch (err) {
                console.error("Yandex Maps init error:", err);
                if (!cancelled) {
                    setStatus("error");
                }
            }
        }

        initMap();

        return () => {
            cancelled = true;
        };
    }, [apiKey, clinics]);

    // No API key — show a helpful message
    if (!apiKey) {
        return (
            <div className="ymap-container ymap-fallback">
                <p className="text-gray-500">
                    Для отображения карты добавьте{" "}
                    <code>NEXT_PUBLIC_YANDEX_MAPS_API_KEY</code> в{" "}
                    <code>.env.local</code>
                </p>
            </div>
        );
    }

    return (
        <div style={{
            position: "relative",
            borderRadius: "1.5rem",
            overflow: "hidden",
        }}>
            <div
                ref={mapContainerRef}
                style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "1.5rem",
                    position: "relative",
                }}
            >
                {status === "loading" && (
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f9fafb",
                        zIndex: 10,
                        borderRadius: "1.5rem",
                    }}>
                        <div style={{
                            width: 36,
                            height: 36,
                            border: "3px solid #e5e7eb",
                            borderTopColor: "var(--color-primary, #10b981)",
                            borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                        }} />
                        <p className="text-gray-500 mt-3">Загрузка карты…</p>
                    </div>
                )}
                {status === "error" && (
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f9fafb",
                        zIndex: 10,
                        borderRadius: "1.5rem",
                    }}>
                        <p className="text-red-500 font-medium">
                            Не удалось загрузить карту
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                            Проверьте API-ключ и соединение с интернетом
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
