// src/data/prices.ts

export type MaterialType = 'hakikiDeri' | 'suniDeri' | 'kumash';

export interface ProductPriceOption {
  hakikiDeri: string;
  suniDeri: string;
  kumash: string;
}

export const productPrices: Record<string, ProductPriceOption> = {
  // --- ÜÇLÜ / MODERN / CHESTER KOLTUKLAR & TAKIMLAR ---
  "VX-036": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Ambra
  "VX-035": { hakikiDeri: "230.000 TL", suniDeri: "130.000 TL", kumash: "85.000 TL" }, // Antes (300cm devasa)
  "VX-033": { hakikiDeri: "280.000 TL", suniDeri: "150.000 TL", kumash: "95.000 TL" }, // Argento (Köşe koltuk)
  "VX-032": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Aria
  "VX-030": { hakikiDeri: "205.000 TL", suniDeri: "115.000 TL", kumash: "65.000 TL" }, // Bello
  "VX-029": { hakikiDeri: "210.000 TL", suniDeri: "118.000 TL", kumash: "68.000 TL" }, // Celesta
  "VX-028": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Konnes
  "VX-027": { hakikiDeri: "205.000 TL", suniDeri: "115.000 TL", kumash: "65.000 TL" }, // Dolce
  "VX-026": { hakikiDeri: "220.000 TL", suniDeri: "125.000 TL", kumash: "75.000 TL" }, // Eleganze
  "VX-025": { hakikiDeri: "210.000 TL", suniDeri: "118.000 TL", kumash: "68.000 TL" }, // Fiore
  "VX-024": { hakikiDeri: "215.000 TL", suniDeri: "120.000 TL", kumash: "70.000 TL" }, // Flux
  "VX-022": { hakikiDeri: "450.000 TL", suniDeri: "210.000 TL", kumash: "195.000 TL" }, // Gieda (3+1+1+Puf Takım)
  "VX-021": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Hera
  "VX-003": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Letra (Chester)
  "VX-004": { hakikiDeri: "210.000 TL", suniDeri: "118.000 TL", kumash: "68.000 TL" }, // Luce
  "VX-005": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Lucente
  "VX-008": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Luna
  "VX-006": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Monia
  "VX-007": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Nobi
  "VX-009": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Notte
  "VX-010": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Pole
  "VX-011": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Punes
  "VX-012": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Qui
  "VX-013": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Senta
  "VX-015": { hakikiDeri: "450.000 TL", suniDeri: "210.000 TL", kumash: "195.000 TL" }, // Serena (Takım: 3+1+1+Puf Takım)
  "VX-014": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Sole
  "VX-017": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Stella
  "VX-018": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Stilo
  "VX-016": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Velos (Chester)
  "VX-019": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Vexa
  "VX-020": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Vittoria (Chester)
  "VX-002": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Cielo
  "VX-0040": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Seny
  "VX-0041": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Velum
  "VX-0054": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Marge (Chester)
  "VX-0055": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Celesta (Chester)
  "VX-0056": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Nova (Chester)
  "VX-0057": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Oasis (Chester)
  "VX-0057-1": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Roni (Chester)
  "VX-0058": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Cozy
  "VX-0060": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Velva
  "VX-0041-1": { hakikiDeri: "195.000 TL", suniDeri: "110.000 TL", kumash: "60.000 TL" }, // Fels
  "VX-015-1": { hakikiDeri: "445.000 TL", suniDeri: "250.000 TL", kumash: "180.000 TL" }, // Bonte (Takım)
  "VX-0057-1-1": { hakikiDeri: "240.000 TL", suniDeri: "135.000 TL", kumash: "85.000 TL" }, // Torino (Chester)
  "VX-088": { hakikiDeri: "205.000 TL", suniDeri: "115.000 TL", kumash: "80.000 TL" }, // Nuvola

  // --- BERJERLER (TEKLİLER) ---
  "VX-034": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Amore Berjer
  "VX-023": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Freco Berjer
  "VX-001": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Nova Berjer
  "VX-0042": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Aureo Berjer
  "VX-0043": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Denso Berjer
  "VX-0044": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Fiato Berjer
  "VX-0045": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Fiume Berjer
  "VX-0046": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Fres Berjer
  "VX-0047": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Miele Berjer
  "VX-0048": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Peto Berjer
  "VX-0049": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Flux Berjer
  "VX-0050": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Salto Berjer
  "VX-0051": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Slen Berjer
  "VX-0052": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Zelo Berjer
  "VX-0053": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Zio Berjer
  "VX-0053-1": { hakikiDeri: "125.000 TL", suniDeri: "70.000 TL", kumash: "55.000 TL" }, // Nuova Berjer

  // --- PUFLAR (Fiyatları 0 TL) ---
  "VX-0061": { hakikiDeri: "60.000 TL", suniDeri: "40.000 TL", kumash: "40.000 TL" }, // Cerchio Puf
  "VX-0062": { hakikiDeri: "30.000 TL", suniDeri: "20.000 TL", kumash: "20.000 TL" }, // Forza Puf
  "VX-0063": { hakikiDeri: "40.000 TL", suniDeri: "25.000 TL", kumash: "20.000 TL" }, // Fred Puf
  "VX-0064": { hakikiDeri: "85.000 TL", suniDeri: "60.000 TL", kumash: "55.000 TL" }, // Inzio Puf
  "VX-0065": { hakikiDeri: "40.000 TL", suniDeri: "27.000 TL", kumash: "25.000 TL" }, // Lento Puf
  "VX-0066": { hakikiDeri: "30.000 TL", suniDeri: "20.000 TL", kumash: "20.000 TL" }, // Rosa Puf
  "VX-0067": { hakikiDeri: "40.000 TL", suniDeri: "32.000 TL", kumash: "28.000 TL" }, // Viale Puf
};