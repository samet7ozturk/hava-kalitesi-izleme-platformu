import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import { fetchHeatmapData } from "../services/api";
import "leaflet/dist/leaflet.css";

interface Reading {
  id: number;
  latitude: number;
  longitude: number;
  parameter: string;
  value: number;
  timestamp: number;
  anomalous: boolean;
}

export default function LiveMapPage() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const center = { lat: 40.9, lng: 29.3 };
  const radius = 100;

  useEffect(() => {
    fetchHeatmapData(center.lat, center.lng, radius)
      .then(setReadings)
      .catch((err) => console.error("Veri alınamadı", err));
  }, [center.lat, center.lng, radius]);

  return (
    <div className="p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
        🗺️ Harita Üzerinde Kirlilik Değerleri
      </h1>

      <div className="bg-white rounded-lg shadow-md p-2 sm:p-4 mb-4">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom
          className="leaflet-container w-full h-[200px] sm:h-[350px] md:h-[500px] rounded-lg"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
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
                  <strong>{r.parameter}</strong>: {r.value}
                  <br />
                  {new Date(r.timestamp * 1000).toLocaleString("tr-TR")}
                </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <div className="text-sm text-gray-600 text-center mt-2">
        🔴 Kırmızı noktalar anomalileri, 🟢 yeşil noktalar normal değerleri
        temsil eder.
      </div>
    </div>
  );
}
