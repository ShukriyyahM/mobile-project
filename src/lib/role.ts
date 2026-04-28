import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "./firebase";

export async function getUserRole() {
  const user = auth.currentUser;
  if (!user) return null;

  const snap = await getDoc(doc(db, "users", user.uid));
  return snap.data()?.role;
}