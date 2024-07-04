import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export async function GET(request) {
  const fetchUserData = async () => {
    const usersCol = collection(db, "form-submission");
    const userSnapshot = await getDocs(usersCol);
    const usersList = await Promise.all(
      userSnapshot.docs.map(async (doc) => {
        const storage = getStorage();
        const imageRef = ref(storage, doc.data().receipt);
        const imageUrl = await getDownloadURL(imageRef);
        const JSTimestamp = doc.data().timestamp.toDate()
        const data = doc.data();
        return { id: doc.id, ...data, receipt: imageUrl, timestamp: JSTimestamp };
      })
    );
    return usersList;
  };

  const userData = await fetchUserData();

  return Response.json(userData);
}

export async function PATCH(request) {
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
