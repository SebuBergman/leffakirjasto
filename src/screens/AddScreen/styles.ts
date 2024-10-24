import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  formContainer: {
    height: "100%",
    alignItems: "center",
    marginBottom: 48,
  },
  heading: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  switchLabel: {
    color: "white",
    fontSize: 20,
  },
});
