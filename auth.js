async function signIn(type, formData) {
  // Define static credentials
  const staticUsername = "admin";
  const staticPassword = "password123";

  if (type === "credentials") {
    const { username, password } = formData;

    // Check if the provided credentials match the static credentials
    if (username === staticUsername && password === staticPassword) {
      return { success: true }; // Authentication successful
    } else {
      const error = new Error("Invalid credentials");
      error.type = "CredentialsSignin";
      throw error; // Authentication failed
    }
  } else {
    throw new Error("Unsupported sign-in type");
  }
}


export default signIn