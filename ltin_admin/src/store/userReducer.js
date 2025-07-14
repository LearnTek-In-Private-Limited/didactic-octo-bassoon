
// 📁 src/redux/user/userReducer.js
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from "../components/actions/userTypes";

const initialState = {
  list: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, list: action.payload };
    case ADD_USER:
      return { ...state, list: [...state.list, action.payload] };
    case UPDATE_USER:
      return {
        ...state,
        list: state.list.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        list: state.list.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;

