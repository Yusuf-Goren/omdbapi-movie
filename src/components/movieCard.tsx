import star from "../images/star.png";
import defaultMovieImg from "../images/movie-default-image.png";

export default function MovieCard(movie: any) {
  console.log(movie);
  return (
    <div className="movie-card">
      <div className="img-movie">
        <img
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = defaultMovieImg;
          }}
          src={movie.movie.Poster}
          alt={movie.movie.Title}
        />
      </div>
      <div className="img-movie">
        <div className="movie-title"> {movie.movie.Title} </div>
        <div className="general-data">
          <div> {movie.movie.Runtime} </div>

          <div className="rating">
            | <img src={star} alt="star" width={25} /> {movie.movie.imdbRating}
          </div>

          <div> | {movie.movie.Year} </div>
        </div>
        <div className="movie-text">
          <div className="movie-text-title"> Genres</div>
          <div>{movie.movie.Genre}</div>
        </div>
        <div className="movie-text">
          <div className="movie-text-title"> Director</div>
          <div>{movie.movie.Director}</div>
        </div>

        <div className="movie-text">
          <div className="movie-text-title"> Actors </div>
          <div> {movie.movie.Actors} </div>
        </div>
        <div className="movie-text">
          <div className="movie-text-title"> Plot </div>
          <div> {movie.movie.Plot} </div>
        </div>
      </div>
    </div>
  );
}
