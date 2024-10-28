import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#121212",
    height: "100%",
    width: "100%",
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

  // TV Show Container styles
  tvShowContainer: {
    marginTop: 20,
    backgroundColor: "#121212",
  },

  // Delete tv show button styles
  deleteButtonStyle: {
    position: "absolute",
    top: 20,
    right: 15,
  },

  // TV show List styles
  tvShowDetailsContainer: {
    alignItems: "flex-start",
    marginTop: 10,
  },

  titleContainer: {
    marginBottom: 12,
  },

  editInput: {
    padding: 10,
    marginBottom: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    width: 335,
    backgroundColor: "#FFFFFF",
  },

  //TvShow Container styles
  tvShowTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Distribute space between items
    width: "100%",
  },

  tvShowTitleWrapper: {
    flexDirection: "row",
  },

  tvShowTitle: {
    color: "white",
    fontSize: 20,
  },

  // Season Number Container and related styles
  seasonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 25,
    width: "100%",
  },

  seasonTitleWrapper: {
    width: 115,
  },

  seasonLabel: {
    color: "white",
    fontSize: 15,
  },

  seasonNumberContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "30%",
  },
  
  seasonNumberWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  // Season Edit Container and related styles
  seasonNumberEditContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 220,
  },
  seasonNumberEditWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },

  emptyListStyle: {
    color: "white",
    marginLeft: 10,
    marginTop: 25,
    textAlign: "center",
    fontSize: 20,
  },
});
