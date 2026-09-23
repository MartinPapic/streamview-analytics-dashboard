import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchGeoProfitability } from '../services/api';

const GeoChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGeoProfitability().then((jsonData) => {
      const countries = jsonData.map(d => d.country);
      const rois = jsonData.map(d => d.avg_roi * 100); // to percentage
      const texts = jsonData.map(d => `${d.country}<br>ROI: ${(d.avg_roi * 100).toFixed(0)}%<br>Títulos: ${d.count}`);

      setData([
        {
          type: 'choropleth',
          locationmode: 'country names',
          locations: countries,
          z: rois,
          text: texts,
          hoverinfo: 'text',
          colorscale: 'Reds',
          autocolorscale: false,
          colorbar: {
            title: { text: 'ROI (%)', font: { color: '#94a3b8' } },
            tickfont: { color: '#94a3b8' },
            thickness: 10,
            outlinewidth: 0
          },
          marker: {
            line: {
              color: '#0f172a',
              width: 0.5
            }
          }
        }
      ]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-slate-500 animate-pulse font-medium">Cargando mapa global...</p>
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
          margin: { t: 0, r: 0, l: 0, b: 0 },
          geo: {
            showframe: false,
            showcoastlines: true,
            coastlinecolor: '#1e293b',
            projection: { type: 'equirectangular' },
            bgcolor: 'rgba(0,0,0,0)',
            showland: true,
            landcolor: '#1e293b',
            showocean: true,
            oceancolor: 'rgba(0,0,0,0)',
            showlakes: false
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

export default GeoChart;
