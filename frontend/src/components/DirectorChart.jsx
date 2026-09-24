import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchDirectorMetrics } from '../services/api';

const DirectorChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDirectorMetrics().then((jsonData) => {
      // Sort by average revenue ascending for horizontal bar chart
      const sorted = jsonData.sort((a, b) => a.avg_revenue - b.avg_revenue);
      
      const directors = sorted.map(d => d.director);
      const revenues = sorted.map(d => d.avg_revenue);
      const rois = sorted.map(d => d.roi * 100);

      // Escala cobriza con mucho blanco, sin llegar a rojo
      const copperScale = [
        [0, '#fafaf9'],   // Blanco/Gris muy tenue
        [0.3, '#fde68a'], // Amarillo suave
        [0.6, '#f59e0b'], // Ambar/Cobrizo medio
        [1, '#92400e']    // Cobrizo oscuro (no rojo)
      ];

      setData([
        {
          y: directors,
          x: revenues,
          type: 'bar',
          orientation: 'h',
          marker: {
            color: rois,
            colorscale: copperScale,
            showscale: true,
            colorbar: {
              title: { text: 'ROI (%)', font: { color: '#a1a1aa' } },
              tickfont: { color: '#a1a1aa' },
              thickness: 15,
              outlinewidth: 0
            },
            line: { color: '#3f3f46', width: 0.5 }
          },
          text: rois.map(roi => `ROI: ${roi.toFixed(0)}%`),
          textposition: 'outside',
          textfont: { color: '#d4d4d8', size: 13 },
          hoverinfo: 'y+x+text'
        }
      ]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-zinc-500 animate-pulse font-medium">Cargando directores top...</p>
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
          margin: { t: 20, r: 100, l: 150, b: 40 },
          bargap: 0.15,
          xaxis: { 
            title: 'Recaudación Promedio Mundial (USD)',
            gridcolor: '#27272a', 
            zerolinecolor: '#3f3f46',
            tickformat: '.2s'
          },
          yaxis: { 
            gridcolor: 'transparent', 
            zerolinecolor: 'transparent' 
          },
          hovermode: 'closest'
        }}
        config={{ displayModeBar: false, responsive: true }}
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
};

export default DirectorChart;
