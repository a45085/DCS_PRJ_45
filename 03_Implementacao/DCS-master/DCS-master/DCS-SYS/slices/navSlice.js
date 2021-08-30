import { createSlice } from "@reduxjs/toolkit";

// estados inicial
const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  // nome da slice que se está a criar
  name: "nav",
  //estado inicial
  initialState,
  //cria funcoes que possibilitam obter e definir info na slice
  reducers: {
    // state -> estado global no momento
    // action -> o q se vai passar após fazer dispatch a partir de um certo componente
    // payload - informacao dentro da action
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

// possibilita que toda a app tenha acesso a cada ação - Destructuring
export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

// Selectors (getters) => buscar a info de qualquer lado do estado atual

// arrow functions => direct returns sem '{}'
export const selectOrigin = (state) => state.nav.origin;

export const selectDestination = (state) => state.nav.destination;

export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;

// export navigation slice para que esteja "hooked up" à store
// default -> primary export from this file
export default navSlice.reducer;
