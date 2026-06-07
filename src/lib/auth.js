import app from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";
export const auth = getAuth(app);
export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const user = userCredential.user;

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email: user.email,
    role: "user",
  });

  toast.success("Registration Successful");
  return user;
};
export const loginUser = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  toast.success("Login Successfull!");
  return user;
};
