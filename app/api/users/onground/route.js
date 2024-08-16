import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore/lite";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export async function GET(request) {
  try {
    const fetchUserData = async () => {
      try {
        const usersCol = collection(db, "onground-form");
        const userSnapshot = await getDocs(usersCol);
        const usersList = await Promise.all(
          userSnapshot.docs.map(async (doc) => {
            try {
              // const storage = getStorage();
              // const imageRef = ref(storage, doc.data().receipt);
              // const imageUrl = await getDownloadURL(imageRef);
              const JSTimestamp = doc.data().timestamp.toDate();
              const data = doc.data();
              // return { id: doc.id, ...data, receipt: imageUrl, timestamp: JSTimestamp };
              return { id: doc.id, ...data, timestamp: JSTimestamp };
            } catch (error) {
              console.error("Error processing document:", doc.id, error);
              return null; // Return null or handle the error as needed
            }
          })
        );
        return usersList.filter((user) => user !== null); // Filter out any null values
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Error fetching user data");
      }
    };

    const userData = await fetchUserData();

    return new Response(JSON.stringify(userData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
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
