
const initialState = {
    list: [],
  };
  
  const applicationFormReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_APPLICATIONS":
        return { ...state, list: action.payload };
  
      case "UPDATE_APPLICATION":
        return {
          ...state,
          list: state.list.map((application) =>
            application.id === action.payload.id
              ? { ...application, ...action.payload.data }
              : application
          ),
        };
  
      case "DELETE_APPLICATION":
        return {
          ...state,
          list: state.list.filter((application) => application.id !== action.payload.id),
        };
  
      default:
        return state;
    }
  };
  
  export default applicationFormReducer;
  