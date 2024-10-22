import React from "react";
import { View } from "react-native";
import AddMovie from "../../features/movieList/components/AddMovie/AddMovie";
import styles from "./styles";

export default function AddMovieScreen() {
  return (
    <View style={styles.container}>
      <AddMovie />
    </View>
  );
}
