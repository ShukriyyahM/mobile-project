"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (error: any) {
      setMessage("Failed to send reset email. Check the email address.");
    }

    setLoading(false);
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
          <h1 className="text-xl font-bold text-green-900 mt-2">
            Reset Password
          </h1>
        </div>

        
        <form onSubmit={handleReset} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">
              Enter your email
            </label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-2 border text-gray-600 rounded-lg focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition flex items-center justify-center"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

       
        {message && (
          <p className="text-sm text-center mt-4 text-green-700">
            {message}
          </p>
        )}

       
        <div className="text-center mt-4">
          <Link href="/login" className="text-sm text-green-700 hover:underline">
            ← Back to Login
          </Link>
        </div>

      </div>
    </main>
  );
}