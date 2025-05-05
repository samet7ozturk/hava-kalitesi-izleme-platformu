import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchHeatmapData } from "../services/api";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

interface Reading {
  id: number;
  latitude: number;
  longitude: number;
  parameter: string;
  value: number;
  timestamp: number;
  anomalous: boolean;
}

export default function ChartPage() {
  const [data, setData] = useState<Reading[]>([]);
  const [targetParameter, setTargetParameter] = useState("PM2.5");
  const center = { lat: 40.9, lng: 29.3 };
  const radius = 100;

  useEffect(() => {
    fetchHeatmapData(center.lat, center.lng, radius)
      .then((res: Reading[]) => {
        const filtered = res
          .filter((r) => r.parameter === targetParameter)
          .sort((a, b) => a.timestamp - b.timestamp);
        setData(filtered);
      })
      .catch((err) => console.error("Grafik verisi alınamadı", err));
  }, [targetParameter, center.lat, center.lng, radius]);

  const average =
    data.length > 0
      ? (data.reduce((sum, r) => sum + r.value, 0) / data.length).toFixed(2)
      : "—";

  const chartData = {
    labels: data.map((r) =>
      new Date(r.timestamp * 1000).toLocaleString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    ),
    datasets: [
      {
        label: `${targetParameter} (Normal)`,
        data: data.map((r) => (r.anomalous ? null : r.value)),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
        fill: false,
        spanGaps: true,
      },
      {
        label: `${targetParameter} (Anomalous)`,
        data: data.map((r) => (r.anomalous ? r.value : null)),
        borderColor: "rgb(255, 99, 132)",
        borderDash: [5, 5],
        pointBackgroundColor: "red",
        tension: 0.4,
        fill: false,
        spanGaps: true,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Başlık + Kontroller */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            📈 Zaman Serisi Grafiği
          </h2>
          <div>
            <label className="block text-sm font-medium mb-1">Parametre</label>
            <select
              className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring"
              value={targetParameter}
              onChange={(e) => setTargetParameter(e.target.value)}
            >
              <option>PM2.5</option>
              <option>PM10</option>
              <option>CO2</option>
              <option>NO2</option>
              <option>O3</option>
            </select>
          </div>
        </div>

        {/* Grafik */}
        <div className="p-4">
          <div className="h-[250px] sm:h-[350px] md:h-[450px]">
            {data.length === 0 ? (
              <p className="text-center text-gray-500">
                Gösterilecek veri yok.
              </p>
            ) : (
              <Line data={chartData} />
            )}
          </div>
        </div>

        {/* Özet Bilgiler */}
        <div className="px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 flex flex-col sm:flex-row sm:justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span>✏️</span>
            <span className="font-medium">Ortalama Değer:</span>
            <span>{average}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📊</span>
            <span className="font-medium">Toplam Veri:</span>
            <span>{data.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
