import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const data = [
  {
    id: "123",
    date: "28/08",
    hour: "19:00",
    origin: "Sitio de origem ajsaksjadjsdja",
    destination: "Code Street,  London, UK",
  },
  {
    id: "456",
    date: "28/08",
    hour: "23:00",
    origin: "Sitio de origemd asdas",
    destination: "Casa no sitio",
  },
];
const DriverRideScreen = () => {
  return (
    /* // componente que recebe dados (neste caso um array) e faz render de cada
      item consoante a info de cada index // sempre que há uma list, deve haver
      uma key. Uma key torna o react mais otimizado. Exemplo: só dá render de
      info que mudou */
    <View>
      <Text style={tw`text-4xl mt-20 mb-10 text-black font-bold mx-auto`}>
        Viagens a realizar
      </Text>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[tw`bg-gray-300`, { height: 1 }]} />
        )}
        renderItem={({ item: { date, hour, origin, destination, icon } }) => (
          <TouchableOpacity style={tw` flex-row items-center p-6 mr-5`}>
            <Icon
              style={tw`mr-4 rounded-full bg-gray-400 p-3`}
              name={"car-outline"}
              type="ionicon"
              color="white"
              size={18}
            />
            <View>
              <Text style={tw`font-semibold text-lg`}>
                {hour} - {date}
              </Text>
              <Text style={tw`text-gray-500`}>
                {origin} ---> {destination}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default DriverRideScreen;
