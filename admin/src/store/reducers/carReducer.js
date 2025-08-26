import { FETCH_CARS, ADD_CAR, UPDATE_CAR, DELETE_CAR } from "../../components/actions/carActions";

const initialState = {
  cars: [],
};

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CARS:
      // Ensure the state is updated with the fetched cars
      return { ...state, cars: action.payload };

    case ADD_CAR:
      // Add new car without mutating the existing state
      return { ...state, cars: [...state.cars, action.payload] };

    case UPDATE_CAR:
      // Update a car by matching the id, and replace it with the updated one
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload.id ? { ...car, ...action.payload } : car
        ),
      };

    case DELETE_CAR:
      // Remove the car by id and return a new state
      return {
        ...state,
        cars: state.cars.filter((car) => car.id !== action.payload),
      };

    default:
      return state;
  }
};

export default carReducer;
