import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../util/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiUtils } from "../Utils/ApiUtil";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const googleProvider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();

  useEffect(() => {
    console.log("user changed");
  }, [user]);

  const VerifyUser = async (user) => {
    if (user) {
      var userObj = {
        Name: user.displayName,
        Email: user.email,
        Id: user.uid,
      };
      const response = await ApiUtils.Get(`users/${user.uid}`);
      if (!(response.status == 200)) {
        const response = await ApiUtils.Post("users", userObj);
      }
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      await VerifyUser(result.user);
      navigate("/PoopyPoClient");
    } catch (error) {
      console.log(error);
    }
  };

  const facebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, fbProvider);
      const credantial = FacebookAuthProvider.credentialFromResult(result);
      const token = credantial?.accessToken;
      let photoUrl = result.user.photoURL + "?height=500&access_token=" + token;
      await updateProfile(auth.currentUser, { photoURL: photoUrl });
      setUser(result?.user);
      navigate("/PoopyPoClient");
    } catch (error) {
      console.log(error);
      alert("User already exists please login with google");
    }
  };

  return (
    <div className="shadow-xl mt-10 p-10 text-gray-700 rounded-lg">
      <h2 className="text-3xl font-medium">Join today!</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in with one of the providers</h3>
        <div className="flex flex-col gap-4">
          <button
            onClick={googleLogin}
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
          >
            <FcGoogle className="text-2xl" />
            Sign in with Google
          </button>
          <button
            onClick={facebookLogin}
            className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
          >
            <AiFillFacebook className="text-2xl text-blue-300" />
            Sign in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
