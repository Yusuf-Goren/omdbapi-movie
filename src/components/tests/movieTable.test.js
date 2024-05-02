import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import MovieTable from "../movieTable";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Mocked movie list data
const mockedMovieList = [
  {
    Title: "Movie 1",
    Year: "2001",
    imdbID: "tt001",
  },
  {
    Title: "Movie 2",
    Year: "2002",
    imdbID: "tt002",
  },
];

// Mocked Redux store state
const mockedState = {
  movie: {
    page: 1,
  },
};

// Mock useSelector hook
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

// Mock useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("MovieTable component", () => {
  beforeEach(() => {
    useSelector.mockReturnValue(mockedState);
    useNavigate.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    useSelector.mockReset();
    useNavigate.mockReset();
  });

  it("invokes navigate when table row is clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    const { getByText } = render(
      <Provider
        store={{
          getState: () => mockedState,
          subscribe: () => {},
          dispatch: () => {},
        }}
      >
        <Router>
          <MovieTable movieList={mockedMovieList} />
        </Router>
      </Provider>
    );
    fireEvent.click(getByText("tt001"));
    expect(mockNavigate).toHaveBeenCalledWith(
      `moviepage/${mockedMovieList[0].imdbID}`
    );
  });
});
