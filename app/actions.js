"use server";

export async function updateUser(userId, formData) {
  const eligibileStatus = formData.get("eligible");
  console.log(eligibileStatus);
}
