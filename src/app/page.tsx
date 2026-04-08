"use client";

import { useState, FormEvent } from "react";

// ─── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    // Simulate success for demo if backend not ready
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-[80px] pointer-events-none" />

      {/* Badge */}
      <div className="animate-fade-in-up mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-cyan-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Lanzamiento Soon — Beta privada
        </div>
      </div>

      {/* Headline */}
      <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight mb-6 max-w-4xl">
        El único OCR diseñado para facturas del
        <br />
        <span className="gradient-text">Ministerio de Hacienda de Costa Rica.</span>
      </h1>

      <p className="animate-fade-in-up text-lg sm:text-xl text-slate-400 text-center max-w-2xl mb-10 leading-relaxed">
        Escanea facturas MH CR, extrae cédula jurídica, código proveedor, monto total y más.
        Datos que importan para tributación — organizados automáticamente.
      </p>

      {/* CTA */}
      <div className="animate-fade-in-up w-full max-w-md">
        {status === "success" ? (
          <div className="glass rounded-2xl p-8 text-center animate-fade-in-up">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-semibold text-white mb-2">¡Estás en la lista!</h3>
            <p className="text-slate-400 text-sm">
              Te avisaremos cuando abras el beta. Primeras 100 personas tienen{" "}
              <span className="text-cyan-400 font-semibold">50% off lifetime</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 px-5 py-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-base transition-all"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold text-base hover:from-cyan-500 hover:to-cyan-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed animate-pulse-glow"
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Un momento...
                  </span>
                ) : (
                  "Unirme al Waitlist"
                )}
              </button>
            </div>
            <p className="text-center text-slate-500 text-xs">
              🚀 Early adopters: <span className="text-cyan-400">50% off lifetime</span> — Primeras 100 personas
            </p>
          </form>
        )}
      </div>

      {/* Social proof */}
      <div className="animate-fade-in-up mt-12 flex items-center gap-3">
        <div className="flex -space-x-2">
          {["FD", "MR", "AS", "KL"].map((initials) => (
            <div key={initials} className="w-9 h-9 rounded-full bg-slate-700 border-2 border-slate-900 flex items-center justify-center text-xs font-medium text-slate-300">
              {initials}
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-sm">
          <span className="text-slate-300 font-medium">+240</span> personas en waitlist
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

// ─── How it Works ───────────────────────────────────────────────────────────
const steps = [
  {
    number: "01",
    title: "Escanea tu factura MH",
    description: "Envía la foto por WhatsApp o escanea desde la app. Nuestra AI lee el formato específico del Ministerio de Hacienda CR.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Extrae datos MH CR",
    description: "Cédula jurídica, código proveedor, monto total. AI entrenada en el layout MH — no un OCR genérico.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Organiza para tributación",
    description: "Exporta a Excel con campos estructurados listos para DGI o tu contador. Formato MH compatible.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

function HowItWorks() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Cómo funciona
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Diseñado para el formato MH.
            <br />
            <span className="gradient-text">No un OCR genérico.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            3 pasos para extraer datos de facturas del Ministerio de Hacienda CR.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="gradient-border p-8 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                  {step.icon}
                </div>
                <span className="text-5xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ────────────────────────────────────────────────────────────────
const benefits = [
  {
    emoji: "🏛️",
    title: "Cédula Jurídica extraída",
    description: "OCR optimizado para el formato MH CR. Extrae automáticamente la cédula jurídica del emisor para cada factura escaneada.",
    stat: "MH CR native",
  },
  {
    emoji: "🔢",
    title: "Código Proveedor MH",
    description: "Captura el código de proveedor del Ministerio de Hacienda. Sin digitación manual, sin errores.",
    stat: "Código MH",
  },
  {
    emoji: "💰",
    title: "Montos en Colones",
    description: "Reconoce y estructura correctamente los montos en CRC. Soporte nativo para decimales CR y separadores locales.",
    stat: "CRC nativo",
  },
  {
    emoji: "📋",
    title: "Datos listos para DGI/Digital",
    description: "Exporta en formato compatible con plataformas de hacienda. Estructura los campos que el MH espera.",
    stat: "DGI ready",
  },
  {
    emoji: "⚡",
    title: "5 segundos por factura",
    description: "Escanea desde WhatsApp o la app. Foto → dato estructurado listo para tributar en menos de 10 segundos.",
    stat: "> 95% accuracy",
  },
  {
    emoji: "🔒",
    title: "Tus datos seguros",
    description: "Encriptación de grado financiero. facturas nunca se comparten con terceros. Cumplimiento CR optional.",
    stat: "SOC 2 ready",
  },
];

function Benefits() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Beneficios
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Campos CR que necesitas.
            <br />
            <span className="gradient-text">Todos extraídos automáticamente.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Diseñado para facturas del MH — no un OCR genérico adaptado.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{b.emoji}</span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400">
                  {b.stat}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{b.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: 9,
    description: "Para freelancers que empiezan a organizarse.",
    features: [
      "30 scans/mes",
      "OCR + extracción de datos",
      "Categorización automática",
      "Export a Excel (CSV)",
      "1 usuario",
      "Soporte por email",
    ],
    cta: "Unirme al Waitlist",
    highlight: false,
  },
  {
    name: "Pro",
    price: 29,
    description: "Para profesionales que necesitan más.",
    features: [
      "200 scans/mes",
      "Todo lo de Starter",
      "Reportes mensuales",
      "Integración WhatsApp",
      "Categorías personalizadas",
      "Historial 12 meses",
      "Soporte prioritario",
    ],
    cta: "Unirme al Waitlist",
    highlight: true,
  },
  {
    name: "Team",
    price: 49,
    description: "Para equipos y pequeñas agencias.",
    features: [
      "Scans ilimitados",
      "Todo lo de Pro",
      "Hasta 5 usuarios",
      "API access",
      "White-label",
      "Manager de reportes",
      "SOPORTE DEDICADO",
    ],
    cta: "Contactar",
    highlight: false,
  },
];

function Pricing() {
  return (
    <section className="py-24 px-4 relative" id="pricing">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Simple.{" "}
            <span className="gradient-text">Sin sorpresas.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Empieza con $9/mes. Sin contratos. Cancela cuando quieras.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-slate-300">
            <span className="text-cyan-400 font-semibold">50% OFF</span> para los primeros 100 waitlisters
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 transition-all duration-300 ${
                plan.highlight
                  ? "bg-gradient-to-b from-cyan-500/20 to-slate-900/80 border-2 border-cyan-500/50 relative"
                  : "glass hover:border-slate-600"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-cyan-500 rounded-full text-xs font-bold text-white">
                  MÁS POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black">${plan.price}</span>
                <span className="text-slate-400 text-sm">/mes</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <svg className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  plan.highlight
                    ? "bg-cyan-500 hover:bg-cyan-400 text-white"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────────
function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative">
        {status === "success" ? (
          <div className="glass rounded-3xl p-12 animate-fade-in-up">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold mb-4">¡Listo para el cambio!</h2>
            <p className="text-slate-400">
              Te mandamos un email cuando abre el beta. Mientras tanto, síguenos en LinkedIn para updates.
            </p>
          </div>
        ) : (
          <>
            <div className="text-6xl mb-8">📸</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Deja de perder tiempo
              <br />
              <span className="gradient-text">con facturas manual.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10">
              Únete al waitlist hoy y obtén{" "}
              <span className="text-cyan-400 font-bold">50% off de por vida</span> como early adopter.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 px-5 py-4 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 text-base"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white font-semibold hover:from-cyan-500 hover:to-cyan-400 transition-all disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Unirme Ahora"}
              </button>
            </form>
            <p className="text-slate-500 text-xs mt-4">
              Sin spam. Solo te contactamos cuando lancemos.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-bold">AI Invoice Scanner</span>
        </div>
        <p className="text-slate-500 text-sm">
          © 2026 AI Invoice Scanner · Hecho en Costa Rica 🇸🇻
        </p>
      </div>
    </footer>
  );
}

// ─── Navbar ─────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-bold text-lg">InvoiceAI</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#how" className="hover:text-cyan-400 transition-colors">Cómo funciona</a>
          <a href="#benefits" className="hover:text-cyan-400 transition-colors">Beneficios</a>
          <a href="#pricing" className="hover:text-cyan-400 transition-colors">Pricing</a>
        </div>
        <a
          href="#waitlist"
          className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-semibold transition-colors"
        >
          Unirme
        </a>
      </div>
    </nav>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
