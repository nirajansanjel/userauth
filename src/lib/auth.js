import app from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "./upCl";


export const auth = getAuth(app);

export const registerUser = async (email, password,file) => {
   let photoURL = "";

    if (file) {
      photoURL = await uploadToCloudinary(file);
    }
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
    photoURL: photoURL,
  });

  toast.success("Registration Successful");
  return user;
};
export const loginUser = async (email, password) => {
  const user = await signInWithEmailAndPassword(auth, email, password);
  toast.success("Login Successfull!");
  return user;
};
