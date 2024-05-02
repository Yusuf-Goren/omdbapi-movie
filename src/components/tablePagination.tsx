import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "semantic-ui-react";

import { AppDispatch, RootState } from "../state/store";
import { changePage } from "../state/movie/movieSlice";

export default function TablePagination() {
  const dispatch = useDispatch<AppDispatch>();
  const { page, maxPageSize } = useSelector((state: RootState) => state.movie);

  return (
    <Pagination
      defaultActivePage={page}
      totalPages={maxPageSize}
      onPageChange={(event, data) => dispatch(changePage(data.activePage))}
    />
  );
}
