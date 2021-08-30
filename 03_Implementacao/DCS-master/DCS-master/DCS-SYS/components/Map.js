import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import Polyline from "@mapbox/polyline";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null); //Referencia ao mapa para ter info de qualquer spot

  const dispatch = useDispatch();

  useEffect(() => {
    // corre quando o component ou app rerenders
    if (!origin || !destination) return; // caso não haja um dos dois não corre

    // zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]); //neste caso corre quando a origin/destination muda

  /*const originDir = {
    latitude: Number(origin.location.lat),
    longitude: Number(origin.location.lng),
  };
  let destinationDir;
  useEffect(() => {
    if (!destination) return; // caso não haja um dos dois não corre

    //console.log(originDir);

    destinationDir = {
      latitude: Number(destination.location.lat),
      longitude: Number(destination.location.lng),
    };
    //console.log(destinationDir);
  }, [destination]); //neste caso corre quando a origin/destination muda*/

  return (
    <MapView
      ref={mapRef}
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
      {/* {origin?.location && destination?.location && (
        <MapViewDirections
          lineDashPattern={[0]}
          origin={originDir}
          destination={destinationDir}
          apikey={GOOGLE_MAPS_APIKEY}
          // strokeWidth={3}
          // strokeColor="black"
        />
      )} */}
      {/* ? -> caso seja null não dá break, só aparece o marker se houver  */}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

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
  );
};

export default Map;

const styles = StyleSheet.create({});
