import React, { useEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import { ListItem, Button, Input } from "@rneui/base";
import styles from "./styles";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../../../config/firebase/firebase";
import uuid from "react-native-uuid";
import { Icon } from "@rneui/base";
import { MOVIEDB_API_KEY } from "../../../../../apiKeys";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "features/store/store";
import { MovieList, SearchResults } from "features/movieList/types";
import { addMovieToFirestore, searchMovies, subscribeToMovies } from "features/movieList/actions/thunks";

export default function AddMovie() {
  const dispatch: AppDispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const searchResults = useSelector((state: any) => state.movies.searchResults); // Fetch search results from Redux
  const [movieList, setMovieList] = useSelector(
    (state: any) => state.movies.movieList
  );

  // Call the searchMovies thunk
  const handleSearch = () => {
    dispatch(searchMovies(keyword));
    console.log("search Under Way");
  };

  console.log(searchResults);
  const handleMovieSave = (item: SearchResults) => {
    const movieExists = movieList.some(
      (movie: MovieList) => movie.title === item.original_title
    );

    if (movieExists) {
      console.log("Movie already exists in the list.");
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Movie already exists in the list.",
      });
      return;
    }

    const movieToSave: MovieList = {
      title: item.original_title,
      id: item.id,
      imageSrc: item.poster_path || "",
    };

    dispatch(addMovieToFirestore(movieToSave));
  };

  // Effect to subscribe to Firestore updates
  useEffect(() => {
    const unsubscribe = dispatch(subscribeToMovies());

    return () => {
      unsubscribe(); // Clean up the listener when component unmounts
    };
  }, [dispatch]);

  function handleSaveMovie(item: MovieList): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies"
            onChangeText={(text: string) => setKeyword(text)}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" color="white"></Icon>
          </TouchableOpacity>
        </View>
        {searchResults.length > 1 ? (
          <ScrollView style={styles.searchResultsContainer}>
            {searchResults.map((item: SearchResults, index: number) => (
              <ListItem
                key={index}
                bottomDivider
                containerStyle={{ backgroundColor: "#121212" }}
              >
                <Image
                  style={styles.moviePosterArt}
                  source={{
                    uri: "https://image.tmdb.org/t/p/w500" + item.poster_path,
                  }}
                ></Image>
                <ListItem.Content>
                  <ListItem.Title style={{ color: "white", fontSize: 17 }}>
                    {item.original_title}
                  </ListItem.Title>
                  <ListItem.Subtitle style={{ color: "white" }}>
                    {item.release_date}
                  </ListItem.Subtitle>
                  <View style={styles.buttonContainer}>
                    <Button
                      title="Save Movie"
                      type="outline"
                      onPress={() => handleMovieSave(item)}
                    ></Button>
                  </View>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        ) : (
          <Text></Text>
        )}
      </View>
    </>
  );
}
