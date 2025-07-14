const initialState = {
    list: [],
  };
  
  const companyReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_COMPANIES":
        return { ...state, list: action.payload };
  
      case "ADD_COMPANY":
        return { ...state, list: [...state.list, action.payload] };
  
      case "UPDATE_COMPANY":
        return {
          ...state,
          list: state.list.map((company) =>
            company.id === action.payload.id ? action.payload : company
          ),
        };
  
      case "DELETE_COMPANY":
        return {
          ...state,
          list: state.list.filter((company) => company.id !== action.payload),
        };
  
      default:
        return state;
    }
  };
  
  export default companyReducer;
  