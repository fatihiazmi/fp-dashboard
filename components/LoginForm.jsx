import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleForm = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
      setIsLoggedIn(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <div className="card bg-base-300 shadow-xl p-16 pt-6 max-w-[60rem] m-auto">
          <div className="card-body">
            <h2 className="card-title m-auto pb-10">
              First Pride Dashboard Login
            </h2>
            <div className="flex flex-col gap-4">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
