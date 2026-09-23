// Data Service (Simulando llamadas a un Backend API)
// Para el MVP, leemos los archivos JSON estáticos generados por Kedro que copiamos a /public/api

export const fetchGrowthMetrics = async () => {
  try {
    const response = await fetch('/api/rep_yearly_performance.json');
    if (!response.ok) throw new Error('Error en red');
    const data = await response.json();
    
    if (!Array.isArray(data) && data.year_added) {
        const keys = Object.keys(data.year_added); const formattedData = keys.map(k => ({ year_added: data.year_added[k], avg_revenue: data.avg_revenue[k], movies_popularity: data.movies_popularity[k], shows_popularity: data.shows_popularity[k] }));
        return formattedData;
    }
    return data;
  } catch (error) {
    console.error("Error fetching growth metrics:", error);
    return [];
  }
};

export const fetchTopContent = async () => {
  const response = await fetch('/api/rep_top_content.json');
  const data = await response.json();
  
  if (!Array.isArray(data) && data.title) {
      const keys = Object.keys(data.title); const formattedData = keys.map(k => ({ title: data.title[k], type: data.type[k], popularity: data.popularity[k], vote_average: data.vote_average[k] }));
      return formattedData;
  }
  return data;
};

export const fetchAudienceMetrics = async () => {
  const response = await fetch('/api/rep_audience_metrics.json');
  const data = await response.json();
  
  if (!Array.isArray(data) && data.genre) {
      const keys = Object.keys(data.genre); const formattedData = keys.map(k => ({ genre: data.genre[k], avg_popularity: data.avg_popularity[k], count: data.count[k] }));
      return formattedData;
  }
  return data;
};

export const fetchGeoProfitability = async () => {
  const response = await fetch('/api/rep_geo_profitability.json');
  const data = await response.json();
  
  if (!Array.isArray(data) && data.country) {
      const keys = Object.keys(data.country); const formattedData = keys.map(k => ({ country: data.country[k], avg_revenue: data.avg_revenue[k], avg_roi: data.avg_roi[k], count: data.count[k] }));
      return formattedData;
  }
  return data;
};

export const fetchDirectorMetrics = async () => {
  const response = await fetch('/api/rep_director_metrics.json');
  const data = await response.json();
  
  if (!Array.isArray(data) && data.director) {
      const keys = Object.keys(data.director); const formattedData = keys.map(k => ({ director: data.director[k], avg_revenue: data.avg_revenue[k], roi: data.roi[k], count: data.count[k] }));
      return formattedData;
  }
  return data;
};


