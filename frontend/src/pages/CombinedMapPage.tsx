// src/pages/CombinedMapPage.tsx
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  CircleMarker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import { fetchHeatmapData } from "../services/api";

interface Reading {
  id: number;
  latitude: number;
  longitude: number;
  value: number;
  anomalous: boolean;
}

// Heatmap katmanı
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

export default function CombinedMapPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const center = { lat: 40.9, lng: 29.3 };
  const radiusKm = 100;

  useEffect(() => {
    fetchHeatmapData(center.lat, center.lng, radiusKm)
      .then((data: any[]) => {
        // API’den gelen her item id, lat, lng, value, anomalous
        setReadings(
          data.map((r) => ({
            id: r.id,
            latitude: r.latitude,
            longitude: r.longitude,
            value: r.value,
            anomalous: r.anomalous,
          }))
        );
      })
      .catch((err) => console.error("Veri alınamadı", err));
  }, [center.lat, center.lng, radiusKm]);

  // heatmap için [lat,lng,intensity] dizisi
  const heatPoints = readings.map((r) => [
    r.latitude,
    r.longitude,
    r.value,
  ]) as [number, number, number][];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🗺️ Harita Görünümleri
      </h1>
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom
        className="leaflet-container w-full h-[500px] rounded-lg shadow"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayersControl position="topright">
          {/* Live / Nokta gösterimi */}
          <LayersControl.Overlay name="Canlı Noktalar" checked>
            <LayerGroupRenderer readings={readings} />
          </LayersControl.Overlay>

          {/* Isı Haritası */}
          <LayersControl.Overlay name="Isı Haritası">
            <HeatmapLayer points={heatPoints} />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

// Live noktaları tek bir fonksiyon bileşenle render edelim
function LayerGroupRenderer({ readings }: { readings: Reading[] }) {
  return (
    <>
      {readings.map((r) => (
        <CircleMarker
          key={r.id}
          center={[r.latitude, r.longitude]}
          radius={8}
          pathOptions={{
            color: r.anomalous ? "red" : "green",
            fillOpacity: 0.7,
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            <div className="text-xs">
              <strong>{r.value}</strong>{" "}
              {r.anomalous && <span className="text-red-500">ANOMALİ</span>}
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}
