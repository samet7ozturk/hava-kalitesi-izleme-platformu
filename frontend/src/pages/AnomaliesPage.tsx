// src/pages/AnomaliesPage.tsx
import { useEffect, useState } from "react";
import { fetchAnomalies } from "../services/api";
import { useAnomalySocket } from "../hooks/useAnomalySocket";

interface Anomaly {
  id: number;
  latitude: number;
  longitude: number;
  parameter: string;
  value: number;
  timestamp: number;
}

export default function AnomaliesPage() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [selectedParameter, setSelectedParameter] = useState("Tümü");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // İlk veri çekme
  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 24 * 60 * 60;
    fetchAnomalies(oneDayAgo, now)
      .then((data) => {
        setAnomalies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Veri alınamadı", err);
        setError("Anomalileri yüklerken bir hata oluştu.");
        setLoading(false);
      });
  }, []);

  // Gerçek zamanlı güncelleme
  useAnomalySocket((newAnomaly: Anomaly) => {
    setAnomalies((prev) => [newAnomaly, ...prev]);
  });

  // Filtre ve liste hazırlığı
  const parameters = Array.from(
    new Set(anomalies.map((a) => a.parameter))
  ).sort();
  const filtered =
    selectedParameter === "Tümü"
      ? anomalies
      : anomalies.filter((a) => a.parameter === selectedParameter);

  if (loading) {
    return <p className="text-center my-8">Yükleniyor...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
        🧪 Anomali Raporu (Son 24 Saat)
      </h1>

      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

      {parameters.length > 0 && (
        <div className="mb-4 flex flex-col sm:flex-row sm:justify-end items-start sm:items-center gap-2">
          <label className="font-medium">Filtre:</label>
          <select
            value={selectedParameter}
            onChange={(e) => setSelectedParameter(e.target.value)}
            className="border rounded p-1 text-sm sm:text-base"
          >
            <option value="Tümü">Tümü</option>
            {parameters.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Hiç anomali bulunamadı.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border rounded shadow-sm whitespace-nowrap">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border text-left">📌 Parametre</th>
                <th className="p-2 border text-right">📏 Değer</th>
                <th className="p-2 border text-center">📍 Konum</th>
                <th className="p-2 border text-left">🕒 Zaman</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border">{a.parameter}</td>
                  <td className="p-2 border text-right">{a.value}</td>
                  <td className="p-2 border text-center">
                    {a.latitude.toFixed(4)}, {a.longitude.toFixed(4)}
                  </td>
                  <td className="p-2 border">
                    {new Date(a.timestamp * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
