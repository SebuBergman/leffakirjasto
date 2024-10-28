import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: "100%",
  },

  //Search for movies Input styles
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    height: 40,
    backgroundColor: "#121212",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 340,
    backgroundColor: "#FFFFFF",
  },

  // Movie list container styles
  movieContainer: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#121212",
  },
  movieWrapper: {
    backgroundColor: "#121212",
    paddingLeft: 0,
  },

  // Delete tv show button styles
  deleteButtonStyle: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  
  moviePosterArt: {
    width: 68,
    height: 100,
  },

  editInput: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 200,
    backgroundColor: "#FFFFFF",
  },

  // Styles for the empty list text
  emptyListStyle: {
    color: "white",
    marginLeft: 10,
    marginTop: 25,
    textAlign: "center",
    fontSize: 20,
  },
});
