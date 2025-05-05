import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { fetchHeatmapData } from "../services/api";

interface Reading {
  latitude: number;
  longitude: number;
  value: number;
}

function HeatmapLayer({ points }: { points: [number, number, number][] }) {
  const map = useMap();
  useEffect(() => {
    const heat = (L as any).heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
    });
    heat.addTo(map);
    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);
  return null;
}

export default function HeatmapPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const center = { lat: 40.9, lng: 29.3 };
  const radius = 100;

  useEffect(() => {
    fetchHeatmapData(center.lat, center.lng, radius)
      .then((res: any[]) => {
        const pts = res.map(
          (r) => [r.latitude, r.longitude, r.value] as [number, number, number]
        );
        setReadings(
          pts.map(([lat, lng, value]) => ({
            latitude: lat,
            longitude: lng,
            value,
          }))
        );
      })
      .catch((err) => console.error("Heatmap verisi alınamadı", err));
  }, [center.lat, center.lng, radius]);

  const heatPoints: [number, number, number][] = readings.map((r) => [
    r.latitude,
    r.longitude,
    r.value,
  ]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🔥 Isı Haritası</h1>
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom
        className="leaflet-container w-full h-[400px] rounded-lg shadow"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HeatmapLayer points={heatPoints} />
      </MapContainer>
      <p className="text-sm text-gray-600 mt-2 text-center">
        🌡️ Noktaların yoğunluğuna göre renk skalası gösterir.
      </p>
    </div>
  );
}
