import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { db } from "../../firebase";
  
  export const getEmployers = () => async (dispatch) => {
    const snapshot = await getDocs(collection(db, "employers"));
    const employers = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: "SET_EMPLOYERS", payload: employers });
  };
  
  export const addEmployer = (data) => async (dispatch) => {
    await addDoc(collection(db, "employers"), data);
    dispatch(getEmployers());
  };
  
  export const updateEmployer = (id, data) => async (dispatch) => {
    const docRef = doc(db, "employers", id);
    await updateDoc(docRef, data);
    dispatch(getEmployers());
  };
  
  export const deleteEmployer = (id) => async (dispatch) => {
    const docRef = doc(db, "employers", id);
    await deleteDoc(docRef);
    dispatch(getEmployers());
  };