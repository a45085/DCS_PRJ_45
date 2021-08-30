import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import InitialScreen from "./screens/InitialScreen";
import PassengerScreen from "./screens/PassengerScreen";
import RidesScreen from "./screens/RidesScreen";
import DriverScreen from "./screens/DriverScreen";
import DriverRideScreen from "./screens/DriverRideScreen";
import TravelScreen from "./screens/TravelScreen";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="InitialScreen"
                component={InitialScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DriverScreen"
                component={DriverScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="DriverRideScreen"
                component={DriverRideScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PassengerScreen"
                component={PassengerScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RidesScreen"
                component={RidesScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TravelScreen"
                component={TravelScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}
