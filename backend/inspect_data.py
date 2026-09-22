import pandas as pd

movies_path = r'C:\Users\mapap\Desktop\sexto semestre\visualización de datos\parcial 1\streamview-dashboard\backend\data\01_raw\netflix_movies_detailed_up_to_2025.csv'
shows_path = r'C:\Users\mapap\Desktop\sexto semestre\visualización de datos\parcial 1\streamview-dashboard\backend\data\01_raw\netflix_tv_shows_detailed_up_to_2025.csv'

movies = pd.read_csv(movies_path)
shows = pd.read_csv(shows_path)

print('--- MOVIES INFO ---')
movies.info()

print('\n--- SHOWS INFO ---')
shows.info()

print('\n--- MOVIES SAMPLE ---')
print(movies.head(1).T)
