import React, { useState } from "react";
import { View, Button, Text, ScrollView, Switch } from "react-native";
import AddMovie from "features/movieList/components/AddMovie/AddMovie";
import AddTvShow from "features/tvShowList/components/AddTvShow";
import styles from "./styles";

export default function AddScreen() {
  const [isAddingWhich, setIsAddingWhich] = useState(true); // State to track if adding a movie or TV show

  // Function to handle switch toggle
  const toggleSwitch = () =>
    setIsAddingWhich((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>
          {isAddingWhich ? "Add Movie" : "Add TV Show"}
        </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }} // Colors for the switch track
          thumbColor={isAddingWhich ? "#f5dd4b" : "#f4f3f4"} // Colors for the switch thumb
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch} // Function to toggle the state
          value={isAddingWhich} // Bind the value to the switch
        />
      </View>

      <View style={styles.formContainer}>
        {/* Conditionally render the appropriate form */}
        {isAddingWhich ? (
          <ScrollView>
            <AddMovie />
          </ScrollView>
        ) : (
          <ScrollView>
            <AddTvShow />
          </ScrollView>
        )}
      </View>
    </View>
  );
}
