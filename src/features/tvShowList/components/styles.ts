import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    height: "100%",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    height: 60,
    backgroundColor: "#121212",
  },

  // Style for inputs
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 340,
    backgroundColor: "#FFFFFF",
  },

  seasonsInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 340,
    backgroundColor: "#FFFFFF",
  },

  AddTvShowContainer: {
    height: "100%",
    padding: 10,
    marginBottom: 65,
  },

  label: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },

  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },

  seasonCountContainer: {
    marginBottom: 20,
  },

  // Checkbox Styles
  checkSeasonsContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
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
    width: "48%",
    marginBottom: 10,
  },

  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default styles;
