import React, { useState, useEffect } from 'react';
import GrowthChart from './GrowthChart';
import ProfitabilityChart from './ProfitabilityChart';
import DirectorChart from './DirectorChart';
import GeoChart from './GeoChart';

const Presentation = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    // Slide 0: Portada
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fade-in">
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-800">
        StreamView Analytics
      </h1>
      <h2 className="text-3xl text-zinc-300 font-light">Estrategia de Retención y Rentabilidad</h2>
      <div className="w-24 h-1 bg-emerald-600 rounded-full my-8"></div>
      <p className="text-xl text-zinc-400">Defensa de Proyecto - Visualización de Datos (ADY1104)</p>
      <p className="text-md text-zinc-500 mt-4 font-medium text-emerald-400">Martín Papic & Franco Seguel</p>
    </div>,

    // Slide 1: El Problema
    <div className="flex flex-col justify-center h-full px-20 animate-fade-in">
      <h2 className="text-5xl font-bold text-zinc-100 mb-12 flex items-center">
        <span className="text-emerald-500 mr-4">01.</span> El Desafío del Negocio
      </h2>
      <div className="grid grid-cols-2 gap-12">
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-2xl font-semibold text-zinc-200 mb-4 text-emerald-400">Contexto Actual</h3>
          <p className="text-lg text-zinc-400 leading-relaxed">
            StreamView posee un catálogo inmenso (16,000 títulos), pero carece de una herramienta centralizada para entender qué factores 
            impulsan realmente la retención y la interacción del usuario.
          </p>
        </div>
        <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-2xl font-semibold text-zinc-200 mb-4 text-emerald-400">Nuestro Objetivo (HU-03)</h3>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Construir un storytelling de datos estructurado y coherente. Aplicando las leyes de Gestalt y atributos preatentivos para presentar a la gerencia decisiones seguras sin saturación visual.
          </p>
        </div>
      </div>
    </div>,

    // Slide 2: Growth Chart (HU-01)
    <div className="flex flex-col h-full px-12 py-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-zinc-100 mb-6 flex items-center">
        <span className="text-emerald-500 mr-4">02.</span> Visión Ejecutiva: Retención y Engagement
      </h2>
      <div className="flex-1 w-full bg-zinc-900/80 rounded-2xl border border-zinc-700 p-6 shadow-2xl relative flex flex-col">
        <div className="flex-1 relative"><GrowthChart /></div>
        <p className="text-sm text-emerald-400 mt-6 text-center italic px-12">
          <strong>Historia de Usuario 01 (Gerencia):</strong> Evaluar el estado macro de la plataforma. Utilizamos el <strong>rojo como atributo preatentivo</strong> exclusivamente para señalar años con caída en la recaudación, alertando al ejecutivo sobre la pérdida de retención sin obligarlo a analizar ejes.
        </p>
      </div>
    </div>,

    // Slide 3: Profitability (Riesgo)
    <div className="flex flex-col h-full px-12 py-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-zinc-100 mb-6 flex items-center">
        <span className="text-emerald-500 mr-4">03.</span> Evaluación de Riesgos Financieros
      </h2>
      <div className="flex-1 w-full bg-zinc-900/80 rounded-2xl border border-zinc-700 p-6 shadow-2xl relative flex flex-col">
        <div className="flex-1 relative"><ProfitabilityChart /></div>
        <p className="text-sm text-emerald-400 mt-6 text-center italic px-12">
          <strong>Minimizando la Carga Cognitiva:</strong> Redujimos la muestra al Top 200 de presupuestos para evitar manchas visuales (Gestalt: Continuidad). El color rojo alerta preatentivamente sobre películas que generaron <strong>pérdidas (ROI negativo)</strong>.
        </p>
      </div>
    </div>,

    // Slide 4: Directores (HU-02)
    <div className="flex flex-col h-full px-12 py-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-zinc-100 mb-6 flex items-center">
        <span className="text-emerald-500 mr-4">04.</span> Preferencias y Fiabilidad Creativa
      </h2>
      <div className="flex-1 grid grid-cols-12 gap-8">
        <div className="col-span-5 bg-zinc-900/80 rounded-2xl border border-zinc-700 p-6 shadow-2xl relative flex flex-col">
           <div className="flex-1 relative"><GeoChart /></div>
           <p className="text-xs text-zinc-400 mt-4 text-center">Gestalt (Similitud): El mapa usa una escala monocromática suave para indicar dónde se concentran los retornos geográficos.</p>
        </div>
        <div className="col-span-7 bg-zinc-900/80 rounded-2xl border border-zinc-700 p-6 shadow-2xl relative flex flex-col">
           <div className="flex-1 relative"><DirectorChart /></div>
           <p className="text-xs text-zinc-400 mt-4 text-center"><strong>Historia de Usuario 02 (Análisis):</strong> usamos una escala térmica cobriza (sin tonos rojos de alerta) para priorizar preatentivamente qué talentos deben ser retenidos.</p>
        </div>
      </div>
    </div>,

    // Slide 5: Conclusiones
    <div className="flex flex-col justify-center h-full px-20 animate-fade-in">
      <h2 className="text-5xl font-bold text-zinc-100 mb-12 flex items-center">
        <span className="text-emerald-500 mr-4">05.</span> Conclusiones de Negocio
      </h2>
      <div className="space-y-6">
        <div className="bg-zinc-900 p-6 rounded-xl border-l-4 border-emerald-500">
          <h3 className="text-2xl font-bold text-zinc-200 mb-2">1. Fluctuación de Ingresos</h3>
          <p className="text-zinc-400 text-lg">El análisis macro confirma que el volumen de catálogo no garantiza ingresos constantes. Las caídas interanuales de recaudación (alertadas preatentivamente en rojo) nos indican que la atención debe estar en la calidad y fidelización, no en inflar el catálogo a ciegas.</p>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border-l-4 border-emerald-500">
          <h3 className="text-2xl font-bold text-zinc-200 mb-2">2. Mitigación del Riesgo Financiero</h3>
          <p className="text-zinc-400 text-lg">Al analizar la dispersión de riesgo, los grandes presupuestos son apuestas inseguras a menos que vayan atados al talento directivo comprobado (aislado en el dashboard).</p>
        </div>
      </div>
    </div>,
    
    // Slide 6: Cierre
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fade-in">
      <h1 className="text-6xl font-bold text-zinc-100">
        Muchas Gracias
      </h1>
      <p className="text-xl text-zinc-400">¿Preguntas de la gerencia?</p>
      <button 
        onClick={onClose}
        className="mt-12 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-full text-white font-bold transition-all shadow-lg hover:shadow-emerald-600/50"
      >
        Volver al Dashboard
      </button>
    </div>
  ];

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 bg-zinc-950 z-50 flex flex-col font-sans">
      <div className="h-1 w-full bg-zinc-900">
        <div 
          className="h-full bg-emerald-600 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
      <div className="flex-1 relative overflow-hidden">
        {slides[currentSlide]}
      </div>
      <div className="absolute bottom-8 right-8 flex space-x-4">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-full text-zinc-300 transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-full text-white transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

export default Presentation;


