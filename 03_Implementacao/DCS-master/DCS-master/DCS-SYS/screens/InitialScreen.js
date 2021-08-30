import React, { useState } from "react";

import {
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Button,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import LoginScreen from "./LoginScreen";

const InitialScreen = () => {
  const navigation = useNavigation();

  var login = () => {
    navigation.navigate(LoginScreen);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white justify-center`}>
      {/* username */}
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={tw`flex-1 bg-white justify-center`}
      >
        <Text style={tw`text-4xl text-black font-bold mx-auto`}>Dynamic</Text>
        <Text style={tw`text-4xl text-black font-bold mx-auto`}>
          Carpooling
        </Text>
        <Text style={tw`text-4xl text-black font-bold mx-auto`}>System</Text>
        <TouchableOpacity
          style={tw`w-7/12  mt-10 bg-gray-500 mx-auto rounded-full items-center p-5`}
          onPress={() => {
            login();
          }}
        >
          <Text style={tw`text-xl text-white font-bold`}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
      {/*} <Image source={require("../assets/dcs_logo.png")} style={tw`w-100`} /> */}
    </SafeAreaView>
  );
};

export default InitialScreen;
