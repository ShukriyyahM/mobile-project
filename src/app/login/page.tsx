"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";


export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    useEffect(() => {
      console.log("ENV TEST:",
        process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
    }, []);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("auth", "true");

      const role = "farmer";
      localStorage.setItem("role", role);

      router.push("/dashboard");

    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  
  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (err: any) {
      setError("Failed to send reset email");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-900 px-4">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/bird.png"
            alt="logo"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold text-green-800 mt-2">
            AviFlu Login
          </h1>
        </div>

        
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

        
        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="text-sm text-gray-900">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-2 border text-gray-700 rounded-lg focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-900">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          
          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-green-800 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

       
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-green-700 hover:underline">
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}