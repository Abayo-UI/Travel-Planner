"use server"
import { signIn, signOut } from "../auth";

export const login = async() => {
  await signIn("github", { redirectTo:"/trips" })
}

//delete this logout function
//Because I am no longer using it
//am using the signOut function from next-auth/react
export const logout = async() => {
  await signOut( { redirectTo:"/" })  
}
