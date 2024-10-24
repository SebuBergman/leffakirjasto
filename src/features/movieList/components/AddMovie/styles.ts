import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: "100%",
  },

  searchResultsContainer: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#121212",
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 10,
  },

  moviePosterArt: {
    width: 100,
    height: 150,
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
    width: 300,
    backgroundColor: "#FFFFFF",
  },
});
