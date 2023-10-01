import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const handleGoogleSignUp = () => {
    // console.log("google");
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((err) => console.log(err));
  };
  const handleGitHubSignUp = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser);
      })
      .catch((err) => console.log(err));
  };

  const handleSignOut = () => {
    signOut(auth)
      .then((result) => {
        console.log(result);
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign out </button>
      ) : (
        <>
          <button onClick={handleGoogleSignUp}>Google Sign In</button>
          <button onClick={handleGitHubSignUp}>GitHub Sign In</button>
        </>
      )}
      {user && (
        <div>
          <h2>User : {user.displayName}</h2>
          <p>email : {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Home;
