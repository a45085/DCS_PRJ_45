import React, { useState, useRef, useEffect } from "react";
import { Image } from "react-native";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Modal,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import DriverRideScreen from "../screens/DriverRideScreen";

const data = [
  {
    hora: "19:00",
    from: "Barreiro",
    to: "Lisbon",
  },
];

const ModalPopup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  const scaleValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View>
      <Modal transparent visible={showModal}>
        <Animated.View style={styles.modalBackGround}>
          <View style={[styles.modalContainer]}>{children}</View>
        </Animated.View>
      </Modal>
    </View>
  );
};

const ModalDriver = () => {
  const [visible, setVisible] = useState(true);

  const navigation = useNavigation();
  var otherTrips = () => {
    navigation.navigate(DriverRideScreen);
  };

  functionCombined = () => {
    setVisible(false);
    otherTrips();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ModalPopup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>Tem uma viagem marcada</Text>
          <View style={[styles.textRows, { marginTop: 10 }]}>
            <Text style={styles.textTitle}>Hora: </Text>
            <Text style={styles.text}>{data[0].hora}</Text>
          </View>
          <View style={styles.textRows}>
            <Text style={styles.textTitle}>Origem: </Text>
            <Text style={styles.text}>{data[0].from}</Text>
          </View>
          <View style={styles.textRows}>
            <Text style={styles.textTitle}>Destino: </Text>
            <Text style={styles.text}>{data[0].to}</Text>
          </View>
          <View style={[styles.header, { marginTop: 10 }]}>
            <TouchableOpacity
              style={tw`w-10/12 mt-3 bg-green-400 mx-auto rounded-full items-center p-3`}
              onPress={() => setVisible(false)}
            >
              <Text style={tw`text-lg p-4 mx-1 font-bold rounded-full px-5`}>
                Confirmar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`w-10/12  mt-5 bg-gray-300 mx-auto rounded-full items-center p-3`}
              onPress={() => functionCombined()}
            >
              <Text style={tw`text-lg p-4 mx-1 font-bold  rounded-full px-5`}>
                Outras viagens
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>
    </View>
  );
};

export default ModalDriver;

const styles = StyleSheet.create({
  title: {
    marginBottom: 15,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    marginVertical: 5,
    fontSize: 17,
    textAlign: "center",
    flexShrink: 1,
  },
  textTitle: {
    marginVertical: 5,
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
  textRows: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
