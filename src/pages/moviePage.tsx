import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "../components/movieCard";
import { useFetchSingleMovie } from "../hooks/useFetchSingleMovie";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { changeImdbId } from "../state/movie/movieSlice";
import { BeatLoader } from "react-spinners";
import noData from "../images/no-data-concept-illustration_114360-536.avif";
import { Button } from "semantic-ui-react";

export default function MoviePage() {
  const { movieImdbId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  dispatch(changeImdbId(movieImdbId));
  const { isLoading } = useSelector((state: RootState) => state.movie);
  const movie = useFetchSingleMovie();

  return (
    <div>
      <div className="return-button">
        <Button
          onClick={() => {
            return navigate(`/`);
          }}
          color="blue"
        >
          Return Home Page
        </Button>
      </div>
      <div className="filter">
        {isLoading && (
          <div className="spinner">
            <BeatLoader color="#36d7b7" />
          </div>
        )}

        {movie.movie.Title && !isLoading && <MovieCard movie={movie.movie} />}
        {!movie.movie.Title && !isLoading && (
          <div>
            <div className="no-data-text">"Invalid ImDb Key"</div>
            <img height={500} src={noData} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
