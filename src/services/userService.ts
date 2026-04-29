import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function createUserProfile(user: any) {
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    role: "farmer", 
    createdAt: new Date()
  });
}