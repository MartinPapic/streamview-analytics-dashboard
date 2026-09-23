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
      <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
        StreamView Analytics
      </h1>
      <h2 className="text-3xl text-slate-300 font-light">Estrategia de Retención y Rentabilidad</h2>
      <div className="w-24 h-1 bg-red-600 rounded-full my-8"></div>
      <p className="text-xl text-slate-400">Defensa de Proyecto - Visualización de Datos (ADY1104)</p>
      <p className="text-md text-slate-500 mt-4 font-medium text-red-400">Martín Papic & Franco Seguel</p>
    </div>,

    // Slide 1: El Problema
    <div className="flex flex-col justify-center h-full px-20 animate-fade-in">
      <h2 className="text-5xl font-bold text-slate-100 mb-12 flex items-center">
        <span className="text-red-500 mr-4">01.</span> El Desafío del Negocio
      </h2>
      <div className="grid grid-cols-2 gap-12">
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
          <h3 className="text-2xl font-semibold text-slate-200 mb-4 text-red-400">Contexto Actual</h3>
          <p className="text-lg text-slate-400 leading-relaxed">
            StreamView posee un catálogo inmenso (16,000 títulos), pero carece de una herramienta centralizada para entender qué factores 
            (presupuesto, directores, regiones) impulsan realmente la rentabilidad y la retención del usuario.
          </p>
        </div>
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
          <h3 className="text-2xl font-semibold text-slate-200 mb-4 text-red-400">Nuestro Objetivo</h3>
          <p className="text-lg text-slate-400 leading-relaxed">
            Construir una solución interactiva de baja carga cognitiva que permita a la Alta Gerencia y Analistas de Contenido 
            tomar decisiones de inversión basadas en datos reales de engagement y ROI neto.
          </p>
        </div>
      </div>
    </div>,

    // Slide 2: Datos y Descubrimientos
    <div className="flex flex-col justify-center h-full px-20 animate-fade-in">
      <h2 className="text-5xl font-bold text-slate-100 mb-12 flex items-center">
        <span className="text-red-500 mr-4">02.</span> Ingeniería de Datos & Anomalías
      </h2>
      <div className="bg-slate-900/50 p-10 rounded-2xl border border-slate-800 space-y-8">
        <p className="text-xl text-slate-300">
          Utilizamos <strong>Kedro</strong> para construir pipelines analíticos robustos en Python, procesando datos de `movies` y `tv_shows`.
        </p>
        <div className="flex items-start bg-red-900/20 p-6 rounded-xl border border-red-900/50">
          <div className="text-red-500 mr-4 mt-1">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <div>
            <h4 className="text-xl font-bold text-red-400 mb-2">Hallazgo Crítico en EDA</h4>
            <p className="text-lg text-slate-400">
              El dataset sintético presentó una distribución perfectamente plana y columnas nulas (`duration`). 
              Esto nos obligó a pivotar nuestro enfoque analítico desde "volumen de contenido" hacia <strong>Rendimiento Financiero Cualitativo</strong>, asegurando que el dashboard entregue valor gerencial real.
            </p>
          </div>
        </div>
      </div>
    </div>,

    // Slide 3: Live Chart - Growth
    <div className="flex flex-col h-full px-12 py-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center">
        <span className="text-red-500 mr-4">03.</span> Visión Macro (Demostración en Vivo)
      </h2>
      <p className="text-slate-400 mb-6 text-lg">
        Aplicamos principios de la <strong>Gestalt (Figura-Fondo)</strong> desaturando el engagement a tonos grises y destacando la recaudación en rojo marca.
      </p>
      <div className="flex-1 w-full bg-slate-900/80 rounded-2xl border border-slate-700 p-6 shadow-2xl relative">
        <GrowthChart />
      </div>
    </div>,

    // Slide 4: Live Chart - Rentabilidad
    <div className="flex flex-col h-full px-12 py-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center">
        <span className="text-red-500 mr-4">04.</span> Riesgo de Inversión (Gestalt: Continuidad)
      </h2>
      <p className="text-slate-400 mb-6 text-lg">
        Reducir la opacidad al 70% permite que la superposición cree clústers visuales naturales, evitando el ruido cognitivo.
      </p>
      <div className="flex-1 w-full bg-slate-900/80 rounded-2xl border border-slate-700 p-6 shadow-2xl relative">
        <ProfitabilityChart />
      </div>
    </div>,

    // Slide 5: Live Chart - Directores y Geografía
    <div className="flex flex-col h-full px-12 py-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-slate-100 mb-6 flex items-center">
        <span className="text-red-500 mr-4">05.</span> Insights de Alto Valor (Gestalt: Similitud)
      </h2>
      <p className="text-slate-400 mb-6 text-lg">
        La escala monocromática <strong>Reds</strong> guía preatentivamente el ojo hacia el alto ROI sin tener que leer números.
      </p>
      <div className="flex-1 grid grid-cols-2 gap-8">
        <div className="bg-slate-900/80 rounded-2xl border border-slate-700 p-6 shadow-2xl relative">
           <GeoChart />
        </div>
        <div className="bg-slate-900/80 rounded-2xl border border-slate-700 p-6 shadow-2xl relative">
           <DirectorChart />
        </div>
      </div>
    </div>,

    // Slide 6: Conclusiones
    <div className="flex flex-col justify-center h-full px-20 animate-fade-in">
      <h2 className="text-5xl font-bold text-slate-100 mb-12 flex items-center">
        <span className="text-red-500 mr-4">06.</span> Conclusiones y Decisiones
      </h2>
      <div className="space-y-6">
        <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-slate-200 mb-2">1. El Talento sobre el Presupuesto</h3>
          <p className="text-slate-400 text-lg">La rentabilidad extrema no requiere presupuestos masivos; retener directores top (como los Russo) garantiza el éxito financiero.</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-slate-200 mb-2">2. Dominancia Episódica</h3>
          <p className="text-slate-400 text-lg">Las Series dominan el engagement global. Invertir en ellas reduce la tasa de churn más que las películas unitarias.</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-xl border-l-4 border-red-500">
          <h3 className="text-2xl font-bold text-slate-200 mb-2">3. Escalabilidad Técnica</h3>
          <p className="text-slate-400 text-lg">Nuestra arquitectura (Python Kedro + React Plotly) permite conectar esto a un Data Warehouse en el futuro para analítica en tiempo real.</p>
        </div>
      </div>
    </div>,
    
    // Slide 7: Cierre
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-fade-in">
      <h1 className="text-6xl font-bold text-slate-100">
        Muchas Gracias
      </h1>
      <p className="text-xl text-slate-400">¿Preguntas de la gerencia?</p>
      <button 
        onClick={onClose}
        className="mt-12 px-8 py-3 bg-red-600 hover:bg-red-700 rounded-full text-white font-bold transition-all shadow-lg hover:shadow-red-600/50"
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
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col font-sans">
      {/* ProgressBar */}
      <div className="h-1 w-full bg-slate-900">
        <div 
          className="h-full bg-red-600 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 relative overflow-hidden">
        {slides[currentSlide]}
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 right-8 flex space-x-4">
        <button 
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="p-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 rounded-full text-slate-300 transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button 
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="p-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-full text-white transition-colors shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Close button top right */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>
  );
};

export default Presentation;
