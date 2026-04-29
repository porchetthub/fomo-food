export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  isDiscovery?: boolean;
}

export interface Truck {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  coordinates: { lat: number; lng: number };
  zone: string;
  schedule: { days: string; hours: string };
  images: string[];
  menu: MenuItem[];
  rating: number;
  reviewCount: number;
  isLive: boolean;
  social: { instagram?: string };
  story: string[];
  comments: Comment[];
  badges: string[];
  discoveredBy?: string;
  discoveredAt?: string;
}

export const trucks: Truck[] = [
  {
    id: "t1",
    slug: "porchetta-campli-centro",
    name: "Porchetta Campli Centro",
    tagline: "La regina della Sagra dal 1964",
    description:
      "Porchetta di Campli cotta a legna per 8 ore. Crosta croccante, carne succosa, aromi di rosmarino e mandorle. Il sapore autentico della tradizione abruzzese.",
    coordinates: { lat: 42.7275, lng: 13.6875 },
    zone: "Campli (TE)",
    schedule: { days: "Mar – Dom", hours: "10:00 – 20:00" },
    images: [
      "https://www.abruzzoturismo.it/sites/default/files/immagini/porchetta%20italica%20campli.jpg",
      "https://www.valledelgransasso.it/templates/yootheme/cache/f8/porchetta-di-colledara-tipici-gran-sasso-ditalia-abruzzo_4-f8e08d9f.jpeg",
      "https://www.socialcicero.com/wp-content/uploads/2020/10/Campli-panino-con-la-porchetta.jpg",
    ],
    menu: [
      { id: "m1", name: "Panino Classico", description: "Porchetta, sale, pepe, pane croccante di Campli", price: 550, image: "https://www.socialcicero.com/wp-content/uploads/2020/10/Campli-panino-con-la-porchetta.jpg" },
      { id: "m2", name: "Panino Crosta", description: "Solo la crosta croccante, il pezzo più pregiato", price: 650, image: "https://www.abruzzoturismo.it/sites/default/files/immagini/porchetta%20italica%20campli.jpg" },
      { id: "m3", name: "Porchetta ½ kg", description: "Da asporto, avvolta in carta oleata", price: 1600, image: "https://www.valledelgransasso.it/templates/yootheme/cache/f8/porchetta-di-colledara-tipici-gran-sasso-ditalia-abruzzo_4-f8e08d9f.jpeg" },
      { id: "m4", name: "Porchetta 1 kg", description: "Perfetta per 4 persone, cotta il mattino", price: 3000, image: "https://www.abruzzoturismo.it/sites/default/files/immagini/porchetta%20italica%20campli.jpg" },
    ],
    rating: 4.9,
    reviewCount: 342,
    isLive: true,
    social: { instagram: "@porchettacampli" },
    story: [
      "Nata nel 1964, anno della prima Sagra della Porchetta Italica.",
      "La ricetta segreta passa di padre in figlio da tre generazioni.",
      "Cottura esclusiva a legna di quercia per otto ore intere.",
      "Mandorle tostate: l'ingrediente segreto della porchetta Teramana.",
    ],
    comments: [
      { id: "c1", author: "Marco R.", avatar: "M", text: "Appena passato, c\'è ancora crosta! 🐷🔥", timestamp: "2 min fa", likes: 12, isDiscovery: false },
      { id: "c2", author: "Giulia B.", avatar: "G", text: "Il panino più buono dell\'Abruzzo, punto.", timestamp: "15 min fa", likes: 8, isDiscovery: false },
      { id: "c3", author: "Luca D.", avatar: "L", text: "🚨 SCOPERTO! Camioncino in piazza del Duomo ora!", timestamp: "28 min fa", likes: 24, isDiscovery: true },
    ],
    badges: ["Sagra 2025", "Crosta d\'Oro", "3 Generazioni"],
    discoveredBy: "Luca D.",
    discoveredAt: "Oggi, 11:30",
  },
  {
    id: "t2",
    slug: "porchetta-on-the-road",
    name: "Porchetta On The Road",
    tagline: "Il gusto di Campli dove vuoi tu",
    description:
      "Camioncino itinerante che porta la porchetta di Campli nelle piazze dell\'Abruzzo. Ogni giorno una location diversa, sempre la stessa qualità.",
    coordinates: { lat: 42.3498, lng: 13.3995 },
    zone: "L\'Aquila (AQ)",
    schedule: { days: "Gio – Dom", hours: "11:00 – 15:00" },
    images: [
      "https://www.streetfood42.com/cibodistrada/wp-content/uploads/2015/01/205-antica-porchetta-campli-panino-porchetta-514x276.jpg",
      "https://substackcdn.com/image/fetch/$s_!rmlO!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ff161ffc7-99ee-44c9-ba1e-ac78ab99eab2_900x1350.jpeg",
      "https://www.virtuquotidiane.it/wp-content/uploads/2022/03/salvatore-di-angelo.jpg",
    ],
    menu: [
      { id: "m5", name: "Panino del Viandante", description: "Porchetta, cipolle caramellate, pane integrale", price: 600, image: "https://www.streetfood42.com/cibodistrada/wp-content/uploads/2015/01/205-antica-porchetta-campli-panino-porchetta-514x276.jpg" },
      { id: "m6", name: "Panino Piccante", description: "Porchetta, peperoncino locale, olio EVO", price: 600, image: "https://substackcdn.com/image/fetch/$s_!rmlO!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ff161ffc7-99ee-44c9-ba1e-ac78ab99eab2_900x1350.jpeg" },
      { id: "m7", name: "Porchetta al Kg", description: "Taglio fresco, ancora calda", price: 2800, image: "https://www.virtuquotidiane.it/wp-content/uploads/2022/03/salvatore-di-angelo.jpg" },
    ],
    rating: 4.7,
    reviewCount: 189,
    isLive: true,
    social: { instagram: "@porchettaontheroad" },
    story: [
      "Partito come furgoncino ambulante nel 2018.",
      "Percorre ogni settimana le strade dell\'Abruzzo interno.",
      "La posizione cambia ogni giorno: segui le storie Instagram!",
      "Vincitore del premio \'Miglior Porchetta Itinerante\' 2024.",
    ],
    comments: [
      { id: "c4", author: "Anna P.", avatar: "A", text: "Oggi in piazza Duomo a L\'Aquila, fila lunga ma ne vale la pena!", timestamp: "5 min fa", likes: 6, isDiscovery: false },
      { id: "c5", author: "Roberto S.", avatar: "R", text: "🚨 Trovato in via XX Settembre! Ancora 5 panini disponibili", timestamp: "42 min fa", likes: 15, isDiscovery: true },
    ],
    badges: ["Itinerante", "Premio 2024", "Fila lunga = buono"],
    discoveredBy: "Roberto S.",
    discoveredAt: "Oggi, 12:15",
  },
  {
    id: "t3",
    slug: "porchetta-teramana",
    name: "Porchetta Teramana",
    tagline: "Le mandorle della tradizione",
    description:
      "L\'unica porchetta con mandorle tostate, segreto della provincia di Teramo. Cottura lenta, crosta dorata, sapore inconfondibile.",
    coordinates: { lat: 42.6612, lng: 13.6985 },
    zone: "Teramo (TE)",
    schedule: { days: "Ven – Dom", hours: "10:00 – 14:00" },
    images: [
      "https://www.abruzzoturismo.it/sites/default/files/immagini/porchetta%20italica%20campli.jpg",
      "https://www.valledelgransasso.it/templates/yootheme/cache/f8/porchetta-di-colledara-tipici-gran-sasso-ditalia-abruzzo_4-f8e08d9f.jpeg",
      "https://www.socialcicero.com/wp-content/uploads/2020/10/Campli-panino-con-la-porchetta.jpg",
    ],
    menu: [
      { id: "m8", name: "Panino Teramano", description: "Porchetta con mandorle, pane di solina", price: 600, image: "https://www.abruzzoturismo.it/sites/default/files/immagini/porchetta%20italica%20campli.jpg" },
      { id: "m9", name: "Panino Rosmarino", description: "Porchetta, rosmarino fresco, olio del territorio", price: 550, image: "https://www.valledelgransasso.it/templates/yootheme/cache/f8/porchetta-di-colledara-tipici-gran-sasso-ditalia-abruzzo_4-f8e08d9f.jpeg" },
      { id: "m10", name: "Porchetta ½ kg", description: "Con foglie di alloro per profumare", price: 1700, image: "https://www.socialcicero.com/wp-content/uploads/2020/10/Campli-panino-con-la-porchetta.jpg" },
    ],
    rating: 4.8,
    reviewCount: 156,
    isLive: false,
    social: { instagram: "@porchettateramana" },
    story: [
      "La porchetta Teramana si distingue per le mandorle tostate nell\'impasto.",
      "Statuti comunali del 1575 regolavano già la vendita della porchetta.",
      "Cottura in forno a legna di quercia per almeno 6 ore.",
      "Il segreto è nel legame manuale con spago di canapa.",
    ],
    comments: [
      { id: "c6", author: "Elena M.", avatar: "E", text: "Le mandorle si sentono, che bontà! 😍", timestamp: "1 ora fa", likes: 9, isDiscovery: false },
    ],
    badges: ["Mandorle", "1575", "Forno a legna"],
    discoveredBy: "Elena M.",
    discoveredAt: "Ieri, 18:00",
  },
  {
    id: "t4",
    slug: "porchetta-colledara",
    name: "Porchetta di Colledara",
    tagline: "Oltre un secolo di maestria",
    description:
      "Porchetta colledarese preparata secondo l\'antica ricetta che si tramanda da generazioni. Cottura negli antichi forni del Gran Sasso.",
    coordinates: { lat: 42.5500, lng: 13.7500 },
    zone: "Colledara (TE)",
    schedule: { days: "Sab – Dom", hours: "09:00 – 13:00" },
    images: [
      "https://www.valledelgransasso.it/templates/yootheme/cache/f8/porchetta-di-colledara-tipici-gran-sasso-ditalia-abruzzo_4-f8e08d9f.jpeg",
      "https://www.abruzzoturismo.it/sites/default/files/immagini/porchetta%20italica%20campli.jpg",
      "https://www.streetfood42.com/cibodistrada/wp-content/uploads/2015/01/205-antica-porchetta-campli-panino-porchetta-514x276.jpg",
    ],
    menu: [
      { id: "m11", name: "Panino della Nonna", description: "Porchetta, finocchietto selvatico, pane casereccio", price: 550, image: "https://www.valledelgransasso.it/templates/yootheme/cache/f8/porchetta-di-colledara-tipici-gran-sasso-ditalia-abruzzo_4-f8e08d9f.jpeg" },
      { id: "m12", name: "Porchetta 1 kg", description: "Taglio intero, perfetta per la domenica", price: 3200, image: "https://www.abruzzoturismo.it/sites/default/files/immagini/porchetta%20italica%20campli.jpg" },
    ],
    rating: 4.9,
    reviewCount: 98,
    isLive: true,
    social: { instagram: "@porchettacolledara" },
    story: [
      "Oltre 150 anni di storia che si tramanda di generazione in generazione.",
      "Forni a legna originali del 1800 ancora in funzione.",
      "La crosta si forma naturalmente, trattenendo i grassi e i sapori.",
      "Presidio Slow Food del Gran Sasso.",
    ],
    comments: [
      { id: "c7", author: "Paolo V.", avatar: "P", text: "🚨 Camioncino appena arrivato in piazza! C\'è ancora tutto!", timestamp: "3 min fa", likes: 18, isDiscovery: true },
      { id: "c8", author: "Sara T.", avatar: "S", text: "Il pane casereccio è una cosa pazzesca", timestamp: "1 ora fa", likes: 5, isDiscovery: false },
    ],
    badges: ["150 Anni", "Slow Food", "Forno 1800"],
    discoveredBy: "Paolo V.",
    discoveredAt: "Oggi, 09:00",
  },
  {
    id: "t5",
    slug: "porchetta-luco-marsi",
    name: "Porchetta di Luco dei Marsi",
    tagline: "La porchetta dei campioni",
    description:
      "Porchetta di Luco dei Marsi, premiata dalla Guida Gambero Rosso. Pizzapane caldo, porchetta tagliata al momento, sapore intenso.",
    coordinates: { lat: 42.0800, lng: 13.4700 },
    zone: "Luco dei Marsi (AQ)",
    schedule: { days: "Mer – Dom", hours: "11:00 – 15:00" },
    images: [
      "https://www.virtuquotidiane.it/wp-content/uploads/2022/03/salvatore-di-angelo.jpg",
      "https://substackcdn.com/image/fetch/$s_!rmlO!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ff161ffc7-99ee-44c9-ba1e-ac78ab99eab2_900x1350.jpeg",
      "https://www.streetfood42.com/cibodistrada/wp-content/uploads/2015/01/205-antica-porchetta-campli-panino-porchetta-514x276.jpg",
    ],
    menu: [
      { id: "m13", name: "Panino Campione", description: "Porchetta, salsa verde, pizzapane caldo", price: 650, image: "https://www.virtuquotidiane.it/wp-content/uploads/2022/03/salvatore-di-angelo.jpg" },
      { id: "m14", name: "Panino Doppio", description: "Doppia porzione, per i veri affamati", price: 900, image: "https://substackcdn.com/image/fetch/$s_!rmlO!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2Ff161ffc7-99ee-44c9-ba1e-ac78ab99eab2_900x1350.jpeg" },
      { id: "m15", name: "Porchetta ½ kg", description: "Taglio fresco, avvolto per il viaggio", price: 1800, image: "https://www.streetfood42.com/cibodistrada/wp-content/uploads/2015/01/205-antica-porchetta-campli-panino-porchetta-514x276.jpg" },
    ],
    rating: 4.8,
    reviewCount: 213,
    isLive: true,
    social: { instagram: "@porchettaluco" },
    story: [
      "Premiata dalla Guida Gambero Rosso Street Food 2024.",
      "La porchetta viene tagliata al momento davanti al cliente.",
      "Il pizzapane è cotto ogni mattina nel forno a legna.",
      "Food truck che gira i mercati dell\'Aquilano e a est di Roma.",
    ],
    comments: [
      { id: "c9", author: "Nico B.", avatar: "N", text: "Il taglio al momento è uno spettacolo! 🔪🐷", timestamp: "8 min fa", likes: 11, isDiscovery: false },
      { id: "c10", author: "Chiara L.", avatar: "C", text: "🚨 Appena visto in piazza del Mercato!", timestamp: "35 min fa", likes: 7, isDiscovery: true },
    ],
    badges: ["Gambero Rosso 2024", "Taglio al momento", "Pizzapane caldo"],
    discoveredBy: "Chiara L.",
    discoveredAt: "Oggi, 10:45",
  },
];

export function getTruckBySlug(slug: string): Truck | undefined {
  return trucks.find((t) => t.slug === slug);
}

export function getAllTrucks(): Truck[] {
  return trucks;
}
