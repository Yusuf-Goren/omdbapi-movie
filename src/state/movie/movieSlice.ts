import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieType, SingleMovieType, initialStateSingleMovieType } from "../../types";
import axios from "axios";
import { apiKey, movieApi } from "../../utils/consts";

interface MovieState {
    movieList: MovieType[],
    searchName: string;
    searchYear: number;
    searchType: "movie" | "series" | "episode",
    isLoading: boolean,
    isError: boolean,
    page: number,
    maxPageSize: number,
    movie: SingleMovieType,
    movieImdbId: string
}

const initialState: MovieState = {
    movieList: [],
    searchName: "Pokemon",
    searchYear: 0,
    searchType: "movie",
    isLoading: false,
    isError: false,
    page: 1,
    maxPageSize: 1,
    movie: initialStateSingleMovieType,
    movieImdbId: ""
}

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        changePage: (state, action) => {
            if (action.payload > 0 && action.payload <= state.maxPageSize) {
                state.page = action.payload
            }
        },
        changeFilter: (state, action) => {
            const { searchName, searchType, searchYear } = action.payload
            state.searchName = searchName
            state.searchType = searchType
            state.searchYear = searchYear
        },
        changeImdbId: (state, action) => {
            state.movieImdbId = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesWithFilters.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMoviesWithFilters.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movieList = action.payload.Search;
            state.maxPageSize = Math.ceil(action.payload.totalResults / 10)
            state.movie = initialStateSingleMovieType
        })
        builder.addCase(fetchMoviesWithFilters.rejected, (state, action) => {
            state.isError = true;
        })
        builder.addCase(fetchSingleMovie.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSingleMovie.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movie = action.payload;

        })
        builder.addCase(fetchSingleMovie.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false
        })
    }
})

export const { changePage, changeFilter, changeImdbId } = movieSlice.actions

export default movieSlice.reducer

export const fetchMoviesWithFilters = createAsyncThunk(
    "fetchMoviesWithFilters",

    async (filter: any) => {
        const { page, searchType, searchName, searchYear } = filter

        let apiUrl = `${movieApi}/?s=${searchName}&apikey=${apiKey}&page=${page}`;
        if (searchYear > 0) {
            apiUrl += `&y=${searchYear}`;
        }

        if (searchType) {
            apiUrl += `&type=${searchType}`
        }

        const response = await axios.get(apiUrl)
        return response.data
    }
)

export const fetchSingleMovie = createAsyncThunk(
    "fetchSingleMovie",

    async (imdbId: any) => {

        let apiUrl = `${movieApi}/?i=${imdbId}&apikey=${apiKey}`;

        const response = await axios.get(apiUrl)

        return response.data
    }
)