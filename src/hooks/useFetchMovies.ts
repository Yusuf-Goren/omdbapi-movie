import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import React, { useEffect } from "react";
import { fetchMoviesWithFilters } from "../state/movie/movieSlice";

export const useFetchMovies = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { movieList, isLoading, isError, errorStatus, page, searchType, searchName, searchYear } = useSelector(
        (state: RootState) => state.movie
    )

    const fetchData = () => {
        dispatch(fetchMoviesWithFilters({ page, searchType, searchName, searchYear }));
    }
    useEffect(() => {

        fetchData()
    }, [page, searchType, searchName, searchYear]);

    return { movieList, isLoading, isError, errorStatus, searchType, fetchData };
};