import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchGrowthMetrics } from '../services/api';

const GrowthChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrowthMetrics().then((jsonData) => {
      // Filtrar años inválidos o muy antiguos para mejor visualización
      const filteredData = jsonData.filter(d => d.year_added >= 2010 && d.year_added <= 2025);
      
      const years = filteredData.map(d => d.year_added);
      const avgRevenue = filteredData.map(d => d.avg_revenue);
      const revenues = avgRevenue;
      const moviesPop = filteredData.map(d => d.movies_popularity);
      const showsPop = filteredData.map(d => d.shows_popularity || d.movies_popularity);

      setData([
        {
          x: years,
          y: revenues,
          type: 'bar',
          name: 'Recaudación Avg',
          marker: { color: '#ef4444', opacity: 0.8 },
          hoverinfo: 'x+y'
        },
        {
          x: years,
          y: moviesPop,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Pop. Películas',
          yaxis: 'y2',
          line: { color: '#cbd5e1', width: 3, shape: 'spline' },
          marker: { size: 6, color: '#f8fafc' },
          hoverinfo: 'x+y'
        },
        {
          x: years,
          y: showsPop,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Pop. Series',
          yaxis: 'y2',
          line: { color: '#64748b', width: 2, dash: 'dot', shape: 'spline' },
          marker: { size: 5, color: '#94a3b8' },
          hoverinfo: 'x+y'
        }
      ]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-slate-500 animate-pulse font-medium">Cargando métricas...</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Plot
        data={data}
        layout={{
          autosize: true,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)',
          font: { color: '#94a3b8', family: 'ui-sans-serif, system-ui, sans-serif' },
          margin: { t: 10, r: 60, l: 60, b: 30 },
          xaxis: { 
            gridcolor: '#1e293b', 
            zerolinecolor: '#1e293b',
            tickmode: 'linear',
            dtick: 2
          },
          yaxis: { 
            title: 'Recaudación USD',
            gridcolor: '#1e293b', 
            zerolinecolor: '#1e293b',
            tickformat: '.2s'
          },
          yaxis2: {
            title: 'Popularidad',
            overlaying: 'y',
            side: 'right',
            gridcolor: 'transparent',
            zerolinecolor: 'transparent',
          },
          showlegend: false,
          hovermode: 'x unified'
        }}
        config={{ displayModeBar: false, responsive: true }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default GrowthChart;
