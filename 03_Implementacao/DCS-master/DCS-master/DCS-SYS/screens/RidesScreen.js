import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import MapView from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";

import TravelScreen from "./TravelScreen";

const data = [
  {
    id: "1",
    from: "Vale da Amoreira",
    to: "Lisboa",
  },
];

const RidesScreen = () => {
  //

  const origin = useSelector(selectOrigin);
  const [selected, setSelected] = useState(null); //define qual opção está selecionada na variavel selected

  const navigation = useNavigation();

  useEffect(() => {
    if (!selected) return; // caso não haja um dos dois não corre

    // zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [selected]);

  return (
    <View>
      <View style={tw`h-1/2`}>
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
        >
          {selected ? (
            <Marker
              coordinate={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
              }}
              title="Origin"
              description={origin.description}
              identifier="origin"
            />
          ) : null}

          {destination?.location && (
            <Marker
              coordinate={{
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }}
              title="Destination"
              description={destination.description}
              identifier="destination"
            />
          )}
        </MapView>
      </View>
      <SafeAreaView style={tw`h-1/2`}>
        <Text style={tw`text-center text-xl my-3`}>Viagens Disponíveis</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { id, from, to }, item }) => (
            <TouchableOpacity
              style={tw`flex-row justify-between items-center px-10 ${
                id === selected?.id && "bg-gray-200"
              }`}
              onPress={() => setSelected(item)}
            >
              <Image
                style={{ width: 100, height: 100, resizeMode: "contain" }}
                source={{ uri: "https://links.papareact.com/7pf" }}
              />
              <View style={tw`-ml-6`}>
                <Text>From: {from}</Text>
                <Text>To: {to}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <View style={tw`mt-auto border-t border-gray-200`}>
          <TouchableOpacity
            disabled={!selected}
            style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}
            onPress={() => {
              navigation.navigate(TravelScreen);
            }}
          >
            <Text style={tw`text-center text-white text-xl`}>
              Confirmar Viagem
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RidesScreen;

const styles = StyleSheet.create({});
