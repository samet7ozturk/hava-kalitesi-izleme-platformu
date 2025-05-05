import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import AnomaliesPage from "./pages/AnomaliesPage";
import LiveMapPage from "./pages/LiveMapPage";
import ChartPage from "./pages/ChartPage";
import LocationSearchPage from "./pages/LocationSearchPage";
import HeatmapPage from "./pages/HeatMapPage";

export default function App() {
  return (
    <Router>
      {/* Navbar */}
      <header className="bg-white shadow-md mb-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:justify-center sm:space-x-6 p-4">
          {[
            { to: "/", label: "Anomaliler" },
            { to: "/map", label: "Harita" },
            { to: "/chart", label: "Grafik" },
            { to: "/search", label: "Konum Ara" },
            { to: "/heatmap", label: "Isı Haritası" },
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-base sm:text-lg ${
                  isActive
                    ? "text-blue-600 font-semibold underline decoration-2 underline-offset-4"
                    : "text-gray-600 hover:text-blue-500"
                } py-2`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </header>

      {/* Sayfalar */}
      <main className="max-w-4xl mx-auto px-4 sm:px-0">
        <Routes>
          <Route path="/" element={<AnomaliesPage />} />
          <Route path="/map" element={<LiveMapPage />} />
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/search" element={<LocationSearchPage />} />
          <Route path="/heatmap" element={<HeatmapPage />} />
        </Routes>
      </main>
    </Router>
  );
}
