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
import { selectOrigin } from "../slices/navSlice";

// array com informação que vai aparecer no ecrã
// cada um com id diferente e ecrã depois
const data = [
  {
    id: "123",
    title: "Passageiro",
    screen: "PassengerScreen",
  },
  {
    id: "456",
    title: "Condutor",
    screen: "DriverScreen", // not implemented
  },
];

const NavOptions = () => {
  // funcao da library para mudar de ecrãs
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  //const socket = io("http://192.168.1.122:3000");

  return (
    /* // componente que recebe dados (neste caso um array) e faz render de cada
      item consoante a info de cada index // sempre que há uma list, deve haver
      uma key. Uma key torna o react mais otimizado. Exemplo: só dá render de
      info que mudou */
    <View>
      <Text style={tw`text-4xl mt-10 text-black font-bold mx-auto`}>
        Entrar como{" "}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id} //keyExtractor define o id como sendo a key/identificador único
        renderItem={({ item }) => (
          <TouchableOpacity
            horizontal
            onPress={() => navigation.navigate(item.screen)} //navigate recebe o nome do ecrã (String) definido em stack screen (neste caso a info está em item.screen)
            style={tw`pl-6 p-12 mt-10 bg-gray-200 mx-auto w-10/12`}
            disabled={!origin}
          >
            {/*se não houver origem, opacity -> 20% e disabled*/}
            {/* </TouchableOpacity> */}
            {/* <View style={tw`${!origin && "opacity-20"}`}> */}
            <View style={tw`flex-1 flex-row items-center`}>
              {/* <View> */}
              <Text style={tw`mt-2 text-xl w-28 font-semibold mr-12`}>
                {item.title}
              </Text>
              <Icon
                style={tw`p-2 bg-black mb-2 rounded-full w-10 mt-5`}
                name="arrowright"
                color="white"
                type="antdesign"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default NavOptions;
