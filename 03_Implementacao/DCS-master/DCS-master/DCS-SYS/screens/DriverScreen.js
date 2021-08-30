import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapView, { Marker } from "react-native-maps";
import io, { Socket } from "socket.io-client";
import ModalDriver from "../components/ModalDriver";

const DriverScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);

  const socketUrl = "http://192.168.1.122:3000";
  const socket = useRef(null);
  //const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   //socket.current = io("http://192.168.1.122:3000");
  //   socket.current.on("update driver", (msg) => {
  //     console.log(msg);
  //   });
  //   return () => socket.current.close();
  // });

  useEffect(() => {
    socket.current = io(socketUrl);
  }, [socketUrl]);

  return (
    <View>
      <View style={tw`h-full`}>
        <MapView
          //ref={mapRef}
          style={tw`flex-1`}
          mapType="mutedStandard"
          initialRegion={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          showsUserLocation={true}
        />

        <View style={styles.header}>
          <TouchableOpacity
            style={tw`w-5/12 bg-red-700 rounded-full items-center p-4 mr-5`}
            onPress={() => setVisible(false)}
          >
            <Text
              style={tw`text-lg p-4  text-white  mx-1 font-bold rounded-full px-5`}
            >
              Negar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw` w-5/12 bg-green-400 rounded-full items-center p-4`}
            onPress={() => functionCombined()}
          >
            <Text
              style={tw`text-lg p-4 mx-1 text-white  font-bold  rounded-full px-5`}
            >
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={tw`bg-black py-3 m-3`}
          onPress={() => {
            //socket.emit("new position", origin.location);
            socket.current.emit("new position", "boas");
          }}
        >
          <Text style={tw`text-center text-white text-xl`}>Iniciar Viagem</Text>
        </TouchableOpacity> */}
      </View>
      <ModalDriver />
    </View>
  );
};

export default DriverScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    marginBottom: 40,
  },
});
