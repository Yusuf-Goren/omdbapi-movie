import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import React, { useEffect } from "react";
import { fetchSingleMovie } from "../state/movie/movieSlice";

export const useFetchSingleMovie = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { movie, isLoading, isError, movieImdbId } = useSelector(
        (state: RootState) => state.movie
    )

    const fetchData = () => {
        dispatch(fetchSingleMovie(movieImdbId));
    }
    useEffect(() => {

        fetchData()
    }, [movieImdbId]);

    return { movie, isLoading, isError, fetchData };
};