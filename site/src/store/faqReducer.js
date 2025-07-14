import { FETCH_FAQS_REQUEST, FETCH_FAQS_SUCCESS, FETCH_FAQS_FAILURE } from './actionTypes';

// Initial state for FAQs
const initialState = {
  loading: false,
  faqs: [],
  error: null
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FAQS_REQUEST:
      return { ...state, loading: true };
    case FETCH_FAQS_SUCCESS:
      return { ...state, loading: false, faqs: action.payload };
    case FETCH_FAQS_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default faqReducer;
