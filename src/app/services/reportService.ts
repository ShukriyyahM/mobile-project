import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function createReport(data: any) {
  return await addDoc(collection(db, "reports"), {
    ...data,
    createdAt: new Date()
  });
}

export async function getReports() {
  const snap = await getDocs(collection(db, "reports"));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}