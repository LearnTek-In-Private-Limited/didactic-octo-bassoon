const initialState = {
  list: [],
};

const internshipReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INTERNSHIPS":
      return { ...state, list: action.payload };

    case "ADD_INTERNSHIP":
      return {
        ...state,
        list: [...state.list, { ...action.payload, status: "pending" }],
      };

    case "UPDATE_INTERNSHIP":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload }
            : item
        ),
      };

    case "DELETE_INTERNSHIP":
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.payload),
      };

    case "SET_INTERNSHIP_STATUS":
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item
        ),
      };

    default:
      return state;
  }
};

export default internshipReducer;
