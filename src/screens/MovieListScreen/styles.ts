import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: "100%",
  },
  movieContainer: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#121212",
  },
  movieItemContainer: {
    backgroundColor: "#121212",
  },
  moviePosterArt: {
    width: 100,
    height: 150,
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },

  //Refresh button
  refreshContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  refreshButton: {
    justifyContent: "flex-end",
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

  //Search for movies Input styles
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
    height: 40,
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

  // Styles for the empty list text
  emptyListStyle: {
    color: "white",
    marginLeft: 10,
    marginTop: 25,
    textAlign: "center",
    fontSize: 20,
  },

  // Delete tv show button styles
  deleteButtonStyle: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
