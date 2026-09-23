import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchAudienceMetrics } from '../services/api';

const AudienceChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAudienceMetrics().then((jsonData) => {
      // Sort by popularity ascending for horizontal bar chart
      const sorted = jsonData.sort((a, b) => a.avg_popularity - b.avg_popularity);
      
      const genres = sorted.map(d => d.genre);
      const popularity = sorted.map(d => d.avg_popularity);
      const count = sorted.map(d => d.count);

      setData([
        {
          y: genres,
          x: popularity,
          type: 'bar',
          orientation: 'h',
          marker: {
            color: popularity,
            colorscale: 'Reds', // Streamview red theme
          },
          text: count.map(c => `${c} títulos`),
          textposition: 'auto',
          hoverinfo: 'y+x'
        }
      ]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-slate-500 animate-pulse font-medium">Cargando demografía...</p>
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
          margin: { t: 20, r: 20, l: 120, b: 40 },
          xaxis: { 
            title: 'Nivel de Engagement (Popularidad Promedio)',
            gridcolor: '#1e293b', 
            zerolinecolor: '#334155'
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

export default AudienceChart;
