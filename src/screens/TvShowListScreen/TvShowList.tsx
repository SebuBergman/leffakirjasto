import React, { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { ListItem, Button } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "features/store/store";
import {
  deleteTvShow,
  editTvShowTitle,
  fetchTvShows,
  updateSeasonOwnership,
} from "features/tvShowList/actions/thunks";
import { searchTvShowList } from "features/tvShowList/actions/actions";
import { tvShowQueryRef } from "config/firebase/firebase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CheckBox } from "react-native-elements"; // Checkbox component
import Feather from "@expo/vector-icons/Feather";

export default function TvShowListScreen() {
  const dispatch: AppDispatch = useDispatch();
  const tvShowList = useSelector((state: any) => state.tvshows.tvShowList);
  const filteredTvShowList = useSelector(
    (state: any) => state.tvshows.filteredTvShowList
  ); // Filtered list for search
  const [searchQuery, setSearchQuery] = useState("");

  // Constants for editing tvshow titles
  const [editingTitleId, setEditingTitleId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");

  // Local state for seasons in edit mode
  const [editedSeasons, setEditedSeasons] = useState<{
    [tvShowId: string]: { [seasonNumber: number]: boolean };
  }>({});
  const [editingSeasonsId, setEditingSeasonsId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = dispatch(fetchTvShows(tvShowQueryRef));

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch]);

  // Function to handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(searchTvShowList(query)); // Dispatch the search action
  };

  // Use filteredtvshowList if there is a search query, otherwise fallback to the full tvshowList
  const tvShowsToDisplay = searchQuery ? filteredTvShowList : tvShowList;

  // Alphabetically sort the movies by title
  const sortedTvShows = tvShowsToDisplay.sort((a: any, b: any) => {
    return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  });

  //Function to handle tvshowList deletion
  const handleDelete = (tvshow: any) => {
    dispatch(deleteTvShow(tvshow));
  };

  const handleEditTitle = (tvshow: any) => {
    setEditingTitleId(tvshow.id);
    setNewTitle(tvshow.title);
  };

  const handleSaveEdit = () => {
    if (editingTitleId) {
      dispatch(editTvShowTitle(editingTitleId, newTitle));
      setEditingTitleId(null);
      setNewTitle("");
    }
  };

  // Toggle between editing and saving seasons
  const handleEditSeasons = (tvshow: any) => {
    if (editingSeasonsId !== tvshow.id) {
      setEditingSeasonsId(tvshow.id);

      // Convert seasons to an array and then reduce to create editedSeasons
      const seasonsArray = convertSeasonsToArray(tvshow.seasons);

      setEditedSeasons({
        [tvshow.id]: seasonsArray.reduce((acc: any, season: any) => {
          acc[season.seasonNumber] = season.owned;
          return acc;
        }, {}),
      });
    }
  };

  const handleSaveSeasonsEdit = (tvshow: any) => {
    // Dispatch each season's ownership change to Firestore
    Object.keys(editedSeasons[tvshow.id]).forEach((seasonNumber) => {
      const owned = editedSeasons[tvshow.id][Number(seasonNumber)];
      dispatch(updateSeasonOwnership(tvshow.id, Number(seasonNumber), owned));
    });

    setEditingSeasonsId(null);
    setEditedSeasons((prev) => ({
      ...prev,
      [tvshow.id]: {},
    }));
  };

  const handleSeasonOwnershipChange = (
    tvshowId: string,
    seasonNumber: number,
    owned: boolean
  ) => {
    setEditedSeasons((prev) => ({
      ...prev,
      [tvshowId]: {
        ...prev[tvshowId],
        [seasonNumber]: owned,
      },
    }));
  };

  // Helper function to convert seasons to array if it's stored as a map
  const convertSeasonsToArray = (seasons: any) => {
    if (Array.isArray(seasons)) {
      return seasons; // It's already an array
    } else if (typeof seasons === "object" && seasons !== null) {
      // Convert map to array
      return Object.values(seasons);
    }
    return []; // Return an empty array if seasons is undefined or not an object/array
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tv shows"
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
        />
      </View>
      {sortedTvShows.length > 0 ? (
        <ScrollView style={styles.tvShowContainer}>
          {sortedTvShows.map((tvshow: any) => (
            <ListItem
              key={tvshow.id}
              bottomDivider
              containerStyle={{
                backgroundColor: "#121212",
                padding: 0,
                paddingBottom: 10,
                paddingTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handleDelete(tvshow)}
                style={styles.deleteButtonStyle}
              >
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
              <ListItem.Content>
                <View style={styles.tvShowDetailsContainer}>
                  <View style={styles.titleContainer}>
                    {editingTitleId === tvshow.id ? (
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
                      <View style={styles.tvShowTitleContainer}>
                        <View style={styles.tvShowTitleWrapper}>
                          <TouchableOpacity
                            onPress={() => handleEditTitle(tvshow)}
                          >
                            <ListItem.Title style={styles.tvShowTitle}>
                              {tvshow.title}
                            </ListItem.Title>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={styles.seasonContainer}>
                    <View style={styles.seasonTitleWrapper}>
                      <Text style={styles.seasonLabel}>Owned Seasons:</Text>
                      <Button
                        title={editingSeasonsId === tvshow.id ? "Save" : "Edit"} // Change button text based on edit mode
                        type="outline"
                        onPress={() => {
                          if (editingSeasonsId === tvshow.id) {
                            handleSaveSeasonsEdit(tvshow); // Call save function if in edit mode
                          } else {
                            handleEditSeasons(tvshow); // Otherwise, call edit function
                          }
                        }}
                        containerStyle={{ marginTop: 8 }}
                      >
                        <MaterialIcons
                          name={
                            editingSeasonsId === tvshow.id ? "save" : "edit"
                          } // Change icon based on edit mode
                          size={24}
                          color="white"
                        />
                      </Button>
                    </View>
                    {editingSeasonsId === tvshow.id ? (
                      <View style={styles.seasonNumberEditContainer}>
                        <View style={styles.seasonNumberEditWrapper}>
                          {convertSeasonsToArray(tvshow.seasons).map(
                            (season: any) => (
                              <CheckBox
                                iconType="material-community"
                                checkedIcon="checkbox-outline"
                                uncheckedIcon={"checkbox-blank-outline"}
                                key={season.seasonNumber}
                                title={`S ${season.seasonNumber}`}
                                checked={
                                  editedSeasons[tvshow.id]?.[
                                    season.seasonNumber
                                  ] ?? season.owned
                                }
                                onPress={() =>
                                  handleSeasonOwnershipChange(
                                    tvshow.id,
                                    season.seasonNumber,
                                    !editedSeasons[tvshow.id]?.[
                                      season.seasonNumber
                                    ]
                                  )
                                }
                                containerStyle={{
                                  backgroundColor: "transparent",
                                  width: 85,
                                }}
                                textStyle={{
                                  color: editedSeasons[tvshow.id]?.[
                                    season.seasonNumber
                                  ]
                                    ? "white"
                                    : "grey",
                                }}
                              />
                            )
                          )}
                        </View>
                      </View>
                    ) : (
                      <View style={styles.seasonNumberContainer}>
                        <View style={styles.seasonNumberWrapper}>
                          {convertSeasonsToArray(tvshow.seasons).map(
                            (season: any) => (
                              <ListItem.Subtitle
                                key={season.seasonNumber}
                                style={[
                                  {
                                    color: season.owned ? "white" : "grey",
                                  },
                                ]}
                              >
                                {season.seasonNumber}
                              </ListItem.Subtitle>
                            )
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={styles.buttonContainer}></View>
                </View>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyListStyle}>No TV shows found.</Text>
      )}
    </View>
  );
}
