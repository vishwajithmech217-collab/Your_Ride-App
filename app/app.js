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
import { Text, View } from "react-native";

export default function App() {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Text style={{ fontSize: 22 }}>
        Select Your Ride App 🔥
      </Text>
    </View>
  );
}
}