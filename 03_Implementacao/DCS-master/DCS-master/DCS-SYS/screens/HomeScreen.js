import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacityBase,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice"; // import das funções da slice com info de nav.

import * as Location from "expo-location";
import { set } from "react-native-reanimated";

const HomeScreen = () => {
  //enviar info para camada de dados (redux)
  const dispatch = useDispatch();
  const [userlocation, setuserlocation] = useState(null);
  //const [userLat, setuserLat] = useState(null);
  //const [userLng, setuserLng] = useState(null);

  //const [positionIsSet, setpositionIsSet] = useState(false);

  // :)
  const _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if ((status = !"granted"))
      console.log("Permission to access location was denied.");

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const user_location = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };

    setuserlocation(user_location);

    // if (!positionIsSet) {
    //   setuserLat(location.coords.latitude);
    //   setuserLng(location.coords.longitude);
    //   setpositionIsSet(true);
    //   console.log("entrei");
    // }
    // console.log(positionIsSet);
    // if (
    //   (userLat != location.coords.latitude ||
    //     userLng != location.coords.longitude) &&
    //   positionIsSet
    // ) {
    //   setuserLat(location.coords.latitude);
    //   setuserLng(location.coords.longitude);
    // }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      _getLocationAsync();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(
      setOrigin({
        location: userlocation,
        description: "new position",
      })
    );
  }, [userlocation]);
  // }, [userLat, userLng]);

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        {/*componente relativo às opções de navegação */}
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
