import React from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/movieCard";
import { useFetchSingleMovie } from "../hooks/useFetchSingleMovie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { changeImdbId } from "../state/movie/movieSlice";
import { BeatLoader } from "react-spinners";

export default function MoviePage() {
  const { movieImdbId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  dispatch(changeImdbId(movieImdbId));
  const { isLoading } = useSelector((state: RootState) => state.movie);
  const movie = useFetchSingleMovie();
  {
    console.log(movie.movie);
  }

  return (
    <div className="filter">
      {isLoading && (
        <div className="spinner">
          <BeatLoader color="#36d7b7" />
        </div>
      )}
      {movie.movie.Title && <MovieCard movie={movie.movie} />}
    </div>
  );
}
