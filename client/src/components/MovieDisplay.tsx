interface MovieData{
  id: string;
  title: string;
  thumbnail_ext: string;
  video_ext: string;
}

type MovieDataProps = {
    movie_data: MovieData;
}

function MovieDisplay({movie_data}: MovieDataProps){
    return (
        <div className="card text-bg-light mb-3" style={{width: "18rem"}}>
            <img src={`/api/movies/thumbnails/${movie_data.id}?extension=${movie_data.thumbnail_ext}`} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{movie_data.title}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
            </div>
        </div>
    );
}

export default MovieDisplay;
