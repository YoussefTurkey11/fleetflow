"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MapRoute,
  MarkerLabel,
} from "@/components/ui/map";
import { Loader2, Clock, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Point {
  name: string;
  lng: number;
  lat: number;
  label: string; // Origin, Pickup, Delivery
}

interface RouteData {
  coordinates: [number, number][];
  duration: number;
  distance: number;
}

interface MapLoadProps {
  origin: string;
  pickup: string;
  delivery: string;
  focusedField?: "Origin" | "Pickup" | "Delivery" | null;
  onDistanceCalculated?: (distance: number) => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours}h ${remainingMins}m`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function MapLoad({
  origin,
  pickup,
  delivery,
  focusedField,
  onDistanceCalculated,
}: MapLoadProps) {
  const [points, setPoints] = useState<Point[]>([]);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ تصحيح 1: تمرير قيمة ابتدائية (null)
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (routes.length > 0 && selectedIndex < routes.length) {
      const distanceInMeters = routes[selectedIndex].distance;
      const distanceInKm = distanceInMeters / 1000;
      // تقريب إلى منزلتين عشريتين
      onDistanceCalculated?.(Math.round(distanceInKm * 100) / 100);
    } else {
      // إذا لم يكن هناك مسار، نمرر 0 (أو null)
      onDistanceCalculated?.(0);
    }
  }, [routes, selectedIndex, onDistanceCalculated]);

  // تحويل العنوان إلى إحداثيات باستخدام Nominatim
  const geocodeAddress = async (
    address: string,
    label: string,
  ): Promise<Point | null> => {
    if (!address.trim()) return null;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        { headers: { "User-Agent": "FleetFlow" } },
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        return {
          name: display_name,
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          label,
        };
      }
      return null;
    } catch (err) {
      console.error(`Geocoding error for ${label}:`, err);
      return null;
    }
  };

  const updateMap = useCallback(
    async (originStr: string, pickupStr: string, deliveryStr: string) => {
      setIsLoading(true);
      setError(null);

      const [originPoint, pickupPoint, deliveryPoint] = await Promise.all([
        geocodeAddress(originStr, "Origin"),
        geocodeAddress(pickupStr, "Pickup"),
        geocodeAddress(deliveryStr, "Delivery"),
      ]);

      const validPoints = [originPoint, pickupPoint, deliveryPoint].filter(
        (p) => p !== null,
      ) as Point[];
      setPoints(validPoints);

      if (validPoints.length >= 2) {
        // ✅ تصحيح 2: استخدام Record للسماح بالفهرسة بأي string
        const order: Record<string, number> = {
          Origin: 0,
          Pickup: 1,
          Delivery: 2,
        };
        const orderedPoints = validPoints.sort(
          (a, b) => order[a.label] - order[b.label],
        );

        const coordsStr = orderedPoints
          .map((p) => `${p.lng},${p.lat}`)
          .join(";");
        try {
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson&alternatives=true`,
          );
          const data = await response.json();
          if (data.routes?.length > 0) {
            const routeData: RouteData[] = data.routes.map((route: any) => ({
              coordinates: route.geometry.coordinates,
              duration: route.duration,
              distance: route.distance,
            }));
            setRoutes(routeData);
          } else {
            setError("لم يتم العثور على مسار");
          }
        } catch (err) {
          console.error("Failed to fetch routes:", err);
          setError("فشل في جلب المسار");
        }
      } else {
        setRoutes([]);
      }

      setIsLoading(false);
    },
    [],
  );

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      updateMap(origin, pickup, delivery);
    }, 500);

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [origin, pickup, delivery, updateMap]);

  // ترتيب المسارات بحيث يكون المحدد في الأعلى
  const sortedRoutes = routes
    .map((route, index) => ({ route, index }))
    .sort((a, b) => {
      if (a.index === selectedIndex) return 1;
      if (b.index === selectedIndex) return -1;
      return 0;
    });

  // حساب مركز الخريطة
  const mapCenter =
    points.length > 0
      ? [
          points.reduce((sum, p) => sum + p.lng, 0) / points.length,
          points.reduce((sum, p) => sum + p.lat, 0) / points.length,
        ]
      : [4.69, 52.14];

  useEffect(() => {
    if (!focusedField || points.length === 0) return;

    const targetPoint = points.find((p) => p.label === focusedField);
    if (targetPoint) {
      if (mapRef.current && mapRef.current.flyTo) {
        mapRef.current.flyTo([targetPoint.lat, targetPoint.lng], 12, {
          duration: 1.5,
        });
      }
    }
  }, [focusedField, points]);

  return (
    <div className="h-60 sm:h-full w-full relative">
      <Map center={mapCenter as [number, number]} zoom={8.5}>
        {/* رسم المسارات */}
        {sortedRoutes.map(({ route, index }) => {
          const isSelected = index === selectedIndex;
          return (
            <MapRoute
              key={index}
              coordinates={route.coordinates}
              color={isSelected ? "#6366f1" : "#94a3b8"}
              width={isSelected ? 6 : 5}
              opacity={isSelected ? 1 : 0.6}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })}

        {/* علامات النقاط */}
        {points.map((point, idx) => (
          <MapMarker key={idx} longitude={point.lng} latitude={point.lat}>
            <MarkerContent>
              <div
                className={`size-5 rounded-full border-2 border-white shadow-lg ${
                  point.label === "Origin"
                    ? "bg-blue-500"
                    : point.label === "Pickup"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
              />
              <MarkerLabel
                position={idx === 0 ? "top" : idx === 1 ? "bottom" : "top"}
              >
                {point.label}
              </MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}
      </Map>

      {/* لوحة اختيار المسارات البديلة */}
      {routes.length > 0 && (
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {routes.map((route, index) => {
            const isActive = index === selectedIndex;
            const isFastest = index === 0;
            return (
              <Button
                key={index}
                variant={isActive ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedIndex(index)}
                className="justify-start gap-3"
              >
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span className="font-medium">
                    {formatDuration(route.duration)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs opacity-80">
                  <Route className="size-3" />
                  {formatDistance(route.distance)}
                </div>
                {isFastest && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    Fastest
                  </span>
                )}
              </Button>
            );
          })}
        </div>
      )}

      {/* مؤشر التحميل */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* رسالة الخطأ */}
      {error && (
        <div className="absolute bottom-3 left-3 right-3 bg-destructive/10 text-destructive p-2 rounded text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
