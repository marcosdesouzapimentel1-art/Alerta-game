import React, { useState } from "react";
import { 
  Gamepad2, 
  Cpu, 
  Smartphone, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Info,
  BookOpen
} from "lucide-react";
import GamerAlertaApp from "./components/GamerAlertaApp";
import DeveloperDashboard from "./components/DeveloperDashboard";

export default function App() {
  const [activePane, setActivePane] = useState<"simulator" | "code">("simulator");

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-200 flex flex-col relative overflow-x-hidden select-none pb-12 font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-[#F97316]/5 rounded-full blur-3xl -z-10"></div>

      {/* Primary Dashboard Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-[#151921] border-b border-slate-800 shadow-xl sticky top-0 z-30">
        <div className="max-w-7xl w-full mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#2563EB] to-[#F97316] rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20 shrink-0">
              <Gamepad2 className="text-white w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white font-display uppercase">
                  Gamer<span className="text-[#F97316]">Alerta</span>
                </h1>
                <span className="bg-[#2563EB]/10 border border-[#2563EB]/25 text-[#2563EB] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  Protótipo Interativo + Código Flutter
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Central de promoções, notícias e alertas gamer com arquitetura limpa e robusta.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] text-slate-400 font-mono hidden md:inline bg-[#1E232E] px-3 py-1 rounded-full border border-slate-800">
              Desenvolvedor Flutter Sênior & Especialista UX/UI
            </span>
          </div>
        </div>
      </header>

      {/* Project Status Bar / Portuguese Intro */}
      <div className="bg-[#1E232E]/30 border-b border-slate-800/80 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Info className="w-4 h-4 text-[#F97316] shrink-0" />
            <span>
              <strong>Bem-vindo ao workspace!</strong> Interaja com o <strong>simulador de smartphone</strong> na esquerda para testar as features do app, e navegue pelo <strong>painel do desenvolvedor</strong> na direita para ver o código limpo em <strong>Flutter & Dart (MVVM, Clean Architecture, Provider, Firebase)</strong>.
            </span>
          </div>
        </div>
      </div>

      {/* Main Container Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 min-h-0">
        
        {/* Mobile App Toggle Tabs (For Small Screens Only) */}
        <div className="flex bg-[#151921] p-1.5 rounded-xl border border-slate-800 lg:hidden shrink-0 select-none shadow-lg">
          <button 
            onClick={() => setActivePane("simulator")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${activePane === "simulator" ? "bg-[#2563EB] text-white shadow-md shadow-blue-900/30" : "text-slate-400 hover:text-white"}`}
          >
            <Smartphone className="w-4 h-4" />
            Simulador do Aplicativo
          </button>
          <button 
            onClick={() => setActivePane("code")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${activePane === "code" ? "bg-[#F97316] text-white shadow-md shadow-orange-900/30" : "text-slate-400 hover:text-white"}`}
          >
            <Cpu className="w-4 h-4" />
            Código-Fonte Flutter
          </button>
        </div>

        {/* Column 1: Interactive App Panel (Span 6 on Desktop) */}
        <div className={`col-span-12 lg:col-span-6 flex flex-col items-center justify-center ${activePane === "simulator" ? "block" : "hidden lg:flex"}`}>
          <div className="w-full max-w-md">
            <div className="flex items-center justify-between px-4 mb-2 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5 uppercase font-bold text-slate-400 tracking-wider">
                <Gamepad2 className="w-3.5 h-3.5 text-brand-orange" />
                Aplicativo Gamer Alerta (Beta Web)
              </span>
              <span className="text-[10px]">Interface Interativa • Versão Beta</span>
            </div>
            
            {/* Render Gamer Alerta Smartphone Simulator */}
            <GamerAlertaApp />
          </div>
        </div>

        {/* Column 2: Interactive Developer Workspace (Span 6 on Desktop) */}
        <div className={`col-span-12 lg:col-span-6 flex flex-col ${activePane === "code" ? "block" : "hidden lg:flex"}`}>
          <div className="flex items-center justify-between px-2 mb-2 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1.5 uppercase font-bold text-slate-400 tracking-wider">
              <Cpu className="w-3.5 h-3.5 text-brand-blue" />
              Flutter Workspace
            </span>
            <span className="text-[10px]">Dart Code • Clean MVVM</span>
          </div>
          
          {/* Render Developer Dashboard (Code Explorer, Firebase Setup, Deployment Guide) */}
          <DeveloperDashboard />
        </div>

      </main>
    </div>
  );
}
