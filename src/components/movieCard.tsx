import star from "../images/star.png";

export default function MovieCard(movie: any) {
  return (
    <div className="movie-card">
      <div className="img-movie">
        <img src={movie.movie.Poster} alt={movie.movie.Title} />
      </div>
      <div className="img-movie">
        <div className="movie-title"> {movie.movie.Title} </div>
        <div className="general-data">
          <div> {movie.movie.Runtime} |</div>

          {movie.movie.imdbRating > 0 && (
            <div className="rating">
              <img src={star} alt="star" width={25} /> {movie.movie.imdbRating}
            </div>
          )}

          <div> | {movie.movie.Year} </div>
        </div>
        <div className="movie-text">
          <div> Genres</div>
          <div>{movie.movie.Genre}</div>
        </div>
        <div className="movie-text">
          <div> Director</div>
          <div>{movie.movie.Director}</div>
        </div>

        <div className="movie-text">
          <div> Actors </div>
          <div> {movie.movie.Actors} </div>
        </div>
        <div className="movie-text">
          <div> Plot </div>
          <div> {movie.movie.Plot} </div>
        </div>
      </div>
    </div>
  );
}
