import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import KnowRideScreen from "./screens/KnowRideScreen";
import ModelDetailsScreen from "./screens/ModelDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="KnowRide"
          component={KnowRideScreen}
        />

        <Stack.Screen
          name="ModelDetails"
          component={ModelDetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
<Stack.Screen name="SelectRide" component={SelectRideScreen} />
  );
}