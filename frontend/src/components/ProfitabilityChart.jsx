import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const ProfitabilityChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/rep_profitability_metrics.json')
      .then(res => res.json())
      .then(jsonData => {
        let parsed = jsonData;
        if (!Array.isArray(jsonData) && jsonData.title) {
            const keys = Object.keys(jsonData.title);
            parsed = keys.map(k => ({
                title: jsonData.title[k],
                budget: jsonData.budget[k],
                revenue: jsonData.revenue[k],
                roi: jsonData.roi[k],
                vote_average: jsonData.vote_average[k]
            }));
        }

        // Filtramos para evitar un colapso en el navegador con 16k puntos
        // Tomamos el top 1000 de películas con mayor presupuesto para ver el riesgo vs recompensa
        const sample = parsed.sort((a,b) => b.budget - a.budget).slice(0, 1000);

        setData([{
          x: sample.map(d => d.budget),
          y: sample.map(d => d.revenue),
          text: sample.map(d => `<b>${d.title}</b><br>ROI: ${(d.roi * 100).toFixed(0)}%<br>Rating: ${d.vote_average.toFixed(1)}`),
          hoverinfo: 'text',
          mode: 'markers',
          type: 'scattergl',
          marker: {
            size: sample.map(d => Math.max(5, d.vote_average * 1.5)), // El tamaño de la burbuja refleja el rating
            color: sample.map(d => d.roi), // El color refleja el ROI
            colorscale: 'Portland',
            showscale: true,
            colorbar: {
                title: { text: 'ROI', font: { color: '#94a3b8' } },
                tickfont: { color: '#94a3b8' },
                thickness: 10,
                outlinewidth: 0
            },
            opacity: 0.7,
            line: { width: 0.5, color: '#0f172a' }
          }
        }]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-slate-500 animate-pulse font-medium">Calculando matrices de rentabilidad...</p>
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
          margin: { t: 10, r: 10, l: 60, b: 50 },
          xaxis: { 
              title: 'Presupuesto (USD)', 
              gridcolor: '#1e293b', 
              zerolinecolor: '#334155',
              tickprefix: '$',
          },
          yaxis: { 
              title: 'Recaudación (USD)', 
              gridcolor: '#1e293b', 
              zerolinecolor: '#334155',
              tickprefix: '$',
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

export default ProfitabilityChart;
