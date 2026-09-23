import pandas as pd

def build_yearly_performance(movies: pd.DataFrame, shows: pd.DataFrame) -> pd.DataFrame:
    """Calcula el rendimiento promedio por año (Recaudación Promedio y Popularidad)."""
    m = movies.dropna(subset=['date_added']).copy()
    s = shows.dropna(subset=['date_added']).copy()
    
    m['year_added'] = m['date_added'].dt.year.astype(int)
    s['year_added'] = s['date_added'].dt.year.astype(int)
    
    # Recaudación promedio por año (solo películas que tengan revenue)
    m_rev = m[m['revenue'] > 0].groupby('year_added')['revenue'].mean().reset_index(name='avg_revenue')
    
    # Popularidad promedio
    m_pop = m.groupby('year_added')['popularity'].mean().reset_index(name='movies_popularity')
    s_pop = s.groupby('year_added')['popularity'].mean().reset_index(name='shows_popularity')
    
    # Unir todo
    perf = pd.merge(m_rev, m_pop, on='year_added', how='outer')
    perf = pd.merge(perf, s_pop, on='year_added', how='outer').fillna(0)
    
    perf = perf.sort_values('year_added').reset_index(drop=True)
    return perf

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

def build_audience_metrics(movies: pd.DataFrame, shows: pd.DataFrame) -> pd.DataFrame:
    df = pd.concat([movies[['genres', 'popularity']], shows[['genres', 'popularity']]]).dropna()
    df['genre'] = df['genres'].str.split(', ')
    df = df.explode('genre')
    genres = df.groupby('genre').agg(
        avg_popularity=('popularity', 'mean'),
        count=('popularity', 'size')
    ).reset_index()
    top_genres = genres[genres['count'] > 50].sort_values('avg_popularity', ascending=True).tail(10)
    return top_genres

def build_geo_profitability(movies: pd.DataFrame) -> pd.DataFrame:
    m = movies.dropna(subset=['country', 'revenue', 'budget']).copy()
    m = m[(m['revenue'] > 0) & (m['budget'] > 0)]
    
    m['country_single'] = m['country'].str.split(', ')
    m = m.explode('country_single')
    
    geo = m.groupby('country_single').agg(
        avg_revenue=('revenue', 'mean'),
        avg_budget=('budget', 'mean'),
        count=('title', 'size')
    ).reset_index()
    
    geo['avg_roi'] = (geo['avg_revenue'] - geo['avg_budget']) / geo['avg_budget']
    
    geo = geo[geo['count'] >= 10].sort_values('avg_revenue', ascending=False)
    geo = geo.rename(columns={'country_single': 'country'})
    return geo

def build_director_metrics(movies: pd.DataFrame) -> pd.DataFrame:
    m = movies.dropna(subset=['director', 'revenue', 'budget']).copy()
    m = m[(m['revenue'] > 0) & (m['budget'] > 0)]
    
    dirs = m.groupby('director').agg(
        avg_revenue=('revenue', 'mean'),
        avg_budget=('budget', 'mean'),
        count=('title', 'size')
    ).reset_index()
    
    top_dirs = dirs.sort_values('avg_revenue', ascending=False).head(10)
    top_dirs['roi'] = (top_dirs['avg_revenue'] - top_dirs['avg_budget']) / top_dirs['avg_budget']
    
    return top_dirs
