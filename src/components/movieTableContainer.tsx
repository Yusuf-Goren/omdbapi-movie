import React from "react";
import MovieTable from "./movieTable";
import TablePagination from "./tablePagination";
import { useFetchMovies } from "../hooks/useFetchMovies";
import SearchFilters from "./searchFilters";
import noData from "../images/no-data-concept-illustration_114360-536.avif";

export default function MovieTableContainer() {
  const { movieList, isError, errorStatus, searchType, isLoading } =
    useFetchMovies();
  return (
    <>
      <SearchFilters />
      {!isError && !isLoading && movieList && movieList.length > 0 && (
        <div>
          <MovieTable movieList={movieList} />
          <div className="table-pagination-container">
            <TablePagination />
          </div>
        </div>
      )}
      {isError &&
        !errorStatus &&
        !isLoading &&
        (!movieList || movieList.length === 0) && (
          <div>
            <div className="no-data-text">
              There is no {searchType} with these filters.
            </div>
            <img src={noData} alt="nodata" />
          </div>
        )}

      {isError && errorStatus && (
        <div>
          <div className="no-data-text">
            {errorStatus === "Request failed with status code 401"
              ? "Invalid API Key"
              : "An unexpected error occurred. Please try again."}
          </div>
          <img height={500} src={noData} alt="" />
        </div>
      )}
    </>
  );
}
