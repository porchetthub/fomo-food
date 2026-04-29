"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Truck } from "@/data/vendors";

// Fix Leaflet icon paths in Next.js
function FixLeafletIcons() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });
  }, []);
  return null;
}

const createPigIcon = (isLive: boolean) => {
  const pingStyle = isLive
    ? `<span style="position:absolute;inset:-8px;border-radius:50%;background:rgba(239,68,68,0.35);animation:pork-ping 1.4s cubic-bezier(0,0,0.2,1) infinite;"></span>`
    : "";
  const bgColor = isLive ? "linear-gradient(135deg,#ef4444,#f97316)" : "linear-gradient(135deg,#8B4513,#5a2d0c)";
  const shadow = isLive ? "0 4px 20px rgba(239,68,68,0.5)" : "0 4px 12px rgba(0,0,0,0.4)";
  const html = `
    <style>@keyframes pork-ping{0%{transform:scale(1);opacity:.8}75%,100%{transform:scale(2.2);opacity:0}}</style>
    <div style="position:relative;width:48px;height:48px;display:flex;align-items:center;justify-content:center;">
      ${pingStyle}
      <div style="position:relative;width:44px;height:44px;border-radius:50%;background:${bgColor};display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:${shadow};border:2.5px solid rgba(255,255,255,0.35);">
        🐷
      </div>
    </div>
  `;
  return L.divIcon({
    className: "",
    html,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -52],
  });
};

// Component to update tile layer when mode changes
function TileLayerSwitcher({ mode }: { mode: "satellite" | "road" }) {
  const map = useMap();
  useEffect(() => {
    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });
    // Add new one
    if (mode === "satellite") {
      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        { attribution: "Tiles © Esri" }
      ).addTo(map);
    } else {
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        { attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }
      ).addTo(map);
    }
  }, [mode, map]);
  return null;
}

export interface MapClientProps {
  trucks: Truck[];
  selectedTruck: Truck | null;
  onSelectTruck: (truck: Truck | null) => void;
  mapMode: "satellite" | "road";
}

export function MapClient({ trucks, selectedTruck, onSelectTruck, mapMode }: MapClientProps) {
  const center: [number, number] = [42.35, 13.55];

  return (
    <MapContainer
      center={center}
      zoom={9}
      style={{ width: "100%", height: "100%", background: "#1a1a1a" }}
      zoomControl={false}
      attributionControl={false}
    >
      <FixLeafletIcons />
      <TileLayerSwitcher mode={mapMode} />

      {/* Initial tile layer (will be replaced by TileLayerSwitcher) */}
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles © Esri"
      />

      {trucks.map((truck) => (
        <Marker
          key={truck.id}
          position={[truck.coordinates.lat, truck.coordinates.lng]}
          icon={createPigIcon(truck.isLive)}
          eventHandlers={{
            click: () => onSelectTruck(selectedTruck?.id === truck.id ? null : truck),
          }}
        >
          <Popup
            className="pork-popup"
            closeButton={false}
          >
            <div
              style={{
                fontFamily: "system-ui, sans-serif",
                background: "rgba(28,18,8,0.97)",
                borderRadius: "14px",
                padding: "12px",
                minWidth: "160px",
                border: "1px solid rgba(212,160,23,0.25)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <p style={{ fontWeight: 700, fontSize: "13px", margin: "0 0 2px", color: "#fff" }}>
                {truck.name}
              </p>
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", margin: "0 0 8px" }}>
                {truck.zone} · {truck.schedule.hours}
              </p>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 700 }}>
                  ★ {truck.rating}
                </span>
                {truck.isLive && (
                  <span
                    style={{
                      background: "#ef4444",
                      color: "white",
                      borderRadius: "99px",
                      padding: "2px 8px",
                      fontSize: "9px",
                      fontWeight: 700,
                      letterSpacing: "0.05em",
                    }}
                  >
                    LIVE
                  </span>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
