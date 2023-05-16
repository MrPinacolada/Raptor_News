import { getAuth, signOut } from "firebase/auth";
let auth = getAuth();
let singOutUser = () => {
  signOut(auth).then(() => {
    localStorage.removeItem("auth-token");
    location.replace("/");
    location.reload();
  });
};
export default singOutUser;
