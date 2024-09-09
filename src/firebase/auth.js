import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { jwtDecode } from "jwt-decode";

export const doSignInWithEmailAndPassword = async (email, password) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCred.user.getIdToken();
  localStorage.setItem("accessToken", token);
  const decoded = jwtDecode(token);
  localStorage.setItem("role", decoded.role);
  console.log("decoded", decoded);
  if (decoded.role === "admin") {
    window.location.href = "/dealers";
  } else if (decoded.role === "dealer") {
    window.location.href = "/customers";
  } else if (decoded.role === "customer") {
    window.location.href = "/dashboard";
  }

  // window.location.href = "/";
};

export const doSignOut = async () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  window.location.href = "/";
  return auth.signOut();
};
