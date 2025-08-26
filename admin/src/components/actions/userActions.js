
// 📁 src/redux/user/userActions.js
import { db } from "../../firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from "./userTypes";

const userRef = collection(db, "users");

export const getUsers = () => async (dispatch) => {
  const snapshot = await getDocs(userRef);
  const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  dispatch({ type: GET_USERS, payload: users });
};

export const addUser = (user) => async (dispatch) => {
  const docRef = await addDoc(userRef, user);
  dispatch({ type: ADD_USER, payload: { id: docRef.id, ...user } });
};

export const updateUser = (id, user) => async (dispatch) => {
  const userDoc = doc(db, "users", id);
  await updateDoc(userDoc, user);
  dispatch({ type: UPDATE_USER, payload: { id, ...user } });
};

export const deleteUser = (id) => async (dispatch) => {
  const userDoc = doc(db, "users", id);
  await deleteDoc(userDoc);
  dispatch({ type: DELETE_USER, payload: id });
};

