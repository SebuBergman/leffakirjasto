import { FIREBASE_DB } from "config/firebase";
import {
  fetchMoviesSuccess,
  fetchMoviesFailure,
  deleteMovieSuccess,
  deleteMovieFailure,
  editMovieFunction,
  addMovieFailure,
  addMovieSuccess,
  searchMovieDbSuccess,
  searchMovieDbFailure,
} from "./MovieSlice";
import {
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  collection,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import { MovieList, SearchResults } from "../types";
import { MOVIEDB_API_KEY } from "@env";

export const fetchMovies = (movieQueryRef: any) => {
  return (dispatch: any) => {
    try {
      // Initialize Firestore subscription
      const unsubscribe = onSnapshot(
        movieQueryRef,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const movieList: any[] = [];
          snapshot.docs.forEach((doc) => {
            movieList.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          dispatch(fetchMoviesSuccess(movieList));
        },
        (error) => {
          // Handle errors from Firestore
          if (error instanceof Error) {
            dispatch(fetchMoviesFailure(error.message));
          }
        }
      );

      // Return unsubscribe function for cleanup
      console.log("returned unsubscribe" + unsubscribe);
      return unsubscribe;
    } catch (error) {
      if (error instanceof Error) {
        dispatch(fetchMoviesFailure(error.message));
      }
      console.error("Error setting up Firestore listener:", error);
      return undefined; // Return undefined if setup fails
    }
  };
};

export const deleteMovie = (id: number) => async (dispatch: any) => {
  try {
    await deleteDoc(doc(FIREBASE_DB, "movies", String(id)));
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(deleteMovieFailure(error.message));
    }
    return error + "Something went wrong";
  }
};

export const editMovie =
  (id: string, newTitle: string) => async (dispatch: any) => {
    try {
      const movieRef = doc(FIREBASE_DB, "movies", id);
      await updateDoc(movieRef, { title: newTitle });
      dispatch(editMovieFunction({ id, newTitle }));
    } catch (error) {
      console.error("Error updating movie: ", error);
    }
  };

export const addMovie = (movie: MovieList) => async (dispatch: any) => {
  const generatedId = movie.id || Number(uuid.v4());
  try {
    await setDoc(doc(FIREBASE_DB, "movies", String(generatedId)), {
      ...movie,
      id: generatedId,
      isExpanded: false,
    });
    dispatch(addMovieSuccess({ ...movie, id: generatedId }));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(addMovieFailure(error.message || "Error adding movie"));
    }
    return error + "Something went wrong";
  }
};

export const searchMovieDB = (keyword: string) => async (dispatch: any) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_API_KEY}&query=${keyword}&include_adult=false`
    );
    const data = await response.json();
    const results: SearchResults[] = data.results.map((item: any) => ({
      original_title: item.original_title,
      id: item.id,
      poster_path: item.poster_path || "",
      release_date: item.release_date,
      overview: item.overview,
    }));
    dispatch(searchMovieDbSuccess(results));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(searchMovieDbFailure(error.message || "Error searching movies"));
    }
    return error + "Something went wrong";
  }
};
