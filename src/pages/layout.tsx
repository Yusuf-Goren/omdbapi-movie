import React from "react";
import MovieTableContainer from "../components/movieTableContainer";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { BeatLoader } from "react-spinners";
import noData from "../images/no-data-concept-illustration_114360-536.avif";

export default function Layout() {
  const { isLoading } = useSelector((state: RootState) => state.movie);
  return (
    <>
      <MovieTableContainer />
      {isLoading && (
        <div className="spinner">
          <BeatLoader color="#36d7b7" />
        </div>
      )}
    </>
  );
}
