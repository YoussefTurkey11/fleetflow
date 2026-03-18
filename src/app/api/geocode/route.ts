import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get("address");
  const limit = searchParams.get("limit") || "1";

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  // بناء URL Nominatim
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=${limit}`;
  console.log("Fetching from Nominatim:", url);

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "FleetFlow (you.turkey11@gmail.com)",
        Accept: "application/json",
      },
    });

    console.log("Nominatim response status:", response.status);

    if (!response.ok) {
      // حاول قراءة نص الخطأ من Nominatim
      const errorText = await response.text();
      console.error("Nominatim error response:", errorText);
      throw new Error(`Nominatim API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Nominatim data count:", data.length);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Geocoding proxy error:", error);
    return NextResponse.json(
      { error: "Failed to geocode address", details: (error as Error).message },
      { status: 500 },
    );
  }
}
