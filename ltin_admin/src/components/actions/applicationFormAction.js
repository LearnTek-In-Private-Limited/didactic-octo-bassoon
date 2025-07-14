import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export const getApplications = () => async (dispatch) => {
  const snapshot = await getDocs(collection(db, "applications"));
  const applications = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  dispatch({ type: "SET_APPLICATIONS", payload: applications });
};

export const addApplication = (data) => async (dispatch) => {
  await addDoc(collection(db, "applications"), data);
  dispatch(getApplications());
};

export const updateApplication = (id, data) => async (dispatch) => {
  const ref = doc(db, "applications", id);
  await updateDoc(ref, data);
  dispatch(getApplications());
};

export const deleteApplication = (id) => async (dispatch) => {
  const ref = doc(db, "applications", id);
  await deleteDoc(ref);
  dispatch(getApplications());
};
