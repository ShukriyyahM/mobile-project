"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/user-not-found") {
        setError("User not found");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else {
        setError("Login failed. Try again.");
      }
    }
  };

  const handleReset = async () => {
    if (!email) {
      setError("Enter your email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch {
      setError("Failed to send reset email");
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-600">

    {/* ✅ NAVBAR */}
    <header className="w-full flex items-center justify-between px-6 py-4 text-white">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/images/bird.png"
          alt="logo"
          width={30}
          height={30}
        />
        <span className="font-bold text-lg">AviFlu</span>
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <Link href="#about" className="hover:underline">
          About
        </Link>

        <Link href="#features" className="hover:underline">
          Features
        </Link>
      </nav>
    </header>

    {/* ✅ LOGIN FORM */}
    <div className="flex items-center justify-center px-4 mt-10">

      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-6">
          <Image 
            src="/images/bird.png"
            alt="logo"
            width={40}
            height={40}
          />
          <h1 className="text-xl font-bold text-green-900 mt-2">
            AviFlu Login
          </h1>
        </div>

        {/* Errors */}
        {error && <p className="text-red-500 mb-3">{error}</p>}
        {message && <p className="text-green-600 mb-3">{message}</p>}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button className="w-full bg-green-900 text-white py-3 rounded-lg hover:bg-green-800">
          Login
        </button>

        {/* Forgot Password */}
        <p
          onClick={handleReset}
          className="text-sm text-blue-600 mt-4 cursor-pointer text-center"
        >
          Forgot Password?
        </p>

      </form>

    </div>
  </div>
);
}