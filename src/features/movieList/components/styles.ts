import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: "100%",
  },

  //Search Input styles
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    height: 60,
    backgroundColor: "#121212",
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 340,
    backgroundColor: "#FFFFFF",
  },

  searchResultsContainer: {
    marginTop: 10,
    width: "100%",
    margin: 0,
    padding: 0,
    backgroundColor: "#121212",
  },

  // Delete tv show button styles
  addButtonStyle: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  moviePosterArt: {
    width: 100,
    height: 150,
    margin: 0,
  },

  readmoreButton: {
    padding: 0,
    margin: 0,
  },
});
