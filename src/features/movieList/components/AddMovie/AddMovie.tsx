import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { ListItem, Button, Input } from "@rneui/base";
import styles from "./styles";
import { Icon } from "@rneui/base";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { MovieList, SearchResults } from "features/movieList/types";
import {
  addMovieToFirestore,
  searchMovies,
  subscribeToMovies,
} from "features/movieList/actions/thunks";
import { AppDispatch } from "features/store/store";

export default function AddMovie() {
  const dispatch: AppDispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const searchResults = useSelector((state: any) => state.movies.searchResults); // Fetch search results from Redux
  const movieList = useSelector((state: any) => state.movies.movieList);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // Call the searchMovies thunk
  const handleSearch = () => {
    setSearchPerformed(true);
    dispatch(searchMovies(keyword));
  };

  const handleMovieSave = (item: SearchResults) => {
    const movieTitleExists = movieList.some(
      (movie: MovieList) => movie.title === item.original_title
    );

    const movieDateMatches = movieList.some(
      (movie: MovieList) => movie.releaseDate === item.release_date
    );

    if (movieTitleExists && movieDateMatches) {
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
      releaseDate: item.release_date,
    };

    dispatch(addMovieToFirestore(movieToSave));
    Toast.show({
      type: "success",
      text1: "Success!",
      text2: "Movie added successfully",
    });
    handleSearch();
  };

  // Effect to subscribe to Firestore updates
  useEffect(() => {
    const unsubscribe = dispatch(subscribeToMovies());

    return () => {
      unsubscribe(); // Clean up the listener when component unmounts
    };
  }, [dispatch]);

  return (
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
      {searchPerformed && searchResults.length > 0 ? (
        <View style={styles.searchResultsContainer}>
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
                  <Button type="outline" onPress={() => handleMovieSave(item)}>
                    Add Movie
                  </Button>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
