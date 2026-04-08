import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Invoice Scanner — Escanea facturas, ahorra horas",
  description: "La inteligencia artificial que lee tus facturas, extrae los datos y los organiza automáticamente. Para freelancers y small businesses en Costa Rica y LATAM.",
  keywords: "ocr facturas, escanear facturas, automatizacion contable, ai para negocios, costa rica",
  openGraph: {
    title: "AI Invoice Scanner — Escanea facturas, ahorra horas",
    description: "Escanea facturas con tu cámara. AI extrae datos automáticamente. Ahorra 2-4 horas por semana.",
    locale: "es_CR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
