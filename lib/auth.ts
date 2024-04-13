import {
  onAuthStateChanged as _onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";

import { auth } from "@/server/initFirebase";
import { useRouter } from "next/router";

export function onAuthStateChanged(cb: (user: FirebaseUser | null) => void) {
  return _onAuthStateChanged(auth, (user) => cb(user));
}

export async function signIn() {}

export async function signOut() {
  try {
    auth.signOut();
  } catch (error) {
    console.error("Error signing out.", error);
  }
}
