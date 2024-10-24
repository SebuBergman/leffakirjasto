import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#121212",
    height: "100%",
    width: "100%",
  },
  tvShowContainer: {
    marginTop: 10,
    width: "100%",
    backgroundColor: "#121212",
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

  //Edit button and input styles
  editContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },

  editInput: {
    padding: 10,
    marginBottom: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    width: 340,
    backgroundColor: "#FFFFFF",
  },

  editButton: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    backgroundColor: "#121212",
    padding: 10,
    borderRadius: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
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

  tvShowListDetailsContainer: {
    alignItems: "flex-start",
    padding: 10,
  },

  titleContainer: {
    gap: 10,
    marginBottom: 10,
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
    gap: 10,
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
    width: "26%",
  },
  seasonNumberWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
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
});
