import pandas as pd

def build_growth_metrics(movies: pd.DataFrame, shows: pd.DataFrame) -> pd.DataFrame:
    """Calcula el número de títulos añadidos por año."""
    m = movies.dropna(subset=['date_added']).copy()
    s = shows.dropna(subset=['date_added']).copy()
    
    m['year_added'] = m['date_added'].dt.year.astype(int)
    s['year_added'] = s['date_added'].dt.year.astype(int)
    
    m_counts = m.groupby('year_added').size().reset_index(name='movies_added')
    s_counts = s.groupby('year_added').size().reset_index(name='shows_added')
    
    growth = pd.merge(m_counts, s_counts, on='year_added', how='outer').fillna(0)
    growth = growth.sort_values('year_added').reset_index(drop=True)
    return growth

def build_profitability_metrics(movies: pd.DataFrame) -> pd.DataFrame:
    """Prepara un dataset de películas con budget y revenue válidos para análisis financiero."""
    profit = movies[(movies['budget'] > 0) & (movies['revenue'] > 0)].copy()
    profit['roi'] = (profit['revenue'] - profit['budget']) / profit['budget']
    
    # Mantener solo columnas clave para que el frontend no pese mucho
    cols = ['title', 'release_year', 'popularity', 'vote_average', 'budget', 'revenue', 'roi']
    return profit[cols].reset_index(drop=True)

def build_top_popular_content(movies: pd.DataFrame, shows: pd.DataFrame) -> pd.DataFrame:
    """Retorna el Top 20 de contenido más popular (10 pelis, 10 series)."""
    top_m = movies.nlargest(10, 'popularity')[['title', 'type', 'popularity', 'vote_average', 'country']]
    top_s = shows.nlargest(10, 'popularity')[['title', 'type', 'popularity', 'vote_average', 'country']]
    return pd.concat([top_m, top_s]).reset_index(drop=True)
