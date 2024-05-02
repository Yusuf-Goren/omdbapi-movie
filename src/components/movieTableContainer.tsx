import React from "react";
import MovieTable from "./movieTable";
import TablePagination from "./tablePagination";
import { useFetchMovies } from "../hooks/useFetchMovies";
import SearchFilters from "./searchFilters";

export default function MovieTableContainer() {
  const { movieList } = useFetchMovies();

  return (
    <>
      {/* <BeatLoader loading color="#36d7b7" /> */}
      <SearchFilters />
      {movieList && movieList.length > 0 ? (
        <div>
          <MovieTable movieList={movieList} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <TablePagination />
          </div>
        </div>
      ) : (
        <div> There is no record with this filters </div>
      )}
    </>
  );
}
