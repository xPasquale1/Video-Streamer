import { useState } from "react";
import MovieDisplay from "../components/MovieDisplay";
import SearchBar from "../components/SearchBar";

interface MovieData{
  id: string;
  title: string;
  thumbnail_ext: string;
  video_ext: string;
}

function HomePage(){
    const [movies, setMovies] = useState<MovieData[]>([])

    const requestTitles = async (searchTitle: string) => {
        try{
            const result = await fetch(`/api/movies/search?title=${encodeURIComponent(searchTitle)}`);
            if(!result.ok){
                throw new Error(`Response status: ${result.status}`);
            }
            const data: MovieData[] = await result.json();
            setMovies(data);
        } catch (error){
            console.log(error);
        }
    }

    const requestRandom = async () => {
        try{
            const result = await fetch("/api/movies/random");
            if(!result.ok){
                throw new Error(`Response status: ${result.status}`);
            }
            const data: MovieData[] = await result.json();
            setMovies(data);
        } catch (error){
            console.log(error);
        }
    }
    
    const onSearchTitle = (title: string) => {
        requestTitles(title);
    };
    
    const onSearchTitleChanged = (title: string) => {
        if(title.length <= 0){
            requestRandom();
        }else{
            requestTitles(title);
        }
    };

    return (
        <div className="container">
            <SearchBar onSearch={onSearchTitle} onSearchChanged={onSearchTitleChanged}></SearchBar>
            <div className="mb-4"></div>
            <div className="row gx-2">
                {movies.map((movieData, index) => {return (
                    <div className="col-auto" key={index}>
                        <MovieDisplay movie_data={movieData} key={index}></MovieDisplay>
                    </div>
                );})}
            </div>
        </div>
    );
}

export default HomePage;
