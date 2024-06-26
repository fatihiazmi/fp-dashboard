import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const SignOut = () => {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  if(!user){
    return null
  }

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
