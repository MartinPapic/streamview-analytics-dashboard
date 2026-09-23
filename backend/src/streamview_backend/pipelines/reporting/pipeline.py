from kedro.pipeline import Pipeline, node, pipeline
from .nodes import build_yearly_performance, build_profitability_metrics, build_top_popular_content, build_audience_metrics, build_geo_profitability, build_director_metrics

def create_pipeline(**kwargs) -> Pipeline:
    return pipeline(
        [
            node(
                func=build_yearly_performance,
                inputs=["int_movies", "int_shows"],
                outputs="rep_yearly_performance",
                name="build_yearly_performance_node",
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
            node(
                func=build_audience_metrics,
                inputs=["int_movies", "int_shows"],
                outputs="rep_audience_metrics",
                name="build_audience_metrics_node",
            ),
            node(
                func=build_geo_profitability,
                inputs=["int_movies"],
                outputs="rep_geo_profitability",
                name="build_geo_profitability_node",
            ),
            node(
                func=build_director_metrics,
                inputs=["int_movies"],
                outputs="rep_director_metrics",
                name="build_director_metrics_node",
            ),
        ]
    )
