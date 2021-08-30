import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import RidesScreen from "./RidesScreen";

const PassengerScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [destinationSet, setDestinationSet] = useState(false);

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
      >
        <Icon name="arrowleft" type="antdesign" />
      </TouchableOpacity>

      <View style={tw`h-full`}>
        <Map />
        <GooglePlacesAutocomplete
          placeholder="Para onde?"
          styles={toInputBoxStyles}
          fetchDetails={true}
          returnKeyType={"search"}
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                // Object {
                location: details.geometry.location, //  "lat": 38.6472066,
                description: data.description, //  "lng": -9.0358047, }
              })
            );
            setDestinationSet(true);
          }}
          enablePoweredByContainer={false}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <TouchableOpacity
          disabled={!destinationSet}
          style={tw`bg-black py-3 m-3`}
          onPress={() => {
            navigation.navigate(RidesScreen);
          }}
        >
          <Text
            style={tw`text-center text-white text-xl ${
              !destinationSet && "bg-gray-300"
            }`}
          >
            LETS GO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PassengerScreen;

const toInputBoxStyles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 9999,
    width: "100%",
    marginTop: 40,
    padding: 20,
    marginLeft: 15,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
