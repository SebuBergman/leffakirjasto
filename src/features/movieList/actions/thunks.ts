import { FIREBASE_DB } from "config/firebase";
import {
  fetchMoviesSuccess,
  fetchMoviesFailure,
  deleteMovieSuccess,
  deleteMovieFailure,
  editMovieSuccess,
  addMovieFailure,
  addMovieSuccess,
  searchMoviesSuccess,
  searchMoviesFailure,
} from "./actions";
import {
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  deleteDoc,
  DocumentReference,
  doc,
  updateDoc,
  setDoc,
  collection,
} from "firebase/firestore";
import uuid from "react-native-uuid";
import { MovieList, SearchResults } from "../types";
import { MOVIEDB_API_KEY } from "@env";

// Thunk for fetching movies in the Firestore collection
export const fetchMovies = (movieQueryRef: any) => {
  return (dispatch: any) => {
    try {
      const subscriber = onSnapshot(
        movieQueryRef,
        (snapshot: QuerySnapshot<DocumentData>) => {
          // Ensure that snapshot is a QuerySnapshot
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
          dispatch(fetchMoviesFailure(error));
        }
      );

      return () => subscriber();
    } catch (error) {
      dispatch(fetchMoviesFailure(error));
    }
  };
};

// Thunk for deleting movie from Firestore collection
export const deleteMovie = (item: DocumentReference<unknown, DocumentData>) => {
  return async (dispatch: any) => {
    try {
      await deleteDoc(doc(FIREBASE_DB, "movies", item.id));
      dispatch(deleteMovieSuccess(item.id));
    } catch (error) {
      dispatch(deleteMovieFailure(error));
    }
  };
};

// Thunk for editing movie titles in Firestore
export const editMovie = (id: string, newTitle: string) => {
  return async (dispatch: any) => {
    try {
      const movieRef = doc(FIREBASE_DB, "movies", id);
      await updateDoc(movieRef, {
        title: newTitle,
      });
      dispatch(editMovieSuccess(id, newTitle));
    } catch (error) {
      console.error("Error updating movie: ", error);
    }
  };
};

// Thunk for adding new movies to Firestore collection
export const addMovie = (movie: MovieList) => {
  return async (dispatch: any) => {
    const generatedId = movie.id || uuid.v4();
    try {
      await setDoc(doc(FIREBASE_DB, "movies", `${movie.id}`), {
        title: movie.title,
        id: movie.id,
        imageSrc: movie.imageSrc,
        releaseDate: movie.releaseDate,
        isExpanded: false,
      });
      dispatch(addMovieSuccess({ ...movie, id: movie.id }));
    } catch (error) {
      console.error("Error adding movie: ", error);
      dispatch(addMovieFailure(error));
    }
  };
};

// Thunk for subscribing to Firestore movies collection
export const subscribeToMovies = () => {
  return (dispatch: any) => {
    const collectionRef = collection(FIREBASE_DB, "movies");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedMovieList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(fetchMoviesSuccess(updatedMovieList)); // Dispatch fetched movies to the state
    });

    return unsubscribe; // Return unsubscribe for clean up
  };
};

// Thunk for searching movies using The Movie DB API
export const searchMovieDB = (keyword: string) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
      );
      const data = await response.json();

      console.log(data);
      if (!data.results || data.results.length === 0) {
        dispatch(searchMoviesSuccess([]));
        return;
      }

      // Map the API response to the SearchResults state
      const mappedResults: SearchResults[] = data.results.map((item: any) => ({
        original_title: item.original_title,
        id: item.id,
        poster_path: item.poster_path,
        release_date: item.release_date,
        overview: item.overview,
      }));

      dispatch(searchMoviesSuccess(mappedResults));
    } catch (error) {
      console.error("Error searching movies: ", error);
      dispatch(searchMoviesFailure(error));
    }
  };
};
