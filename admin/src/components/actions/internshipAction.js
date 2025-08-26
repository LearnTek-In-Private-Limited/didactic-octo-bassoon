import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const getInternships = () => async (dispatch) => {
  const snapshot = await getDocs(collection(db, "internships"));
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  dispatch({ type: "SET_INTERNSHIPS", payload: list });
};

export const addInternship = (data) => async (dispatch) => {
  await addDoc(collection(db, "internships"), data);
  dispatch(getInternships());
};

export const updateInternship = (id, data) => async (dispatch) => {
  await updateDoc(doc(db, "internships", id), data);
  dispatch(getInternships());
};

export const deleteInternship = (id) => async (dispatch) => {
  await deleteDoc(doc(db, "internships", id));
  dispatch(getInternships());
};
