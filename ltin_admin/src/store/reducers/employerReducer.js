const initialState = {
    list: [],
  };
  
  export default function employerReducer(state = initialState, action) {
    switch (action.type) {
      case "SET_EMPLOYERS":
        return { ...state, list: action.payload };
      default:
        return state;
    }
  }