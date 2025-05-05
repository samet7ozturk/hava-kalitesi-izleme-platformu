import { useState } from "react";
import axios from "axios";
import { fetchAirQuality } from "../services/api";

interface Reading {
  id: number;
  latitude: number;
  longitude: number;
  parameter: string;
  value: number;
  timestamp: number;
  anomalous: boolean;
}

export default function LocationSearchPage() {
  const [latInput, setLatInput] = useState("40.9");
  const [lngInput, setLngInput] = useState("29.3");
  const [reading, setReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const normalize = (s: string) => s.replace(",", "."); // Türkçe ondalık için
  const parse = (s: string) => {
    const n = parseFloat(normalize(s));
    return isNaN(n) ? null : n;
  };

  const handleSearch = async () => {
    setError(null);
    setReading(null);

    const lat = parse(latInput);
    const lng = parse(lngInput);
    if (lat === null || lng === null) {
      setError("Lütfen geçerli ondalık sayı girin (örn. 40.9 veya 40,9).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetchAirQuality(lat, lng);
      setReading(res);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setError("Bu konum için hiç veri bulunamadı.");
      } else {
        setError("Veri alınırken bir hata oluştu.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">📍 Konum Ara</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Enlem (latitude)</label>
          <input
            type="text"
            value={latInput}
            onChange={(e) => setLatInput(e.target.value)}
            placeholder="örn. 40.9 veya 40,9"
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Boylam (longitude)
          </label>
          <input
            type="text"
            value={lngInput}
            onChange={(e) => setLngInput(e.target.value)}
            placeholder="örn. 29.3 veya 29,2"
            className="mt-1 block w-full border rounded px-2 py-1"
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Aranıyor..." : "Konumu Getir"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {reading && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">En Son Okuma</h2>
          <p>
            <strong>Parametre:</strong> {reading.parameter}
          </p>
          <p>
            <strong>Değer:</strong> {reading.value}
          </p>
          <p>
            <strong>Zaman:</strong>{" "}
            {new Date(reading.timestamp * 1000).toLocaleString("tr-TR")}
          </p>
          <p>
            <strong>Anomali:</strong> {reading.anomalous ? "Evet" : "Hayır"}
          </p>
        </div>
      )}
    </div>
  );
}
