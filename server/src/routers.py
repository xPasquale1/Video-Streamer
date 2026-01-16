import os
import uuid
import shutil
from fastapi import APIRouter, Form, UploadFile, File, HTTPException, status
from fastapi.responses import FileResponse, RedirectResponse
from . import database as db
from .models import MovieData


VIDEO_FILES_DIR: str = "./data/video_files"
THUMBNAIL_FILES_DIR: str = "./data/thumbnails"

web_type_to_extension_lookup: dict[str, str] = {
    "video/mp4": ".mp4",
    "video/webm": ".webm",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp"
}

extension_to_web_type_lookup: dict[str, str] = {
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp"
}


movie_router = APIRouter(prefix="/api/movies", tags=["movies"])


@movie_router.get("/search", status_code=status.HTTP_200_OK)
def search_movie(title: str):
    movies: list[MovieData] = db.search_movie(title)
    return [movie.to_dict() for movie in movies]


@movie_router.get("/random", status_code=status.HTTP_200_OK)
def get_random():
    movies: list[MovieData] = db.get_random()
    return [movie.to_dict() for movie in movies]


@movie_router.post("/add", status_code=201)
async def add_movie(title: str = Form(...), video: UploadFile = File(...), thumbnail: UploadFile = File(...)):
    try:
        data_id = str(uuid.uuid4())
        movie_file_type = web_type_to_extension_lookup[video.content_type]
        thumbnail_file_type = web_type_to_extension_lookup[thumbnail.content_type]

        movie_file_path_relativ = "/" + data_id + movie_file_type
        thumbnail_file_path_relativ = "/" + data_id + thumbnail_file_type

        with open(VIDEO_FILES_DIR + movie_file_path_relativ, "wb") as file:
            shutil.copyfileobj(video.file, file)
            file.close()
        
        with open(THUMBNAIL_FILES_DIR + thumbnail_file_path_relativ, "wb") as file:
            shutil.copyfileobj(thumbnail.file, file)
            file.close()
        
        movie_data: MovieData = MovieData(data_id, title, thumbnail_file_type, movie_file_type)

        db.add_movie(movie_data)
    except Exception as e:
        print(e)
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, "Failed to add movie"
        )


@movie_router.get("/thumbnails/{thumbnail_id}")
def get_thumbnail(thumbnail_id: str, extension: str):
    file_path = THUMBNAIL_FILES_DIR + "/" + thumbnail_id + extension

    if not os.path.isfile(file_path):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Thumbnail not found")

    return FileResponse(
        file_path,
        media_type=extension_to_web_type_lookup[extension]
    )


@movie_router.get("/movies/{movie_id}")
def get_thumbnail(movie_id: str, extension: str):
    file_path = VIDEO_FILES_DIR + "/" + movie_id + extension

    if not os.path.isfile(file_path):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Movie not found")

    return FileResponse(
        file_path,
        media_type=extension_to_web_type_lookup[extension]
    )
