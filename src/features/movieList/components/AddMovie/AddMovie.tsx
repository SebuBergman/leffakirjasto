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

export default function AddMovie() {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([
    {
      original_title: "The Movie",
      release_date: "Today",
      poster_path: "https://via.placeholder.com/150",
      vote_average: 8.5,
      overview: "Overview of the movie",
    },
  ]);
  const [movieSearch, setMovieSearch] = useState("");
  const [movieList, setMovieList] = useState<any[]>([]);

  const writeDataToFireStore = async (item: {
    original_title: any;
    release_date?: string;
    poster_path?: string;
  }) => {
    const generatedId = uuid.v4();
    const movieExists = movieList.some(
      (movie) => movie.title === item.original_title
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

    try {
      const docRef = await setDoc(
        doc(FIREBASE_DB, "movies", `${generatedId}`),
        {
          title: item.original_title,
          id: generatedId,
          imageSrc: item.poster_path,
        }
      );

      // Add the movie to the local movie list (state)
      setMovieList((prevList) => [
        ...prevList,
        {
          title: item.original_title,
          id: generatedId,
          imageSrc: item.poster_path,
        },
      ]);
      Toast.show({
        type: "success",
        text1: "Success!",
        text2: "Movie added successfully",
      });
    } catch (error) {
      console.error("Error adding movie: ", error);
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Error adding movie!",
      });
    }
  };

  const getMovie = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${MOVIEDB_API_KEY}&language=en-US&query=${keyword}&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => {
        setSearchResults(data.results);
      })
      .catch((err) => console.error(err));
  };

  // Function to subscribe to real-time updates from Firestore
  const subscribeToMovies = () => {
    const collectionRef = collection(FIREBASE_DB, "movies");

    // Listen for Firestore updates (add, delete, modify)
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const updatedMovieList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(updatedMovieList); // Update local state with the latest movie list
    });

    return unsubscribe; // Return the unsubscribe function to clean up
  };

  // Effect to subscribe to Firestore updates
  useEffect(() => {
    const unsubscribe = subscribeToMovies();

    return () => {
      unsubscribe(); // Clean up the listener when component unmounts
    };
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search movies"
            onChangeText={(text: string) => setKeyword(text)}
            onSubmitEditing={getMovie}
          />
          <TouchableOpacity onPress={getMovie}>
            <Icon name="search" color="white"></Icon>
          </TouchableOpacity>
        </View>
        {searchResults.length > 1 ? (
          <ScrollView style={styles.searchResultsContainer}>
            {searchResults.map((item, index) => (
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
                      onPress={() => writeDataToFireStore(item)}
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

/* <Button title="Search" type="outline" onPress={getMovie}></Button> */
