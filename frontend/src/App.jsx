import React, { useState } from 'react';
import GrowthChart from './components/GrowthChart';
import ProfitabilityChart from './components/ProfitabilityChart';
import TopContent from './components/TopContent';
import AudienceChart from './components/AudienceChart';
import GeoChart from './components/GeoChart';
import DirectorChart from './components/DirectorChart';
import Presentation from './components/Presentation';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('resumen');
  const [isPresenting, setIsPresenting] = useState(false);

  if (isPresenting) {
    return <Presentation onClose={() => setIsPresenting(false)} />;
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col z-20 shadow-2xl">
        <div className="h-20 flex items-center px-6 border-b border-zinc-800">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700">
            StreamView
          </h1>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 flex flex-col justify-between">
          <nav className="px-4 space-y-2">
            <button 
              onClick={() => setActiveTab('resumen')}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'resumen' 
                  ? 'bg-emerald-600/10 text-emerald-500' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Resumen General
            </button>
            
            <button 
              onClick={() => setActiveTab('rentabilidad')}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'rentabilidad' 
                  ? 'bg-emerald-600/10 text-emerald-500' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Rentabilidad ROI
            </button>

            <button 
              onClick={() => setActiveTab('audiencia')}
              className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === 'audiencia' 
                  ? 'bg-emerald-600/10 text-emerald-500' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Audiencia Top
            </button>
          </nav>
          
          <div className="p-4 border-t border-zinc-800">
            <button 
              onClick={() => setIsPresenting(true)}
              className="w-full flex items-center justify-center px-4 py-2 bg-zinc-800 hover:bg-emerald-600 rounded-lg text-sm font-bold text-zinc-200 hover:text-white transition-colors mb-4 shadow-lg shadow-black/50"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M7 6v12l10-6z"/></svg>
              Modo Presentación
            </button>

            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-500 flex items-center justify-center text-sm font-bold border border-emerald-500/30">
                SV
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Martín Papic & Franco Seguel</p>
                <p className="text-xs text-zinc-500">Equipo Consultor</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 px-8 flex items-center justify-between border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-sm z-10">
          <h2 className="text-xl font-semibold text-zinc-100">
            {activeTab === 'resumen' && 'Visión Estratégica Global'}
            {activeTab === 'rentabilidad' && 'Análisis de Rentabilidad y Riesgo'}
            {activeTab === 'audiencia' && 'Tendencias de Audiencia'}
          </h2>
        </header>

        {/* Dashboard Views */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* VISTA 1: RESUMEN GENERAL */}
          {activeTab === 'resumen' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto pb-10">
              <div className="col-span-1 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-center relative overflow-hidden">
                <h3 className="text-zinc-400 text-sm font-medium mb-1">Total Títulos</h3>
                <p className="text-4xl font-bold text-zinc-100">16,000</p>
                <p className="text-xs text-green-400 mt-2 flex items-center">Base de datos sincronizada</p>
              </div>
              <div className="col-span-1 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
                <h3 className="text-zinc-400 text-sm font-medium mb-1">Categoría Dominante</h3>
                <p className="text-4xl font-bold text-zinc-100">Series TV</p>
                <p className="text-xs text-green-400 mt-2 flex items-center">Mayor retención de usuarios</p>
              </div>
              <div className="col-span-1 md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col justify-center">
                <h3 className="text-zinc-400 text-sm font-medium mb-1">ROI Promedio General</h3>
                <p className="text-4xl font-bold text-zinc-100">145%</p>
                <p className="text-xs text-zinc-500 mt-2 flex items-center">Altamente rentable</p>
              </div>

              {/* Main Chart */}
              <div className="col-span-1 md:col-span-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl min-h-[400px]">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <h3 className="text-lg font-semibold text-zinc-100">Retención e Interacción (Engagement vs Recaudación)</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center"><div className="w-3 h-3 rounded bg-emerald-500 mr-1.5"></div>Recaudación Avg</span>
                    <span className="flex items-center"><div className="w-3 h-3 rounded bg-red-500 mr-1.5"></div>Caída Interanual (Alerta)</span>
                    <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-blue-400 mr-1.5"></div>Popularidad</span>
                  </div>
                </div>
                <div className="w-full h-[300px] bg-zinc-950/50 rounded-xl flex items-center justify-center border border-zinc-800/50">
                  <GrowthChart />
                </div>
                <p className="text-xs text-zinc-500 mt-4 text-center italic">Lectura: Se utiliza el rojo preatentivo para alertar sobre caídas de retención/recaudación anual.</p>
              </div>

              {/* Geo Map */}
              <div className="col-span-1 md:col-span-12 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl min-h-[450px] flex flex-col">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                  <h3 className="text-lg font-semibold text-zinc-100">Distribución Geográfica de Rentabilidad (ROI %)</h3>
                  <span className="flex items-center text-xs text-zinc-400"><div className="w-3 h-3 rounded bg-teal-500 mr-1.5"></div>Gradiente Teal: % Retorno de Inversión</span>
                </div>
                <div className="flex-1 w-full bg-zinc-950/50 rounded-xl border border-zinc-800/50 overflow-hidden">
                  <GeoChart />
                </div>
                <p className="text-xs text-zinc-500 mt-4 text-center italic">Lectura: Mapa monocromático indicando el ROI neto promedio por país productor.</p>
              </div>
            </div>
          )}

          {/* VISTA 2: RENTABILIDAD */}
          {activeTab === 'rentabilidad' && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 h-full pb-10">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col min-h-[500px]">
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100">Experiencia de Usuario e Interacción (Riesgo vs Recompensa)</h3>
                    <p className="text-sm text-zinc-400 mt-1">Análisis Gestalt (Agrupación/Proximidad): Top 200 presupuestos (x) vs recaudación (y).</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 bg-zinc-950/60 px-3 py-2 rounded-xl border border-zinc-800 shrink-0">
                    <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-teal-500 mr-1.5"></div>ROI Positivo</span>
                    <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>ROI Negativo (Pérdida)</span>
                    <span className="flex items-center"><div className="w-3.5 h-3.5 rounded-full border border-zinc-400 mr-1.5"></div>Tamaño = Popularidad</span>
                  </div>
                </div>
                <div className="flex-1 w-full bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                  <ProfitabilityChart />
                </div>
                <p className="text-xs text-zinc-500 mt-4 text-center italic">Lectura: Top 200 presupuestos históricos. El rojo indica riesgo financiero (pérdida). El tamaño indica popularidad.</p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col min-h-[550px]">
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-100">Directores de Mayor Impacto Financiero</h3>
                    <p className="text-sm text-zinc-400 mt-1">El tono cobrizo aísla preatentivamente al talento Top según su retorno de inversión.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 bg-zinc-950/60 px-3 py-2 rounded-xl border border-zinc-800 shrink-0">
                    <span>Longitud: Recaudación Promedio</span>
                    <span className="flex items-center"><div className="w-3 h-2 rounded bg-amber-600 mr-1.5"></div>Escala Cobriza: % ROI</span>
                  </div>
                </div>
                <div className="flex-1 w-full bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                  <DirectorChart />
                </div>
                <p className="text-xs text-zinc-500 mt-4 text-center italic">Lectura: Los tonos cobrizos aíslan preatentivamente a los directores con mayor ROI (retorno sobre inversión).</p>
              </div>
            </div>
          )}

          {/* VISTA 3: AUDIENCIA */}
          {activeTab === 'audiencia' && (
            <div className="max-w-7xl mx-auto pb-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="col-span-1 lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-6">Top 5 Mundial de Contenidos</h3>
                  <TopContent />
                  <p className="text-xs text-zinc-500 mt-4 text-center italic">Lectura: Los contenidos más exitosos según su calificación global.</p>
                </div>
                <div className="col-span-1 lg:col-span-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl flex flex-col min-h-[550px]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-100 mb-1">Preferencias de Consumo de Contenido (Top Géneros)</h3>
                      <p className="text-sm text-zinc-400">Popularidad promedio según la etiqueta de género (Base: Todos los contenidos).</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 bg-zinc-950/60 px-3 py-2 rounded-xl border border-zinc-800 shrink-0">
                      <span>Longitud: Engagement</span>
                      <span className="flex items-center"><div className="w-3 h-2 rounded bg-amber-600 mr-1.5"></div>Escala Cobriza: Nº Títulos</span>
                    </div>
                  </div>
                  <div className="flex-1 w-full bg-zinc-950/50 rounded-xl border border-zinc-800/50">
                    <AudienceChart />
                  </div>
                  <p className="text-xs text-zinc-500 mt-4 text-center italic">Lectura: La longitud de la barra indica el engagement, mientras que el tono cobrizo advierte el volumen de títulos producidos.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default App;
