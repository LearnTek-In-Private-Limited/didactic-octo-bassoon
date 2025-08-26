import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  
  import { db } from "../../firebase"; // assuming you're inside src/components/actions

  export const getCompanies = () => async (dispatch) => {
    const querySnapshot = await getDocs(collection(db, "companies"));
    const companies = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: "SET_COMPANIES", payload: companies });
  };
  
  export const addCompany = (company) => async (dispatch) => {
    await addDoc(collection(db, "companies"), company);
    dispatch(getCompanies());
  };
  
  export const updateCompany = (id, company) => async (dispatch) => {
    await updateDoc(doc(db, "companies", id), company);
    dispatch(getCompanies());
  };
  
  export const deleteCompany = (id) => async (dispatch) => {
    await deleteDoc(doc(db, "companies", id));
    dispatch(getCompanies());
  };
  