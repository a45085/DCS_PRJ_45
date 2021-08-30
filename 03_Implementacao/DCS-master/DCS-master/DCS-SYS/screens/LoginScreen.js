import React, { useState } from "react";
import {
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import io from "socket.io-client";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import axios from "axios";
import { Icon } from "react-native-elements";
import { LINK_URLU } from "@env";

const LoginScreen = () => {
  //const socket = io("http://192.168.1.122:3010");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hidePass, setHidePass] = useState(true);

  console.log(LINK_URLU);
  const navigation = useNavigation();
  /* const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  }; */

  const handleLogin = (username_form, password_form) => {
    fetch(LINK_URLU + "login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username_form,
        password: password_form,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        AlertIOS.alert(
          "Login Success!",
          "Click the button to get a Chuck Norris quote!"
        ),
          this._onValueChange(STORAGE_KEY, responseData.id_token);
      })
      .done();
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white justify-center`}>
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="cover"
        style={tw`flex-1 bg-white justify-center`}
      >
        <View>
          <Text style={tw`text-4xl text-black font-bold mx-auto`}>Login</Text>
          {/* username */}
          <TextInput
            style={tw`w-8/12 bg-gray-300 mx-auto p-3 mt-10`}
            placeholder="Username"
            //onChangeText={(text) => this.setState({ email: text })}
            onChangeText={(text) => setUsername(text)}
          />

          <View
            style={[styles.password, tw` w-8/12 bg-gray-300 mx-auto p-3 mt-10`]}
          >
            {/* password */}
            <TextInput
              style={tw`flex-1`}
              placeholder="Password"
              secureTextEntry={hidePass ? true : false}
              password={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Icon
              name={hidePass ? "eye-off-outline" : "eye-outline"}
              type="ionicon"
              size={15}
              color="grey"
              onPress={() => setHidePass(!hidePass)}
            />
          </View>
          <TouchableOpacity
            title="Login"
            style={tw`w-7/12  mt-10 bg-gray-500 mx-auto rounded-full items-center p-5`}
            onPress={() => {}}
          >
            <Text style={tw`text-xl text-white font-bold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  password: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
