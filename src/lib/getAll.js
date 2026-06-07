import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));

  const users = [];

  querySnapshot.forEach((doc) => {
    users.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return users;
};
