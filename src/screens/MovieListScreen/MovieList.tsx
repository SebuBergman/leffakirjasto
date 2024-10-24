import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Image, ScrollView } from "react-native";
import styles from "./styles";
import { ListItem, Button } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovie,
  editMovie,
  fetchMoviesFromFirestore,
} from "features/movieList/actions/thunks";
import { movieQueryRef } from "config/firebase";
import { searchMovieList } from "features/movieList/actions/actions";
import { AppDispatch } from "features/store/store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function MovieListScreen() {
  const dispatch: AppDispatch = useDispatch();
  const movieList = useSelector((state: any) => state.movies.movieList);
  const filteredMovieList = useSelector(
    (state: any) => state.movies.filteredMovieList
  ); // Filtered list for search
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState<string | null>(null); // State to keep track of the movie being edited
  const [newTitle, setNewTitle] = useState(""); // State for the new movie title

  useEffect(() => {
    const unsubscribe = dispatch(fetchMoviesFromFirestore(movieQueryRef));

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch]);

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(searchMovieList(query)); // Dispatch the search action
  };

  // Use filteredMovieList if there is a search query, otherwise fallback to the full movieList
  const moviesToDisplay = searchQuery ? filteredMovieList : movieList;

  //Function to handle movie deletion
  const handleDelete = (movie: any) => {
    dispatch(deleteMovie(movie));
  };

  const handleEdit = (movie: any) => {
    setEditId(movie.id);
    setNewTitle(movie.title);
  };

  const handleSaveEdit = () => {
    if (editId) {
      dispatch(editMovie(editId, newTitle));
      setEditId(null);
      setNewTitle("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies"
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      {moviesToDisplay.length > 0 ? (
        <ScrollView style={styles.movieContainer}>
          {moviesToDisplay.map((movie: any) => (
            <ListItem
              key={movie.id}
              bottomDivider
              containerStyle={{ backgroundColor: "#121212" }}
            >
              <Image
                style={styles.moviePosterArt}
                source={{
                  uri: "https://image.tmdb.org/t/p/w500" + movie.imageSrc,
                }}
              ></Image>
              <ListItem.Content>
                {editId === movie.id ? ( // Check if this is the movie being edited
                  <View>
                    <TextInput
                      style={styles.editInput}
                      value={newTitle}
                      onChangeText={setNewTitle}
                      placeholder="Edit title"
                    />
                    <Button title="Save" onPress={handleSaveEdit} />
                  </View>
                ) : (
                  <>
                    <ListItem.Title style={{ color: "white" }}>
                      {movie.title}
                    </ListItem.Title>
                    <View style={styles.buttonContainer}>
                      <Button
                        title="Edit"
                        type="outline"
                        onPress={() => handleEdit(movie)}
                      >
                        <MaterialIcons name="edit" size={24} color="white" />
                      </Button>
                      <Button
                        title="Delete"
                        type="outline"
                        onPress={() => handleDelete(movie)}
                      >
                        <MaterialCommunityIcons
                          name="delete"
                          size={24}
                          color="white"
                        />
                      </Button>
                    </View>
                  </>
                )}
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      ) : (
        <Text></Text>
      )}
    </View>
  );
}
