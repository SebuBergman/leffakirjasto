import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddMovie from "./src/features/movieList/components/AddMovie/AddMovie";
import { Provider } from "react-redux";
import Toast, { BaseToastProps } from "react-native-toast-message";
import { View, Text, StatusBar } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import store from "features/store/store";
import AddScreen from "screens/AddScreen/AddScreen";
import MovieListScreen from "screens/MovieListScreen/MovieList";
import TvShowListScreen from "screens/TvShowListScreen/TvShowList";
import AddTvShow from "features/tvShowList/components/AddTvShow";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";

const Tabs = createBottomTabNavigator();

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={{
        height: 100,
        backgroundColor: "white",
        borderLeftColor: "#00FF00",
        borderLeftWidth: 5,
        padding: 10,
        borderRadius: 5,
        width: "90%",
      }}
    >
      {text1 && (
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
          {text1}
        </Text>
      )}
      {text2 && (
        <Text style={{ color: "grey", fontSize: 17, paddingTop: 5 }}>
          {text2}
        </Text>
      )}
    </View>
  ),

  error: ({ text1, text2 }: CustomToastProps) => (
    <View
      style={{
        height: 100,
        backgroundColor: "white",
        borderLeftColor: "#D92D20",
        borderLeftWidth: 5,
        padding: 10,
        borderRadius: 5,
        width: "90%",
      }}
    >
      {text1 && (
        <Text style={{ color: "#D92D20", fontSize: 20, fontWeight: "bold" }}>
          {text1}
        </Text>
      )}
      {text2 && (
        <Text style={{ color: "black", fontSize: 16, paddingTop: 5 }}>
          {text2}
        </Text>
      )}
    </View>
  ),
};

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <NavigationContainer>
        <Tabs.Navigator
          screenOptions={() => ({
            headerShown: false,
            tabBarStyle: {
              height: 65,
              paddingHorizontal: 5,
              paddingTop: 0,
              paddingBottom: 5,
              backgroundColor: "rgba(34,36,40,1)",
              borderTopWidth: 0,
            },
            tabBarOptions: {
              activeTintColor: "#121212",
              inactiveTintColor: "#121212",
              activeBackgroundColor: "#121212",
              inactiveBackgroundColor: "#121212",
              style: {
                backgroundColor: "#121212",
                paddingBottom: 3,
              },
            },
          })}
        >
          <Tabs.Screen
            name="Movies"
            component={MovieListScreen}
            options={{
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="movie-open-star"
                  size={24}
                  color="white"
                />
              ),
              tabBarLabelStyle: {
                fontSize: 15,
              },
            }}
          />
          <Tabs.Screen
            name="TvShows"
            component={TvShowListScreen}
            options={{
              tabBarIcon: () => <Feather name="tv" size={24} color="white" />,
              tabBarLabelStyle: {
                fontSize: 15,
              },
            }}
          />
          <Tabs.Screen
            name="Add"
            component={AddScreen}
            options={{
              tabBarIcon: () => <Ionicons name="add" size={24} color="white" />,
              tabBarLabelStyle: {
                fontSize: 15,
              },
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
}
