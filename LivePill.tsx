"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, ChevronRight, Check, MapPin, Clock, Award } from "lucide-react";
import { useAppStore } from "@/data/store";
import { cn } from "@/lib/utils";

interface AddTruckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ZONES = ["Teramo (TE)", "Campli (TE)", "L'Aquila (AQ)", "Pescara (PE)", "Chieti (CH)", "Colledara (TE)", "Luco dei Marsi (AQ)", "Altro"];

export function AddTruckModal({ isOpen, onClose }: AddTruckModalProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    zone: "",
    days: "",
    hours: "",
    instagram: "",
    description: "",
    photoConfirmed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const { addTruck } = useAppStore();

  const handleSubmit = () => {
    if (!form.name || !form.zone) return;
    addTruck({
      name: form.name,
      tagline: form.description || "Nuovo camioncino segnalato dalla community",
      description:
        form.description ||
        "Segnalato dalla community di Porchetta On The Road. In attesa di verifica.",
      coordinates: {
        lat: 42.35 + (Math.random() - 0.5) * 0.6,
        lng: 13.55 + (Math.random() - 0.5) * 0.6,
      },
      zone: form.zone,
      schedule: {
        days: form.days || "Da confermare",
        hours: form.hours || "Da confermare",
      },
      images: [
        "https://www.socialcicero.com/wp-content/uploads/2020/10/Campli-panino-con-la-porchetta.jpg",
      ],
      menu: [],
      isLive: true,
      social: { instagram: form.instagram },
      story: ["Segnalato dalla community di Porchetta On The Road."],
      badges: ["Nuova Scoperta"],
      discoveredBy: "Tu",
      discoveredAt: new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long" }),
    });
    setSubmitted(true);
  };

  const reset = () => {
    setStep(1);
    setForm({ name: "", zone: "", days: "", hours: "", instagram: "", description: "", photoConfirmed: false });
    setSubmitted(false);
    onClose();
  };

  const canGoStep2 = form.name.trim().length > 2 && form.zone !== "";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={reset}
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-pork-dark border-t border-x border-white/10 overflow-hidden max-h-[92vh] flex flex-col"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-white/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
              <div>
                <h2 className="text-white font-bold text-xl">
                  {submitted ? "Grazie! 🏅" : "Segnala Camioncino"}
                </h2>
                {!submitted && (
                  <p className="text-white/40 text-xs mt-0.5">
                    Step {step} di 3 — {step === 1 ? "Info base" : step === 2 ? "Foto e dettagli" : "Conferma"}
                  </p>
                )}
              </div>
              <button
                onClick={reset}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Progress */}
            {!submitted && (
              <div className="px-5 mb-1 flex-shrink-0">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-pork-gold to-pork-amber rounded-full"
                    animate={{ width: `${(step / 3) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                <div className="flex justify-between mt-1.5">
                  {["Info", "Foto", "Conferma"].map((label, i) => (
                    <span
                      key={label}
                      className={cn(
                        "text-[9px] font-bold transition-colors",
                        step > i ? "text-pork-gold" : "text-white/20"
                      )}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-5 py-4 pb-8">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-6 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-gradient-to-br from-pork-gold to-pork-amber flex items-center justify-center mb-5 shadow-xl shadow-pork-gold/30"
                      >
                        <Check className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-white font-bold text-xl">Segnalazione inviata!</h3>
                      <p className="text-white/50 text-sm mt-2 leading-relaxed max-w-xs">
                        Il camioncino sarà verificato dalla community.
                      </p>
                      <div className="mt-5 rounded-2xl bg-pork-gold/10 border border-pork-gold/20 p-4 w-full text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-5 h-5 text-pork-gold" />
                          <span className="text-pork-gold font-bold text-sm">Badge sbloccato!</span>
                        </div>
                        <p className="text-white font-bold">🏅 Nuova Scoperta</p>
                        <p className="text-white/50 text-xs mt-1">
                          Hai aggiunto un nuovo camioncino alla mappa dell'Abruzzo
                        </p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={reset}
                        className="mt-6 px-8 py-3.5 rounded-xl bg-pork-gold text-white font-bold text-sm shadow-lg shadow-pork-gold/30"
                      >
                        Perfetto, chiudi
                      </motion.button>
                    </motion.div>
                  ) : step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="space-y-3"
                    >
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">
                        Nome e posizione
                      </p>
                      <input
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Nome del camioncino *"
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-pork-gold/40 focus:bg-white/10 transition-colors"
                      />
                      {/* Zone picker */}
                      <div className="space-y-1.5">
                        <p className="text-white/30 text-[10px] pl-1">Zona *</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {ZONES.map((z) => (
                            <button
                              key={z}
                              onClick={() => setForm((f) => ({ ...f, zone: z }))}
                              className={cn(
                                "py-2.5 px-3 rounded-xl text-[11px] font-medium text-left transition-all",
                                form.zone === z
                                  ? "bg-pork-gold text-white shadow-md shadow-pork-gold/25"
                                  : "bg-white/8 border border-white/10 text-white/50"
                              )}
                            >
                              {z}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                          <input
                            value={form.days}
                            onChange={(e) => setForm((f) => ({ ...f, days: e.target.value }))}
                            placeholder="Giorni apertura"
                            className="w-full bg-white/8 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-[12px] text-white placeholder:text-white/25 outline-none focus:border-pork-gold/40 transition-colors"
                          />
                        </div>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
                          <input
                            value={form.hours}
                            onChange={(e) => setForm((f) => ({ ...f, hours: e.target.value }))}
                            placeholder="Orari (10:00–14:00)"
                            className="w-full bg-white/8 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-[12px] text-white placeholder:text-white/25 outline-none focus:border-pork-gold/40 transition-colors"
                          />
                        </div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => canGoStep2 && setStep(2)}
                        className={cn(
                          "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all mt-2",
                          canGoStep2
                            ? "bg-pork-gold text-white shadow-lg shadow-pork-gold/30"
                            : "bg-white/8 text-white/25 border border-white/10"
                        )}
                      >
                        Continua
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ) : step === 2 ? (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="space-y-3"
                    >
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">
                        Foto e dettagli
                      </p>
                      {/* Photo area */}
                      <button
                        onClick={() => setForm((f) => ({ ...f, photoConfirmed: !f.photoConfirmed }))}
                        className={cn(
                          "w-full border-2 border-dashed rounded-2xl p-8 text-center transition-all",
                          form.photoConfirmed
                            ? "border-green-500/50 bg-green-500/10"
                            : "border-white/15 bg-white/5"
                        )}
                      >
                        {form.photoConfirmed ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                              <Check className="w-6 h-6 text-green-400" />
                            </div>
                            <p className="text-green-400 font-bold text-sm">Foto confermata!</p>
                            <p className="text-green-400/60 text-[11px]">Upload disponibile nella versione finale</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <Camera className="w-10 h-10 text-white/20" />
                            <p className="text-white/50 text-sm font-medium">Aggiungi foto</p>
                            <p className="text-white/25 text-[11px]">Tocca per confermare di avere una foto</p>
                          </div>
                        )}
                      </button>
                      <textarea
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                        placeholder="Descrivi il camioncino... (specialità, storia, dove si trova)"
                        rows={3}
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-pork-gold/40 transition-colors resize-none"
                      />
                      <input
                        value={form.instagram}
                        onChange={(e) => setForm((f) => ({ ...f, instagram: e.target.value }))}
                        placeholder="Instagram del camioncino (opzionale)"
                        className="w-full bg-white/8 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-pork-gold/40 transition-colors"
                      />
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setStep(1)}
                          className="flex-1 py-4 rounded-xl bg-white/8 border border-white/10 text-white/50 font-bold text-sm"
                        >
                          ← Indietro
                        </button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setStep(3)}
                          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-pork-gold text-white font-bold text-sm shadow-lg shadow-pork-gold/30"
                        >
                          Continua
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="space-y-4"
                    >
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4">
                        Riepilogo e invio
                      </p>
                      <div className="rounded-2xl bg-white/5 border border-white/10 divide-y divide-white/5 overflow-hidden">
                        {[
                          { label: "Nome", value: form.name },
                          { label: "Zona", value: form.zone },
                          form.days && { label: "Giorni", value: form.days },
                          form.hours && { label: "Orari", value: form.hours },
                          form.instagram && { label: "Instagram", value: form.instagram },
                        ]
                          .filter(Boolean)
                          .map((row: any) => (
                            <div key={row.label} className="flex items-center justify-between px-4 py-3">
                              <span className="text-white/40 text-xs">{row.label}</span>
                              <span className="text-white text-xs font-bold">{row.value}</span>
                            </div>
                          ))}
                      </div>
                      <div className="rounded-2xl bg-gradient-to-r from-pork-gold/15 to-pork-amber/10 border border-pork-gold/25 p-4">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">🏅</span>
                          <div>
                            <p className="text-pork-gold font-bold text-sm">Badge: Nuova Scoperta</p>
                            <p className="text-white/50 text-[11px] mt-0.5">
                              Aggiungere un camioncino ti fa guadagnare il badge "Nuova Scoperta" sulla tua pirofila
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-white/30 text-[10px] text-center">
                        Il camioncino sarà visibile dopo verifica della community
                      </p>
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setStep(2)}
                          className="flex-1 py-4 rounded-xl bg-white/8 border border-white/10 text-white/50 font-bold text-sm"
                        >
                          ← Indietro
                        </button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={handleSubmit}
                          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-pork-gold text-white font-bold text-sm shadow-lg shadow-pork-gold/30"
                        >
                          <Check className="w-4 h-4" />
                          Invia segnalazione
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
