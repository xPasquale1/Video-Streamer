import sqlite3
import os
from .models import MovieData


DB_PATH: str = "./data"
DB_PATH_AND_FILE: str = "./data/movie_data.db"


def get_connection():
    return sqlite3.connect(DB_PATH_AND_FILE)


def init():
    os.makedirs(DB_PATH, exist_ok=True)
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS movies (
                id TEXT PRIMARY KEY,
                title TEXT,
                thumbnail_ext TEXT,
                video_ext TEXT
            )
        """)


def add_movie(movie_data: MovieData):
    with get_connection() as conn:
        conn.execute(
            """
            INSERT INTO movies (id, title, thumbnail_ext, video_ext)
            VALUES (?, ?, ?, ?)
            """,
            (movie_data.id, movie_data.title, movie_data.thumbnail_ext, movie_data.video_ext)
        )


def search_movie(title: str) -> list[MovieData]:
    with get_connection() as conn:
        cursor = conn.execute(
            """
            SELECT id, title, thumbnail_ext, video_ext
            FROM movies
            WHERE title LIKE ?
            COLLATE NOCASE
            LIMIT 12
            """,
            (f"%{title}%",)
        )

        return [MovieData(*row) for row in cursor.fetchall()]


def get_random() -> list[MovieData]:
    with get_connection() as conn:
        cursor = conn.execute(
            """
            SELECT id, title, thumbnail_ext, video_ext
            FROM movies
            ORDER BY RANDOM()
            LIMIT 12
            """
        )

        return [MovieData(*row) for row in cursor.fetchall()]
