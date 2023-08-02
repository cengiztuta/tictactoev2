import React, { useState, useEffect } from "react";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigate } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import "../App.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase-config";
var rootStyle = {
  color: "white",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const PhoneSignup = () => {
  const [error, setError] = useState(null);
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");
  const navigate = useNavigate();

  const appVerifier = window.recaptchaVerifier;
  const [user, setUser] = useState({
    mynumber: "",
    nickName: "",
    otp: "",
  });

  useEffect(() => {
    setUser({
      ...user,
      mynumber: user.mynumber,
    });
  }, [user.mynumber]);

  const handleRecaptcha = () => {
    console.log("number", user.mynumber);
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {},
        "expired-callback": () => {
          setError("Recaptcha expired");
        },
      }
    );
    signInWithPhone();
  };

  const signInWithPhone = () => {
    const isNumberExists = async () => {
      const usersCollectionRef = collection(db, "users");
      const q = query(usersCollectionRef, where("phone", "==", user.mynumber));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return false;
      } else {
        return true;
      }
    };
    isNumberExists().then((res) => {
      if (res) {
        alert("Number already exists. Please login");
      } else {
        const appVerifier = window.recaptchaVerifier;
        console.log("number after else", user.mynumber);
        signInWithPhoneNumber(auth, user.mynumber, appVerifier)
          .then((result) => {
            window.confirmationResult = result;
            setshow(true);
          })
          .catch((error) => {
            setError(error.message);
          });
      }
    });
  };

  const handleOtp = () => {
    try {
      window.confirmationResult.confirm(user.otp).then(async (result) => {
        const usersCollectionRef = collection(db, "users");
        const data = {
          username: user.nickName,
          win: 0,
          loss: 0,
          tie: 0,
          uid: result.user.uid,
          phone: user.mynumber,
          TotalGames: 0,
          date: "",
        };
        const docRef = await setDoc(
          doc(usersCollectionRef, result.user.uid),
          data
        );

        navigate("/");
      });
    } catch (error) {
      setError(error.message);
      alert("Invalid OTP");
    }
  };
  return (
    <main style={rootStyle}>
      <div className="signin-screen">
        <div
          style={{
            display: !show ? "block" : "none",
            width: "50%",
            height: "200%",
            background: "gray",
          }}
        >
          <label
            style={{
              display: "flex",
              justifyContent: "center",
              color: "White",
              fontSize: 55,
            }}
          >
            TİC TAC TOE
          </label>

          <div className="nickname">
            <label> NICK NAME </label>
            <input
              value={user.nickName}
              onChange={(e) => {
                setUser({ ...user, nickName: e.target.value });
              }}
              className="nickname-input"
            />
          </div>

          <div className="nickname">
            <label> PHONE NUMBER </label>
            <input
              className="nickname-input"
              value={user.mynumber}
              onChange={(e) => {
                setUser({ ...user, mynumber: e.target.value });
              }}
              placeholder="please firstly write your country code"
            />
            <button
              className="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Sign In
            </button>
            <button
              className="button"
              onClick={() => {
                handleRecaptcha();
              }}
            >
              Sign Up
            </button>
          </div>
          <br />
          <br />
          <div id="recaptcha-container"></div>
        </div>
        <main
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingRight: "15%",
          }}
        >
          <div
            style={{
              display: show ? "block" : "none",
              height: "50%",

              alignSelf: "center",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "300%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "gray",
              }}
            >
              <input
                style={{ textAlign: "center", height: "5vh" }}
                type="text"
                placeholder={"Enter your OTP"}
                onChange={(e) => {
                  setUser({ ...user, otp: e.target.value });
                }}
              ></input>
              <br />
              <br />
              <button
                onClick={handleOtp}
                style={{ height: "5vh", width: "10vh" }}
              >
                Verify
              </button>
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default PhoneSignup;
