import {
    FETCH_DRIVERS,
    ADD_DRIVER,
    UPDATE_DRIVER,
    DELETE_DRIVER,
  } from "../components/actions/driverActions";
  
  const initialState = {
    drivers: [],
  };
  
  const driverReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DRIVERS:
        return { ...state, drivers: action.payload };
      case ADD_DRIVER:
        return { ...state, drivers: [...state.drivers, action.payload] };
      case UPDATE_DRIVER:
        return {
          ...state,
          drivers: state.drivers.map((driver) =>
            driver.id === action.payload.id ? action.payload : driver
          ),
        };
      case DELETE_DRIVER:
        return {
          ...state,
          drivers: state.drivers.filter((driver) => driver.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default driverReducer;
  