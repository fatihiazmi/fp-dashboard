import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore/lite";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const userRef = doc(db, "form-submission", id);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  
  if (userSnap.exists) {
    // userData.eligibile ==
  } else {
    console.error("That user doesnt exist");
  }

  return Response.json({ userData });
}
