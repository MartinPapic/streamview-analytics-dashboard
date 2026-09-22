from kedro.pipeline import Pipeline, node, pipeline
from .nodes import build_growth_metrics, build_profitability_metrics, build_top_popular_content

def create_pipeline(**kwargs) -> Pipeline:
    return pipeline(
        [
            node(
                func=build_growth_metrics,
                inputs=["int_movies", "int_shows"],
                outputs="rep_growth_metrics",
                name="build_growth_metrics_node",
            ),
            node(
                func=build_profitability_metrics,
                inputs="int_movies",
                outputs="rep_profitability_metrics",
                name="build_profitability_metrics_node",
            ),
            node(
                func=build_top_popular_content,
                inputs=["int_movies", "int_shows"],
                outputs="rep_top_content",
                name="build_top_popular_content_node",
            ),
        ]
    )
