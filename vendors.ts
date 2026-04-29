"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, Navigation, Layers } from "lucide-react";
import type { Truck } from "@/data/vendors";
import { LivePill } from "@/components/ui/LivePill";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MapClient = dynamic(
  () => import("./MapClient").then((m) => ({ default: m.MapClient })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-pork-dark flex flex-col items-center justify-center gap-3">
        <span className="text-4xl animate-bounce">🐷</span>
        <p className="text-white/40 text-sm font-medium">Caricamento mappa...</p>
      </div>
    ),
  }
);

interface RealMapProps {
  trucks: Truck[];
  selectedTruck: Truck | null;
  onSelectTruck: (truck: Truck | null) => void;
}

export function RealMap({ trucks, selectedTruck, onSelectTruck }: RealMapProps) {
  const [mapMode, setMapMode] = useState<"satellite" | "road">("satellite");
  const liveTrucks = trucks.filter((t) => t.isLive);

  return (
    <div className="relative w-full h-full overflow-hidden bg-pork-dark">
      {/* Live counter — top left */}
      <div className="absolute top-4 left-4 z-[1000]">
        <div className="flex items-center gap-2 rounded-2xl bg-black/70 backdrop-blur-xl px-3 py-2 border border-white/10 shadow-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-full w-full bg-red-500" />
          </span>
          <span className="text-[11px] font-bold text-white">
            {liveTrucks.length} camioncini attivi
          </span>
        </div>
      </div>

      {/* Map mode toggle — top right */}
      <div className="absolute top-4 right-4 z-[1000]">
        <div className="flex gap-1 rounded-2xl bg-black/70 backdrop-blur-xl p-1 border border-white/10 shadow-xl">
          <button
            onClick={() => setMapMode("satellite")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all duration-200",
              mapMode === "satellite"
                ? "bg-pork-gold text-white shadow-md shadow-pork-gold/30"
                : "text-white/50 hover:text-white/80"
            )}
          >
            🛰 Satellite
          </button>
          <button
            onClick={() => setMapMode("road")}
            className={cn(
              "px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all duration-200",
              mapMode === "road"
                ? "bg-pork-gold text-white shadow-md shadow-pork-gold/30"
                : "text-white/50 hover:text-white/80"
            )}
          >
            🗺 Mappa
          </button>
        </div>
      </div>

      {/* The actual Leaflet map */}
      <div className="w-full h-full">
        <MapClient
          trucks={trucks}
          selectedTruck={selectedTruck}
          onSelectTruck={onSelectTruck}
          mapMode={mapMode}
        />
      </div>

      {/* Selected truck bottom sheet */}
      <AnimatePresence>
        {selectedTruck && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="absolute bottom-0 left-0 right-0 z-[1000]"
          >
            <div className="mx-3 mb-3 rounded-2xl bg-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Drag handle */}
              <div className="flex justify-center pt-2.5 pb-1">
                <div className="w-9 h-1 rounded-full bg-white/20" />
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                    <img
                      src={selectedTruck.images[0]}
                      alt={selectedTruck.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm text-white leading-tight">{selectedTruck.name}</h3>
                      {selectedTruck.isLive && <LivePill size="sm" />}
                    </div>
                    <p className="text-[10px] text-white/50 mt-0.5">
                      {selectedTruck.zone} · {selectedTruck.schedule.hours}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-amber-400 text-xs font-bold">★ {selectedTruck.rating}</span>
                      <span className="text-white/30 text-[10px]">({selectedTruck.reviewCount} recensioni)</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectTruck(null)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Badge strip */}
                <div className="flex gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-0.5">
                  {selectedTruck.badges.map((b) => (
                    <span
                      key={b}
                      className="flex-shrink-0 text-[9px] font-bold px-2.5 py-1 rounded-full bg-pork-gold/15 text-pork-gold border border-pork-gold/20"
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/vendor/${selectedTruck.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-pork-gold text-white text-xs font-bold shadow-lg shadow-pork-gold/25 active:scale-95 transition-transform"
                  >
                    Scopri →
                  </Link>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedTruck.coordinates.lat},${selectedTruck.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 text-white text-xs font-medium active:scale-95 transition-transform"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    Naviga
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
