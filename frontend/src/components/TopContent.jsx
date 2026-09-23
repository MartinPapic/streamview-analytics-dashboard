import React, { useEffect, useState } from 'react';
import { fetchTopContent } from '../services/api';

const TopContent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopContent().then((jsonData) => {
      // Tomamos los 5 con mayor popularidad absoluta
      const sorted = jsonData.sort((a, b) => b.popularity - a.popularity).slice(0, 5);
      setData(sorted);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="p-4 text-slate-500 animate-pulse text-sm">Cargando ranking mundial...</div>;
  }

  return (
    <div className="space-y-4">
      {data.map((item, i) => (
        <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800/50 hover:border-slate-600 transition-colors cursor-default">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded flex items-center justify-center font-bold ${
              i === 0 ? 'bg-yellow-500/20 text-yellow-500' : 
              i === 1 ? 'bg-slate-400/20 text-slate-400' :
              i === 2 ? 'bg-amber-700/20 text-amber-600' :
              'bg-slate-800 text-slate-500'
            }`}>
              {i + 1}
            </div>
            <div className="ml-3 max-w-[140px] sm:max-w-[200px]">
              <p className="text-sm font-medium text-slate-200 truncate" title={item.title}>{item.title}</p>
              <p className="text-xs text-slate-500">{item.type === 'Movie' ? 'Película' : 'Serie'} • Pop: {item.popularity.toFixed(0)}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-red-400">★ {item.vote_average.toFixed(1)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopContent;
