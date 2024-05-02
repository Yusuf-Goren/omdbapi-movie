import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "semantic-ui-react";

import { MovieType } from "../types";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultMovieImg from "../images/movie-default-image.png";

export default function MovieTable({ movieList }: any) {
  const navigate = useNavigate();
  const { page } = useSelector((state: RootState) => state.movie);

  return (
    <Table celled>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Index</TableHeaderCell>
          <TableHeaderCell>Movie Image</TableHeaderCell>
          <TableHeaderCell>Movie Title</TableHeaderCell>
          <TableHeaderCell>Release Date</TableHeaderCell>
          <TableHeaderCell>IMDb ID</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {movieList.map((movie: MovieType, index: number) => (
          <TableRow
            onClick={() => {
              return navigate(`moviepage/${movie.imdbID}`);
            }}
            key={movie.imdbID}
            className={"cursor-pointer" + (index % 2 === 1 ? " active" : "")}
          >
            <TableHeaderCell> {index + 1 + (page - 1) * 10} </TableHeaderCell>
            <TableCell>
              <img
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = defaultMovieImg;
                }}
                src={movie.Poster}
                width={50}
                alt=""
              />
            </TableCell>
            <TableCell> {movie.Title} </TableCell>

            <TableCell>{movie.Year}</TableCell>
            <TableCell>{movie.imdbID}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
