from kedro.pipeline import Pipeline, node, pipeline
from .nodes import clean_movies, clean_shows

def create_pipeline(**kwargs) -> Pipeline:
    return pipeline(
        [
            node(
                func=clean_movies,
                inputs="raw_movies",
                outputs="int_movies",
                name="clean_movies_node",
            ),
            node(
                func=clean_shows,
                inputs="raw_shows",
                outputs="int_shows",
                name="clean_shows_node",
            ),
        ]
    )
