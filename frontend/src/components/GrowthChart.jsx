import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchGrowthMetrics } from '../services/api';

const GrowthChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrowthMetrics().then((jsonData) => {
      const filteredData = jsonData.filter(d => d.year_added >= 2015);
      
      const years = filteredData.map(d => d.year_added);
      const revenues = filteredData.map(d => d.avg_revenue);
      const moviesPop = filteredData.map(d => d.movies_popularity);

      setData([
        {
          x: years,
          y: revenues,
          type: 'bar',
          name: 'Recaudación Avg',
                    marker: { 
            color: revenues.map((rev, i) => (i > 0 && rev < revenues[i-1]) ? '#ef4444' : '#10b981'), 
            opacity: 0.8 
          },
          hoverinfo: 'x+y'
        },
        {
          x: years,
          y: moviesPop,
          type: 'scatter',
          mode: 'lines+markers',
          name: 'Popularidad',
          yaxis: 'y2',
          line: { color: '#60a5fa', width: 3, shape: 'spline' }, // Blue
          marker: { size: 6, color: '#93c5fd' },
          hoverinfo: 'x+y'
        }
      ]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-zinc-500 animate-pulse font-medium">Cargando métricas de rendimiento...</p>
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
          font: { color: '#a1a1aa', family: 'ui-sans-serif, system-ui, sans-serif' },
          margin: { t: 20, r: 50, l: 60, b: 40 },
          xaxis: { 
            gridcolor: '#27272a', 
            zerolinecolor: '#3f3f46',
            tickmode: 'linear',
            dtick: 1
          },
          yaxis: { 
            title: 'Recaudación (USD)',
            gridcolor: '#27272a', 
            zerolinecolor: '#3f3f46',
            tickformat: '.2s'
          },
          yaxis2: {
            title: 'Popularidad',
            overlaying: 'y',
            side: 'right',
            gridcolor: 'transparent',
            zerolinecolor: 'transparent',
            showgrid: false
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

