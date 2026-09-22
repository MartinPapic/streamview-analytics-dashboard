import pandas as pd
import numpy as np

def clean_movies(movies: pd.DataFrame) -> pd.DataFrame:
    """
    Limpia el dataset de películas.
    1. Trata los valores nulos en 'director', 'cast' y 'country'.
    2. Convierte 'date_added' a datetime.
    3. Elimina la columna 'duration' (que está 100% vacía).
    """
    df = movies.copy()
    
    # Rellenar nulos en variables categóricas
    df['director'] = df['director'].fillna("Desconocido")
    df['cast'] = df['cast'].fillna("Desconocido")
    df['country'] = df['country'].fillna("Desconocido")
    df['description'] = df['description'].fillna("Sin descripción")
    
    # Convertir fechas
    df['date_added'] = pd.to_datetime(df['date_added'], errors='coerce')
    
    # La columna 'duration' está 100% vacía en el CSV original. La eliminamos.
    if 'duration' in df.columns and df['duration'].isnull().all():
        df = df.drop(columns=['duration'])
        
    return df

def clean_shows(shows: pd.DataFrame) -> pd.DataFrame:
    """
    Limpia el dataset de series.
    1. Trata los valores nulos categóricos.
    2. Convierte 'date_added' a datetime.
    3. Extrae el número de temporadas de la columna 'duration'.
    """
    df = shows.copy()
    
    # Rellenar nulos
    df['director'] = df['director'].fillna("Desconocido")
    df['cast'] = df['cast'].fillna("Desconocido")
    df['country'] = df['country'].fillna("Desconocido")
    df['description'] = df['description'].fillna("Sin descripción")
    
    # Convertir fechas
    df['date_added'] = pd.to_datetime(df['date_added'], errors='coerce')
    
    # Extraer número de temporadas de 'duration' (ej: "3 Seasons" -> 3)
    if 'duration' in df.columns:
        df['seasons'] = df['duration'].str.extract(r'(\d+)').astype(float)
        df = df.drop(columns=['duration'])
        
    return df
