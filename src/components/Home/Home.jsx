import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Home = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

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

  return (
    <div>
      <button onClick={handleGoogleSignUp}>Google</button>
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
