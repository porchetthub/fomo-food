@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 35 40% 96%;
    --foreground: 30 30% 8%;
    --card: 35 30% 98%;
    --card-foreground: 30 30% 8%;
    --popover: 35 30% 98%;
    --popover-foreground: 30 30% 8%;
    --primary: 35 80% 45%;
    --primary-foreground: 0 0% 100%;
    --secondary: 35 20% 92%;
    --secondary-foreground: 30 30% 8%;
    --muted: 35 15% 94%;
    --muted-foreground: 30 10% 40%;
    --accent: 42 90% 48%;
    --accent-foreground: 30 30% 8%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 35 15% 88%;
    --input: 35 15% 88%;
    --ring: 35 80% 45%;
    --radius: 1rem;
  }
  .dark {
    --background: 30 20% 5%;
    --foreground: 35 20% 96%;
    --card: 30 15% 8%;
    --card-foreground: 35 20% 96%;
    --popover: 30 15% 8%;
    --popover-foreground: 35 20% 96%;
    --primary: 35 80% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 30 10% 15%;
    --secondary-foreground: 35 20% 96%;
    --muted: 30 10% 15%;
    --muted-foreground: 30 10% 55%;
    --accent: 42 90% 48%;
    --accent-foreground: 35 20% 96%;
    --destructive: 0 62% 50%;
    --destructive-foreground: 0 0% 100%;
    --border: 30 10% 18%;
    --input: 30 10% 18%;
    --ring: 35 80% 50%;
  }
}

@layer base {
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground antialiased;
    font-feature-settings: "rlig" 1, "calt" 1;
    overscroll-behavior-y: none;
    -webkit-font-smoothing: antialiased;
  }
  html {
    scroll-behavior: smooth;
    -webkit-tap-highlight-color: transparent;
  }
}

@layer utilities {
  .glass { @apply bg-white/50 backdrop-blur-2xl backdrop-saturate-150 border border-white/20; }
  .glass-dark { @apply bg-black/30 backdrop-blur-2xl backdrop-saturate-150 border border-white/10; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .perspective-1000 { perspective: 1000px; }
}

::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { @apply bg-transparent; }
::-webkit-scrollbar-thumb { @apply bg-muted-foreground/20 rounded-full; }

/* ── Leaflet overrides ── */
.leaflet-container {
  background: #1a1a1a;
  font-family: inherit;
}
/* Remove default popup white box */
.leaflet-popup-content-wrapper {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  border-radius: 14px !important;
  overflow: hidden;
}
.leaflet-popup-content {
  margin: 0 !important;
  line-height: 1 !important;
}
.leaflet-popup-tip-container { display: none !important; }
.leaflet-popup-close-button { display: none !important; }
/* Attribution — subtle */
.leaflet-control-attribution {
  background: rgba(0,0,0,0.4) !important;
  color: rgba(255,255,255,0.3) !important;
  font-size: 8px !important;
  padding: 2px 6px !important;
  border-radius: 6px !important;
}
.leaflet-control-attribution a { color: rgba(255,255,255,0.4) !important; }
/* Zoom controls */
.leaflet-control-zoom {
  border: 1px solid rgba(255,255,255,0.1) !important;
  border-radius: 12px !important;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important;
}
.leaflet-control-zoom a {
  background: rgba(0,0,0,0.7) !important;
  color: white !important;
  border-bottom: 1px solid rgba(255,255,255,0.1) !important;
  width: 34px !important;
  height: 34px !important;
  line-height: 34px !important;
  font-size: 18px !important;
}
.leaflet-control-zoom a:hover { background: rgba(212,160,23,0.3) !important; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* System font stack */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
