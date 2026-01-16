from fastapi import FastAPI, status
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
import src.database as db
from src.routers import movie_router


app = FastAPI()


@app.on_event("startup")
def startup_event():
    db.init()
    print("Database init done!")


app.include_router(movie_router)


@app.get("/add_movie", status_code=status.HTTP_200_OK)
def search_movie():
    return RedirectResponse(url="/", status_code=status.HTTP_302_FOUND)


app.mount("/", StaticFiles(directory="../client/dist", html=True), name="client")
