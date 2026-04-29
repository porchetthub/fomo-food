"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, X } from "lucide-react";

interface LiveBubble {
  id: string;
  author: string;
  avatar: string;
  text: string;
  truckName: string;
  isDiscovery: boolean;
}

const LIVE_POOL: Omit<LiveBubble, "id">[] = [
  { author: "Marco R.", avatar: "M", text: "🐷 Appena preso l'ultimo panino! Crosta ancora calda!", truckName: "Porchetta Campli Centro", isDiscovery: false },
  { author: "Giulia B.", avatar: "G", text: "🚨 SCOPERTO! Camioncino in piazza del Duomo adesso!", truckName: "Porchetta On The Road", isDiscovery: true },
  { author: "Luca D.", avatar: "L", text: "Fila di 15 persone ma ne vale ogni secondo 🔥", truckName: "Porchetta di Colledara", isDiscovery: false },
  { author: "Sara T.", avatar: "S", text: "🚨 Trovato in via Roma! Ancora 6 panini disponibili!", truckName: "Porchetta Luco dei Marsi", isDiscovery: true },
  { author: "Paolo V.", avatar: "P", text: "Il panino della nonna è una cosa seria 😍😍", truckName: "Porchetta Teramana", isDiscovery: false },
  { author: "Anna P.", avatar: "A", text: "🚨 LIVE in piazza Garibaldi! Venite subito!", truckName: "Porchetta Campli Centro", isDiscovery: true },
  { author: "Roberto S.", avatar: "R", text: "La crosta croccante è al livello massimo oggi 🤌", truckName: "Porchetta On The Road", isDiscovery: false },
  { author: "Nico B.", avatar: "N", text: "🚨 Camioncino appena arrivato in via XX Settembre!", truckName: "Porchetta di Colledara", isDiscovery: true },
];

export function LiveComments() {
  const [bubbles, setBubbles] = useState<LiveBubble[]>([]);
  const [poolIndex, setPoolIndex] = useState(0);

  const addBubble = useCallback(() => {
    const src = LIVE_POOL[poolIndex % LIVE_POOL.length];
    const bubble: LiveBubble = { ...src, id: `${Date.now()}-${poolIndex}` };
    setBubbles((prev) => [bubble, ...prev].slice(0, 3));
    setPoolIndex((i) => i + 1);
  }, [poolIndex]);

  useEffect(() => {
    // First bubble after 2s
    const first = setTimeout(addBubble, 2000);
    return () => clearTimeout(first);
  }, []);

  useEffect(() => {
    const interval = setInterval(addBubble, 5000);
    return () => clearInterval(interval);
  }, [addBubble]);

  const dismiss = (id: string) => {
    setBubbles((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="fixed top-16 right-3 z-40 flex flex-col gap-2 pointer-events-none" style={{ maxWidth: "230px" }}>
      <AnimatePresence>
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 0, x: 60, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.85 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="pointer-events-auto"
          >
            <div
              className={`relative rounded-2xl shadow-2xl overflow-hidden border ${
                bubble.isDiscovery
                  ? "bg-gradient-to-br from-red-950/95 to-orange-950/95 border-red-500/30"
                  : "bg-black/80 border-white/10"
              } backdrop-blur-xl`}
            >
              {/* Discovery ribbon */}
              {bubble.isDiscovery && (
                <div className="flex items-center gap-1 px-3 pt-2.5 pb-0">
                  <Flame className="w-3 h-3 text-red-400" />
                  <span className="text-[9px] font-bold text-red-400 tracking-wider">SCOPERTA LIVE</span>
                </div>
              )}
              <div className="flex items-start gap-2 p-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 text-white ${
                    bubble.isDiscovery
                      ? "bg-gradient-to-br from-red-500 to-orange-500"
                      : "bg-gradient-to-br from-pork-gold to-pork-amber"
                  }`}
                >
                  {bubble.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-white/90">{bubble.author}</p>
                  <p className="text-[11px] text-white/70 mt-0.5 leading-snug break-words">{bubble.text}</p>
                  <p className="text-[9px] text-white/30 mt-1 truncate">{bubble.truckName}</p>
                </div>
                <button
                  onClick={() => dismiss(bubble.id)}
                  className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5"
                >
                  <X className="w-2.5 h-2.5 text-white/50" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
