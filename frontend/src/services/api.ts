import axios from "axios";

// 1. yönteme göre: sabit "/api" kökünü kullanıyoruz
const API_BASE = process.env.REACT_APP_API_URL || "/api";

export const fetchAnomalies = async (from: number, to: number) => {
  const response = await axios.get(`${API_BASE}/anomalies`, {
    params: {
      from: Math.floor(from), // saniye cinsinden
      to: Math.floor(to),
    },
  });
  return response.data;
};

export const fetchAirQuality = async (lat: number, lng: number) => {
  const response = await axios.get(`${API_BASE}/air-quality`, {
    params: { lat, lng },
  });
  return response.data;
};

export const fetchHeatmapData = async (
  lat: number,
  lng: number,
  radius: number = 25
) => {
  const response = await axios.get(`${API_BASE}/heatmap`, {
    params: { lat, lng, radius },
  });
  return response.data;
};
