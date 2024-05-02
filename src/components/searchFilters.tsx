import React, { useState } from "react";
import { Button, Input, Select } from "semantic-ui-react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import { searchTypeMenu } from "../utils/consts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { changeFilter } from "../state/movie/movieSlice";

export default function SearchFilters() {
  const { isLoading } = useFetchMovies();
  const dispatch = useDispatch<AppDispatch>();
  const { searchType, searchName, searchYear } = useSelector(
    (state: RootState) => state.movie
  );
  const [searchFilter, setSearchFilter] = useState({
    searchName: searchName,
    searchYear: searchYear,
    searchType: searchType,
  });
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      title: { value: string };
      year: { value: string };
    };
    let tempSearchFilter = searchFilter;
    tempSearchFilter.searchName = target.title.value;
    tempSearchFilter.searchYear = Number(target.year.value);

    setSearchFilter(tempSearchFilter);
    dispatch(changeFilter(tempSearchFilter));
  };
  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <div className="filter-container">
        <div className="filter">
          <label>Filter with name</label>
          <Input
            defaultValue={searchFilter.searchName}
            name="title"
            loading={isLoading}
            icon="search"
            placeholder="Search..."
          />
        </div>
        <div className="filter">
          <label>Filter with release year</label>
          <Input
            defaultValue={searchFilter.searchYear || ""}
            type="number"
            name="year"
            loading={isLoading}
            icon="search"
            placeholder="Search..."
          />
        </div>
        <div className="filter">
          <label>Filter with type</label>
          <Select
            onChange={(e, result) => {
              let searchTypeTemp: "movie" | "series" | "episode";
              if (
                result.value === "movie" ||
                result.value === "series" ||
                result.value === "episode"
              ) {
                searchTypeTemp = result.value;
              }
              setSearchFilter((prev) => ({
                ...prev,
                searchType: searchTypeTemp,
              }));
            }}
            clearable
            defaultValue={searchFilter.searchType || ""}
            placeholder="Select your search type"
            options={searchTypeMenu}
          />
        </div>
        <div className="filter">
          <Button color="blue"> Search </Button>
        </div>
      </div>
    </form>
  );
}
