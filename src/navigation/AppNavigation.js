import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screen/HomeScreen";
import DetailsScreen from "../screen/DetailsScreen";
import Toast from "react-native-toast-message";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Home") iconName = "home";
        else if (route.name === "Favorite") iconName = "heart";
        else if (route.name === "Premiere") iconName = "star";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "blue",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    {/* <Tab.Screen name="Favorite" component={FavoriteScreen} /> */}
  </Tab.Navigator>
);

const AppNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export { AppNavigation };
