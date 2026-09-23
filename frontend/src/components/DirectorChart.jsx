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

      setData([
        {
          y: directors,
          x: revenues,
          type: 'bar',
          orientation: 'h',
          marker: {
            color: rois,
            colorscale: 'Reds', // Red scale for ROI
            colorbar: {
                title: 'ROI (%)',
                thickness: 10,
                tickfont: { color: '#94a3b8' },
                outlinewidth: 0
            }
          },
          text: rois.map(roi => `ROI: ${roi.toFixed(0)}%`),
          textposition: 'auto',
          hoverinfo: 'y+x+text'
        }
      ]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-slate-500 animate-pulse font-medium">Cargando directores top...</p>
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
          margin: { t: 20, r: 80, l: 150, b: 40 },
          xaxis: { 
            title: 'Recaudación Promedio Mundial (USD)',
            gridcolor: '#1e293b', 
            zerolinecolor: '#334155',
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
