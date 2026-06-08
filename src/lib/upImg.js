import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export const uploadProfileImage = async (file, uid) => {
  if (!file) return null;

  const imageRef = ref(storage, `profileImages/${uid}`);

  await uploadBytes(imageRef, file);

  const url = await getDownloadURL(imageRef);

  return url;
};