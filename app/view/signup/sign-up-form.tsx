"use client";

import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import { auth, db } from "../../../database/firebase";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [timer, setTimer] = useState(0);
  const [username, setUsername] = useState("");
  const [showUsernameForm, setShowUsernameForm] = useState(false);

  const handleSendOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setProcessing(true);
      await axios.post("http://localhost:5001/send-otp", { email });
      setOtpSent(true);
      setTimer(60);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setProcessing(true);
      await axios.post("http://localhost:5001/verify-otp", {
        email,
        otp: otp.trim(),
      });

      localStorage.setItem("otpUser", email);

      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.username) {
          localStorage.setItem("username", data.username);
          router.push(`/view/home/${data.username}`);
        } else {
          setShowUsernameForm(true);
        }
      } else {
        await setDoc(userRef, { email });
        setShowUsernameForm(true);
      }

      setOtp("");
      setOtpSent(false);
      setError("");
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("Invalid OTP or expired.");
    } finally {
      setProcessing(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setProcessing(true);
      setError("");
      await axios.post("http://localhost:5001/send-otp", { email });
      setTimer(60);
    } catch (err) {
      setError("Failed to resend OTP.");
    } finally {
      setProcessing(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      if (!userEmail) throw new Error("No email from Google user");

      localStorage.setItem("otpUser", userEmail);
      const userRef = doc(db, "users", userEmail);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        if (data.username) {
          localStorage.setItem("username", data.username);
          router.push(`/view/home/${data.username}`);
        } else {
          setShowUsernameForm(true);
        }
      } else {
        await setDoc(userRef, { email: userEmail });
        setShowUsernameForm(true);
      }
    } catch (err) {
      setError("Google sign-in failed.");
      console.error(err);
    }
  };

  const handleUsernameSubmit = async () => {
    const email = localStorage.getItem("otpUser");
    if (email && username.trim()) {
      const realUsername = username.trim();
      const slug = `${realUsername.toLowerCase().replace(/\s+/g, "-")}-${uuidv4().slice(0, 6)}`;
  
      await setDoc(doc(db, "users", email), {
        email,
        username: realUsername,
        slug, // only used for routing
      }, { merge: true });
  
      localStorage.setItem("username", realUsername);
      localStorage.setItem("slug", slug);
  
      router.push(`/view/home/${slug}`);
    }
  };
  

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-sm p-6 space-y-6 bg-[#1e1e1e] rounded-xl shadow-md">
        {showUsernameForm ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Create a Username</h2>
            <input
              type="text"
              placeholder="Enter a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#2e2e2e] focus:outline-none"
            />
            <button
              onClick={handleUsernameSubmit}
              className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded"
            >
              Save Username
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl text-center font-semibold">
              {otpSent ? "Enter OTP" : "Sign in with Email or Social"}
            </h2>

            <div className="space-y-2">
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black py-2 rounded hover:bg-gray-100"
              >
                Continue with Google
              </button>
              <button
                onClick={() => {}}
                className="w-full bg-[#161616] text-white py-2 rounded hover:bg-[#333]"
              >
                Continue with Apple
              </button>
              <button
                onClick={() => {}}
                className="w-full bg-[#2F2FDC] text-white py-2 rounded hover:bg-[#4646f0]"
              >
                Continue with Microsoft
              </button>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4 pt-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  className="w-full px-4 py-2 rounded bg-[#2e2e2e] focus:outline-none"
                  required
                />
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
                >
                  {processing ? "Sending..." : "Send OTP"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 pt-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-[#2e2e2e] focus:outline-none"
                  required
                  disabled={timer === 0}
                />
                <p className="text-sm text-gray-400">
                  {timer > 0 ? `OTP expires in ${timer}s` : "OTP expired."}
                </p>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button
                  type="submit"
                  disabled={processing || timer === 0}
                  className="w-full bg-green-600 hover:bg-green-700 py-2 rounded"
                >
                  {processing ? "Verifying..." : "Verify OTP"}
                </button>
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="w-full mt-2 text-sm text-blue-400 hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
