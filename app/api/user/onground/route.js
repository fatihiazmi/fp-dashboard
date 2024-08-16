import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
  
    const userRef = doc(db, "onground-form", id);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();
  
    if (userSnap.exists) {
      // userData.eligibile ==
    } else {
      console.error("That user doesnt exist");
    }
  
    return Response.json({ userData });
  }