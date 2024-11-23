import React, { useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useAppDispatch, useAppSelector } from "features/store";
import { SearchResults } from "features/movieList/types";
import Toast from "react-native-toast-message";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { addMovie, searchMovieDB } from "../actions/thunks";

export default function AddMovie() {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState("");
  const searchResults = useAppSelector((state) => state.movies.searchResults);
  const movieList = useAppSelector((state) => state.movies.movieList);

  const handleSearch = () => {
    dispatch(searchMovieDB(keyword));
  };

  const handleMovieSave = (item: SearchResults) => {
    if (movieList.some((movie) => movie.title === item.original_title)) {
      Toast.show({
        type: "error",
        text1: "Error!",
        text2: "Movie already exists!",
      });
      return;
    }

    const newMovie = {
      id: item.id,
      title: item.original_title,
      imageSrc: item.poster_path,
      releaseDate: item.release_date,
    };

    dispatch(addMovie(newMovie));
    Toast.show({
      type: "success",
      text1: "Success!",
      text2: "Movie added successfully!",
    });
  };

  return (
    <View>
      <TextInput
        placeholder="Search Movies"
        value={keyword}
        onChangeText={setKeyword}
        onSubmitEditing={handleSearch}
      />
      <ScrollView>
        {searchResults.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleMovieSave(item)}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
            />
            <Text>{item.original_title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
