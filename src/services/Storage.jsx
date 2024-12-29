import { storage } from "./FireBase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadImage = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};
