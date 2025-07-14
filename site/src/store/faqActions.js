import { getFirestore, collection, getDocs } from "firebase/firestore"; // Correct imports
import { FETCH_FAQS_REQUEST, FETCH_FAQS_SUCCESS, FETCH_FAQS_FAILURE } from './actionTypes';

// Action to fetch FAQ data
export const fetchFaqs = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_FAQS_REQUEST });

    try {
      // Get Firestore database instance
      const db = getFirestore();

      // Reference the faqs collection
      const faqsCollection = collection(db, "FAQ");

      // Get the documents from the collection
      const querySnapshot = await getDocs(faqsCollection);

      const faqs = [];
      querySnapshot.forEach((doc) => {
        faqs.push(doc.data()); // Push data from each document
      });

      dispatch({ type: FETCH_FAQS_SUCCESS, payload: faqs });
    } catch (error) {
      dispatch({ type: FETCH_FAQS_FAILURE, error: error.message });
    }
  };
};
