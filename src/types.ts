export type MovieState = {
    movieList: MovieType[],
    isLoading: boolean,
    isError: boolean,
    page: number,
    maxPageSize: number,
    searchType: string,
    searchYear: number,
    searchName: string
};

export type MovieType = {
    Poster: string | undefined;
    Title: string,
    Year: string,
    imdbID: string

};

export type FilterType = {
    page: number,
    searchType: string,
    searchName: string,
    searchYear: number
}

export type SingleMovieType = {
    Title: string,
    Actors: string,
    Plot: string,
    Year: string,
    ImdbID: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Cast: string,
    imdbRating: number,
    Poster: string
};


export const initialStateSingleMovieType: SingleMovieType = {
    Title: "",
    Actors: "",
    Plot: "",
    Year: "",
    ImdbID: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Cast: "",
    imdbRating: 0,
    Poster: ""
};