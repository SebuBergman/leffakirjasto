import { FIREBASE_DB } from "config/firebase";
import {
  fetchMoviesSuccess,
  fetchMoviesFailure,
  deleteMovieSuccess,
  deleteMovieFailure,
  editMovieSuccess,
} from "./actions";
import {
  onSnapshot,
  QuerySnapshot,
  DocumentData,
  deleteDoc,
  DocumentReference,
  doc,
  updateDoc,
} from "firebase/firestore";

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
