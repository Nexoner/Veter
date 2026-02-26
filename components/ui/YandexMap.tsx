"use client";

import { useEffect, useRef, useState } from "react";
import { Clinic } from "@/data/clinics";

interface YandexMapProps {
    clinics: Clinic[];
}

declare global {
    interface Window {
        ymaps3: any;
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
                if (!window.ymaps3) {
                    await new Promise<void>((resolve, reject) => {
                        // Check if script already exists
                        if (
                            document.querySelector(
                                'script[src*="api-maps.yandex.ru"]'
                            )
                        ) {
                            const check = () => {
                                if (window.ymaps3) resolve();
                                else setTimeout(check, 100);
                            };
                            check();
                            return;
                        }

                        const script = document.createElement("script");
                        script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
                        script.async = true;
                        script.onload = () => {
                            const check = () => {
                                if (window.ymaps3) resolve();
                                else setTimeout(check, 100);
                            };
                            check();
                        };
                        script.onerror = () =>
                            reject(new Error("Failed to load Yandex Maps API"));
                        document.head.appendChild(script);
                    });
                }

                if (cancelled) return;

                await window.ymaps3.ready;

                if (cancelled) return;

                const {
                    YMap,
                    YMapDefaultSchemeLayer,
                    YMapDefaultFeaturesLayer,
                    YMapMarker,
                    YMapControls,
                } = window.ymaps3;

                // Import controls module
                const { YMapZoomControl } =
                    await window.ymaps3.import("@yandex/ymaps3-controls@0.0.1");

                // Calculate bounds to fit all clinics
                const lats = clinics.map((c) => c.coordinates.lat);
                const lngs = clinics.map((c) => c.coordinates.lng);
                const centerLat =
                    (Math.min(...lats) + Math.max(...lats)) / 2;
                const centerLng =
                    (Math.min(...lngs) + Math.max(...lngs)) / 2;

                const map = new YMap(mapContainerRef.current, {
                    location: {
                        center: [centerLng, centerLat],
                        zoom: 10,
                    },
                });

                map.addChild(new YMapDefaultSchemeLayer({}));
                map.addChild(new YMapDefaultFeaturesLayer({}));

                // Add zoom controls
                const controls = new YMapControls({ position: "right" });
                controls.addChild(new YMapZoomControl({}));
                map.addChild(controls);

                // Add markers for each clinic
                clinics.forEach((clinic) => {
                    const markerElement = document.createElement("div");
                    markerElement.className = "ymap-marker";
                    markerElement.innerHTML = `
                        <div class="ymap-marker-pin">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
                                <circle cx="12" cy="9" r="2.5" fill="white"/>
                            </svg>
                        </div>
                    `;

                    // Tooltip on hover
                    const tooltip = document.createElement("div");
                    tooltip.className = "ymap-tooltip";
                    tooltip.innerHTML = `
                        <div class="ymap-tooltip-name">${clinic.name}</div>
                        <div class="ymap-tooltip-address">${clinic.address}</div>
                        <div class="ymap-tooltip-phone">${clinic.phone}</div>
                    `;
                    markerElement.appendChild(tooltip);

                    const marker = new YMapMarker(
                        {
                            coordinates: [
                                clinic.coordinates.lng,
                                clinic.coordinates.lat,
                            ],
                        },
                        markerElement
                    );

                    map.addChild(marker);
                });

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
        <div className="ymap-wrapper">
            <div ref={mapContainerRef} className="ymap-container">
                {status === "loading" && (
                    <div className="ymap-overlay">
                        <div className="ymap-spinner" />
                        <p className="text-gray-500 mt-3">Загрузка карты…</p>
                    </div>
                )}
                {status === "error" && (
                    <div className="ymap-overlay">
                        <p className="text-red-500 font-medium">
                            Не удалось загрузить карту
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                            Проверьте API-ключ и соединение с интернетом
                        </p>
                    </div>
                )}
            </div>

            {/* Scoped styles */}
            <style jsx>{`
                .ymap-wrapper {
                    position: relative;
                    border-radius: 1.5rem;
                    overflow: hidden;
                }
                .ymap-container {
                    width: 100%;
                    height: 400px;
                    border-radius: 1.5rem;
                    position: relative;
                }
                .ymap-fallback {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #f3f4f6;
                }
                .ymap-overlay {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    background: #f9fafb;
                    z-index: 10;
                    border-radius: 1.5rem;
                }
                .ymap-spinner {
                    width: 36px;
                    height: 36px;
                    border: 3px solid #e5e7eb;
                    border-top-color: var(--color-primary, #10b981);
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                }
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>

            {/* Global marker styles */}
            <style jsx global>{`
                .ymap-marker {
                    position: relative;
                    cursor: pointer;
                }
                .ymap-marker-pin {
                    color: var(--color-primary, #10b981);
                    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
                    transition: transform 0.2s ease;
                    transform: translate(-12px, -24px);
                }
                .ymap-marker:hover .ymap-marker-pin {
                    transform: translate(-12px, -28px) scale(1.15);
                }
                .ymap-tooltip {
                    display: none;
                    position: absolute;
                    bottom: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: white;
                    border-radius: 12px;
                    padding: 12px 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                    white-space: nowrap;
                    z-index: 100;
                    min-width: 200px;
                }
                .ymap-marker:hover .ymap-tooltip {
                    display: block;
                }
                .ymap-tooltip-name {
                    font-weight: 600;
                    font-size: 14px;
                    color: #111827;
                    margin-bottom: 4px;
                }
                .ymap-tooltip-address {
                    font-size: 13px;
                    color: #6b7280;
                    margin-bottom: 2px;
                }
                .ymap-tooltip-phone {
                    font-size: 13px;
                    color: var(--color-primary, #10b981);
                    font-weight: 500;
                }
            `}</style>
        </div>
    );
}
