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
                vote_average: jsonData.vote_average[k],
                popularity: jsonData.popularity[k]
            }));
        }

        const sample = parsed.sort((a,b) => b.budget - a.budget).slice(0, 200);
        
        // Atributo preatentivo: Tamao por nivel de interaccin (popularidad)
        const maxPop = Math.max(...sample.map(d => d.popularity));
        const minPop = Math.min(...sample.map(d => d.popularity));

        setData([{
          x: sample.map(d => d.budget),
          y: sample.map(d => d.revenue),
          text: sample.map(d => "<b>" + d.title + "</b><br>Interacción (Pop): " + d.popularity.toFixed(0) + "<br>Rentabilidad (Color): " + d.vote_average.toFixed(1)),
          hoverinfo: 'text',
          mode: 'markers',
          type: 'scattergl',
          marker: {
            size: sample.map(d => 6 + ((d.popularity - minPop) / (maxPop - minPop)) * 14), 
            color: sample.map(d => d.roi < 0 ? '#ef4444' : '#14b8a6'), showscale: false,
            opacity: 0.65,
            line: { width: 0.5, color: '#18181b' }
          }
        }]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-zinc-500 animate-pulse font-medium">Calculando matrices de interaccin...</p>
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
          margin: { t: 10, r: 10, l: 60, b: 50 },
          xaxis: { 
              title: 'Presupuesto (USD)', 
              gridcolor: '#27272a', 
              zerolinecolor: '#3f3f46',
              tickprefix: '$',
          },
          yaxis: { 
              title: 'Recaudacin (USD)', 
              gridcolor: '#27272a', 
              zerolinecolor: '#3f3f46',
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


