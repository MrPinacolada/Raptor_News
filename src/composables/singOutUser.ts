import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
let auth = getAuth();
let singOutUser = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      location.replace("/");
      location.reload();
    });
  };
  export default singOutUser