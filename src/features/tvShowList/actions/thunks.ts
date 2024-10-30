import { FIREBASE_DB } from "config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  onSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { SeasonsMap, TvShowList } from "../types";
import uuid from "react-native-uuid";
import {
  addTvShowFailure,
  addTvShowSuccess,
  deleteTvShowFailure,
  deleteTvShowSuccess,
  editTvShowSuccess,
  editTvShowTitleSuccess,
  fetchTvShowFailure,
  fetchTvShowSuccess,
} from "./actions";

// Thunk for fetching Tv Shows in the Firestore collection
export const fetchTvShows = (tvShowQueryRef: any) => {
  return (dispatch: any) => {
    try {
      const unsubscribe = onSnapshot(
        tvShowQueryRef,
        (snapshot: QuerySnapshot<DocumentData>) => {
          // Ensure that snapshot is a QuerySnapshot
          const tvShowList: any[] = [];
          snapshot.docs.forEach((doc) => {
            tvShowList.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          dispatch(fetchTvShowSuccess(tvShowList));
        },
        (error) => {
          dispatch(fetchTvShowFailure(error));
        }
      );
      
      return unsubscribe; // Return unsubscribe directly to caller
    } catch (error) {
      dispatch(fetchTvShowFailure(error));
    }
  };
};

// Thunk for deleting Tv Shows from Firestore collection
export const deleteTvShow = (
  item: DocumentReference<unknown, DocumentData>
) => {
  return async (dispatch: any) => {
    try {
      await deleteDoc(doc(FIREBASE_DB, "tvshows", item.id));
      dispatch(deleteTvShowSuccess(item.id));
    } catch (error) {
      dispatch(deleteTvShowFailure(error));
    }
  };
};

// Modify the editTvShow thunk to accept the updated seasons
export const editTvShow = (
  id: string,
  newTitle: string,
  updatedSeasons: any
) => {
  return async (dispatch: any) => {
    try {
      const tvShowRef = doc(FIREBASE_DB, "tvshows", id);
      await updateDoc(tvShowRef, {
        title: newTitle,
        seasons: updatedSeasons,
      });
      dispatch(editTvShowSuccess(id, newTitle, updatedSeasons));
    } catch (error) {
      console.error("Error updating TV Show: ", error);
    }
  };
};

// Thunk for adding new TV Shows to Firestore collection
export const addTvShow = (tvshow: TvShowList) => {
  return async (dispatch: any) => {
    const generatedId = tvshow.id || uuid.v4();
    try {
      await setDoc(doc(FIREBASE_DB, "tvshows", `${generatedId}`), {
        title: tvshow.title,
        id: generatedId,
        // Convert seasons to a map structure
        seasons: tvshow.seasons.reduce<SeasonsMap>((acc, season) => {
          acc[season.seasonNumber] = {
            seasonNumber: season.seasonNumber,
            owned: season.owned,
            id: season.id,
          };
          return acc;
        }, {} as SeasonsMap), // Initial value of acc should be an empty object of type SeasonsMap
      });
      dispatch(addTvShowSuccess({ ...tvshow, id: generatedId }));
    } catch (error) {
      console.error("Error adding TV show: ", error);
      dispatch(addTvShowFailure(error));
    }
  };
};

// Thunk for subscribing to Firestore Tv Shows collection
export const subscribeToTvShows = () => {
  return (dispatch: any) => {
    const collectionRef = collection(FIREBASE_DB, "tvshows");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedTvShowList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(fetchTvShowSuccess(updatedTvShowList)); // Dispatch fetched Tv Shows to the state
    });

    return unsubscribe; // Return unsubscribe for clean up
  };
};

// Thunk for updating season ownership in Firestore
export const updateSeasonOwnership = (
  tvshowId: string,
  seasonNumber: number,
  owned: boolean
) => {
  return async (dispatch: any) => {
    try {
      const tvShowRef = doc(FIREBASE_DB, "tvshows", tvshowId);
      await updateDoc(tvShowRef, {
        [`seasons.${seasonNumber}`]: {
          owned,
          seasonNumber,
          id: `${tvshowId}-${seasonNumber}`,
        },
      });
    } catch (error) {
      console.error("Error updating season ownership: ", error);
    }
  };
};

// Thunk for editing movie titles in Firestore
export const editTvShowTitle = (id: string, newTitle: string) => {
  return async (dispatch: any) => {
    try {
      const movieRef = doc(FIREBASE_DB, "tvshows", id);
      await updateDoc(movieRef, {
        title: newTitle,
      });
      dispatch(editTvShowTitleSuccess(id, newTitle));
    } catch (error) {
      console.error("Error updating movie: ", error);
    }
  };
};
