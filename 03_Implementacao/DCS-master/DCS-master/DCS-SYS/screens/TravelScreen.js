import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

const TravelScreen = () => {
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
        <TouchableOpacity
          style={tw`bg-black py-3 m-3`}
          onPress={() => {
            //socket.emit("new position", origin.location);
            socket.current.emit("new position", "boas");
          }}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Confirmar local de recolha
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TravelScreen;

const styles = StyleSheet.create({});
