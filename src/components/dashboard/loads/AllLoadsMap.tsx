"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Map,
  MapMarker,
  MarkerContent,
  MapRoute,
  MarkerLabel,
} from "@/components/ui/map";
import { Loader2, Eye, EyeOff, MapPin, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { Load } from "@/types/loadType";
import { AddLoad } from "./AddLoad";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Point {
  name: string;
  lng: number;
  lat: number;
  label: "Origin" | "Pickup" | "Delivery";
  loadId: number;
}

interface RouteData {
  coordinates: [number, number][];
  duration: number;
  distance: number;
}

interface LoadMapData {
  id: number;
  points: Point[];
  route: RouteData | null;
  color: string;
}

interface LoadsMapProps {
  loads: Load[];
  className?: string;
}

const getLoadColor = (id: number): string => {
  const colors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#f97316",
    "#6b7280",
    "#14b8a6",
  ];
  return colors[id % colors.length];
};

export function AllLoadsMap({ loads, className = "" }: LoadsMapProps) {
  const [loadsData, setLoadsData] = useState<LoadMapData[]>([]);
  const [visibleLoads, setVisibleLoads] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    30.0444, 31.2357,
  ]); // القاهرة
  const pathname = usePathname();

  const abortControllerRef = useRef<AbortController | null>(null);

  // دالة الترميز الجغرافي مع دعم الإلغاء
  const geocodeAddress = async (
    address: string,
    label: "Origin" | "Pickup" | "Delivery",
    loadId: number,
    signal?: AbortSignal,
  ): Promise<Point | null> => {
    if (!address.trim()) return null;
    try {
      const response = await fetch(
        `/api/geocode?address=${encodeURIComponent(address)}`,
        { signal },
      );
      if (!response.ok) throw new Error(`Geocoding failed: ${response.status}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        return {
          name: display_name,
          lat: parseFloat(lat),
          lng: parseFloat(lon),
          label,
          loadId,
        };
      }
      return null;
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        console.error(`Geocoding error for ${label} (load ${loadId}):`, err);
      }
      return null;
    }
  };

  useEffect(() => {
    if (!loads || loads.length === 0) {
      setLoadsData([]);
      return;
    }

    const fetchAllData = async () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
      const { signal } = abortController;

      setIsLoading(true);
      setError(null);

      const limitedLoads = loads.slice(0, 10);
      const newLoadsData: LoadMapData[] = [];

      for (const load of limitedLoads) {
        try {
          const [originPoint, pickupPoint, deliveryPoint] = await Promise.all([
            geocodeAddress(load.Origin, "Origin", load.id, signal),
            geocodeAddress(load.Pickup, "Pickup", load.id, signal),
            geocodeAddress(load.Delivery, "Delivery", load.id, signal),
          ]);

          const points = [originPoint, pickupPoint, deliveryPoint].filter(
            (p): p is Point => p !== null,
          );

          let route: RouteData | null = null;
          if (points.length >= 2) {
            // ترتيب النقاط حسب الترتيب الطبيعي
            const order: Record<"Origin" | "Pickup" | "Delivery", number> = {
              Origin: 0,
              Pickup: 1,
              Delivery: 2,
            };
            const orderedPoints = [...points].sort(
              (a, b) => order[a.label] - order[b.label],
            );

            const coordsStr = orderedPoints
              .map((p) => `${p.lng},${p.lat}`)
              .join(";");

            try {
              const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${coordsStr}?overview=full&geometries=geojson&alternatives=false`,
                { signal },
              );
              const data = await response.json();
              if (data.routes?.length > 0) {
                const r = data.routes[0];
                route = {
                  coordinates: r.geometry.coordinates,
                  duration: r.duration,
                  distance: r.distance,
                };
              }
            } catch (err) {
              if ((err as Error).name !== "AbortError") {
                console.error(
                  `Failed to fetch route for load ${load.id}:`,
                  err,
                );
              }
            }
          }

          newLoadsData.push({
            id: load.id,
            points,
            route,
            color: getLoadColor(load.id),
          });
        } catch (err) {
          console.error(`Error processing load ${load.id}:`, err);
        }
      }

      if (!signal.aborted) {
        setLoadsData(newLoadsData);
        setVisibleLoads(new Set(newLoadsData.map((ld) => ld.id)));

        const allPoints = newLoadsData.flatMap((ld) => ld.points);
        if (allPoints.length > 0) {
          const avgLng =
            allPoints.reduce((sum, p) => sum + p.lng, 0) / allPoints.length;
          const avgLat =
            allPoints.reduce((sum, p) => sum + p.lat, 0) / allPoints.length;
          setMapCenter([avgLng, avgLat]);
        }
        setIsLoading(false);
      }
    };

    fetchAllData();

    return () => abortControllerRef.current?.abort();
  }, [loads]);

  const toggleLoad = (loadId: number) => {
    setVisibleLoads((prev) => {
      const newSet = new Set(prev);
      newSet.has(loadId) ? newSet.delete(loadId) : newSet.add(loadId);
      return newSet;
    });
  };

  const toggleAll = (show: boolean) => {
    setVisibleLoads(show ? new Set(loadsData.map((ld) => ld.id)) : new Set());
  };

  const visiblePoints = loadsData
    .filter((ld) => visibleLoads.has(ld.id))
    .flatMap((ld) => ld.points);

  const visibleRoutes = loadsData
    .filter((ld) => visibleLoads.has(ld.id) && ld.route)
    .map((ld) => ({ ...ld.route!, color: ld.color, loadId: ld.id }));

  return (
    <div
      className={`relative h-100 lg:h-full w-full rounded-lg overflow-hidden ${className}`}
    >
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <h6 className="text-base font-semibold">Loads list</h6>
          <p className="text-muted-foreground mt-1 text-sm">
            See information about all loads
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          {pathname.startsWith("/admin") && (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={<Link href="/loads">View all</Link>}
            />
          )}

          <AddLoad />
        </div>
      </div>

      <Map center={mapCenter} zoom={6} className="h-full w-full">
        {visibleRoutes.map((route) => (
          <MapRoute
            key={route.loadId}
            coordinates={route.coordinates}
            color={route.color}
            width={4}
            opacity={0.8}
          />
        ))}

        {visiblePoints.map((point, idx) => (
          <MapMarker
            key={`${point.loadId}-${point.label}-${idx}`}
            longitude={point.lng}
            latitude={point.lat}
          >
            <MarkerContent>
              <div
                className="size-5 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: getLoadColor(point.loadId) }}
              />
              <MarkerLabel
                position="top"
                className="whitespace-nowrap bg-background/80 px-1 rounded text-xs"
              >
                {point.label} (Load #{point.loadId})
              </MarkerLabel>
            </MarkerContent>
          </MapMarker>
        ))}
      </Map>

      {/* لوحة التحكم */}
      <Card className="hidden md:flex absolute top-25 right-3 w-64 h-64 p-2 shadow-lg bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm">Loads ({loadsData.length})</h3>
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2"
              onClick={() => toggleAll(true)}
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 px-2"
              onClick={() => toggleAll(false)}
            >
              <EyeOff className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-80">
          <div className="space-y-1">
            {loadsData.map((ld) => (
              <div
                key={ld.id}
                className={`flex items-center justify-between p-1.5 rounded cursor-pointer hover:bg-accent transition-colors ${
                  visibleLoads.has(ld.id) ? "bg-accent/50" : "opacity-50"
                }`}
                onClick={() => toggleLoad(ld.id)}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: ld.color }}
                  />
                  <span className="text-xs truncate">Load #{ld.id}</span>
                </div>
                <Badge
                  variant={ld.points.length === 3 ? "default" : "destructive"}
                  className="text-[10px] h-4"
                >
                  {ld.points.length}/3
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
          <Loader2 className="size-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="absolute bottom-3 left-3 right-3 bg-destructive/10 text-destructive p-2 rounded text-sm z-10">
          {error}
        </div>
      )}
    </div>
  );
}
