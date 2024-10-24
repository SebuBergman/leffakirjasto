import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import AddMovie from "features/movieList/components/AddMovie/AddMovie";
import AddTvShow from "features/tvShowList/components/AddTvShow";
import styles from "./styles";

export default function AddScreen() {
  const [isAddingMovie, setIsAddingMovie] = useState(true); // State to track if adding a movie or TV show

  return (
    <View style={styles.container}>
      <View style={styles.toggleContainer}>
        {/* Toggle buttons to switch between adding movie or TV show */}
        <Button
          title="Add Movie"
          onPress={() => setIsAddingMovie(true)}
          disabled={isAddingMovie}
        />
        <Button
          title="Add TV Show"
          onPress={() => setIsAddingMovie(false)}
          disabled={!isAddingMovie}
        />
      </View>

      <View style={styles.formContainer}>
        {/* Conditionally render the appropriate form */}
        {isAddingMovie ? (
          <>
            <Text style={styles.heading}>Add a Movie</Text>
            <AddMovie />
          </>
        ) : (
          <>
            <Text style={styles.heading}>Add a TV Show</Text>
            <AddTvShow />
          </>
        )}
      </View>
    </View>
  );
}
