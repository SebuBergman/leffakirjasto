import React from "react";
import AddMovie from "../../features/movieList/components/AddMovie/AddMovie";
import AddTvShow from "features/tvShowList/components/AddTvShow";

export default function AddMovieScreen() {
  // Use filteredMovieList if there is a search query, otherwise fallback to the full movieList
  return (
    <>
      <AddTvShow />
      <AddMovie />
    </>
  );
}
