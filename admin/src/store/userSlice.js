// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const snapshot = await getDocs(userCollectionRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

export const addUser = createAsyncThunk("users/add", async (user) => {
  const docRef = await addDoc(userCollectionRef, user);
  return { id: docRef.id, ...user };
});

export const updateUser = createAsyncThunk("users/update", async (user) => {
  const userDoc = doc(db, "users", user.id);
  await updateDoc(userDoc, user);
  return user;
});

export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await deleteDoc(doc(db, "users", id));
  return id;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex(u => u.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(u => u.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
