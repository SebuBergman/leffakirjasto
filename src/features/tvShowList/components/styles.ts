import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    height: 60,
    backgroundColor: "#121212",
  },

  // Style for search input
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 340,
    backgroundColor: "#FFFFFF",
  },

  TvShowContainer: {
    height: "100%",
    padding: 10,
  },

  seasonContainer: {
    marginBottom: 20,
  },

  // Style for seasons input
  seasonsInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 340,
    backgroundColor: "#FFFFFF",
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },

  // Checkbox Styles
  checkSeasonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 55,
  },

  checkboxRows: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distribute checkboxes evenly
    width: "100%", // Full width
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    marginBottom: 5,
  },
});

export default styles;
