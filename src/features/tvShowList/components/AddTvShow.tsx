import React, { useState } from "react";
import { View, TextInput, Button, Text, ScrollView } from "react-native";
import styles from "./styles"; // Your styles file
import { useDispatch } from "react-redux";
import { Season, TvShowList } from "../types";
import { addTvShowToFirestore } from "../actions/thunks";
import RNPickerSelect from "react-native-picker-select"; // Dropdown component
import uuid from "react-native-uuid";
import { AppDispatch } from "features/store/store";
import { CheckBox } from "react-native-elements"; // Checkbox component

export default function AddTvShow() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedSeasons, setSelectedSeasons] = useState<number | null>(null); // Selected number of seasons
  const [seasonCheckStates, setSeasonCheckStates] = useState<{
    [key: number]: boolean;
  }>({}); // Checkbox states
  const [title, setTitle] = useState("");

  // Handle checkbox toggle
  const toggleSeason = (seasonNumber: number) => {
    setSeasonCheckStates((prevState) => ({
      ...prevState,
      [seasonNumber]: !prevState[seasonNumber],
    }));
  };

  const handleAddTvShow = () => {
    // Ensure selectedSeasons is a number
    if (selectedSeasons === null) return; // Early exit if null

    // Create an array of seasons based on the number of selected seasons
    const seasons: Season[] = Array.from(
      { length: selectedSeasons },
      (_, index) => {
        const seasonNumber = index + 1;
        return {
          seasonNumber: seasonNumber,
          owned: seasonCheckStates[seasonNumber] || false, // Check if the season is marked as owned
          id: uuid.v4(), // Unique ID for the season
        };
      }
    );

    const TvShowToSave: TvShowList = {
      title: title,
      id: uuid.v4(),
      seasons: seasons,
    };
    dispatch(addTvShowToFirestore(TvShowToSave)); // Dispatch the thunk to add TV show

    // Reset form
    setTitle("");
    setSelectedSeasons(null);
    setSeasonCheckStates({});
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="TV Show Title"
          value={title}
          onChangeText={setTitle}
          style={styles.searchInput}
        />
      </View>
      <ScrollView style={styles.AddTvShowContainer}>
        <View style={styles.seasonCountContainer}>
          {/* Dropdown to select the number of seasons */}
          <Text style={styles.label}>Select the number of seasons:</Text>
          <TextInput
            placeholder="Number of seasons"
            value={selectedSeasons !== null ? selectedSeasons.toString() : ""}
            onChangeText={(value) => {
              const numericValue = parseInt(value, 10);
              setSelectedSeasons(isNaN(numericValue) ? null : numericValue);
            }}
            style={styles.seasonsInput}
            keyboardType="numeric"
          />
        </View>
        {/* Render checkboxes for each selected season */}
        {selectedSeasons !== null && (
          <View style={styles.checkSeasonsContainer}>
            <Text style={styles.label}>Mark the seasons you own:</Text>
            <View style={styles.checkboxRows}>
              {Array.from({ length: selectedSeasons }, (_, index) => {
                const seasonNumber = index + 1;
                return (
                  <View key={seasonNumber} style={styles.checkboxContainer}>
                    <CheckBox
                      checked={seasonCheckStates[seasonNumber] || false} // Check if current season is selected
                      onPress={() => toggleSeason(seasonNumber)}
                      title={`Season ${seasonNumber}`}
                      style={styles.checkbox}
                    />
                  </View>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>
      <Button title="Add TV Show" onPress={handleAddTvShow} />
    </View>
  );
}
