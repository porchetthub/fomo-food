"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck } from "@/data/vendors";
import { formatPrice } from "@/lib/utils";
import { Plus, Minus, ShoppingBag } from "lucide-react";

interface Menu3DProps {
  truck: Truck;
}

function MenuItemCard({ item, index, cart, addToCart, removeFromCart }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -12]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotateX, opacity, scale }}
      className="perspective-1000"
    >
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-pork-crust/90 to-pork-road/90 border border-pork-gold/20 shadow-lg">
        <div className="flex items-center gap-4 p-4">
          <motion.div
            className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-xl"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-white">{item.name}</h4>
            <p className="text-[11px] text-white/50 mt-0.5 line-clamp-2">{item.description}</p>
            <p className="text-lg font-bold text-pork-gold mt-2">{formatPrice(item.price)}</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            {cart[item.id] ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white active:bg-white/20"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold text-white w-5 text-center">{cart[item.id]}</span>
              </div>
            ) : null}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => addToCart(item.id)}
              className="w-10 h-10 rounded-full bg-pork-gold flex items-center justify-center text-white shadow-lg shadow-pork-gold/30"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Menu3D({ truck }: Menu3DProps) {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (itemId: string) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const next = { ...prev };
      if (next[itemId] > 1) next[itemId]--;
      else delete next[itemId];
      return next;
    });
  };

  const cartTotal = Object.entries(cart).reduce((sum, [itemId, qty]) => {
    const item = truck.menu.find((m) => m.id === itemId);
    return sum + (item?.price || 0) * qty;
  }, 0);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-5">
      <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4">I Nostri Panini</h3>

      {truck.menu.map((item, i) => (
        <MenuItemCard
          key={item.id}
          item={item}
          index={i}
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}

      {/* Sticky cart bar */}
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-black/95 backdrop-blur-2xl border-t border-pork-gold/20"
        >
          <div className="max-w-md mx-auto flex items-center justify-between">
            <div>
              <p className="text-[10px] text-white/50">{cartCount} panini</p>
              <p className="text-xl font-bold text-pork-gold">{formatPrice(cartTotal)}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-pork-gold text-white font-bold text-sm shadow-lg shadow-pork-gold/30"
            >
              <ShoppingBag className="w-4 h-4" />
              Prenota
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
