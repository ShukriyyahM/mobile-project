"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";


export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

 
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
   
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
     );

     const user = userCredential.user;

    
     const docRef = doc(db, "users", user.uid);
     const docSnap = await getDoc(docRef);

     if (docSnap.exists()) {
      const role = docSnap.data().role;

     
      localStorage.setItem("role", role);

      
      if (role === "admin") {
        router.push("/dashboard");
      } else if (role === "investigator") {
        router.push("/dashboard/report");
      } else {
        router.push("/dashboard/report/create");
      }
    } else {
      alert("User role not found");
    }

  } catch (error: any) {
    alert("Invalid email or password");
  }

  setLoading(false);
};

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-900 px-4">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        
        <div className="flex flex-col items-center mb-6">
          <Image src="/images/bird.png" alt="logo" width={40} height={40} />
          <h1 className="text-xl font-bold text-green-900 mt-2">
            AviFlu Login
          </h1>
        </div>

        
        <form onSubmit={handleLogin} className="space-y-4">

          
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-2 border text-gray-600 rounded-lg focus:ring-2 focus:ring-green-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          
          <div className="relative">
            <label className="text-sm text-gray-600">Password</label>

            <input
              type={showPassword ? "text" : "password"}
              required
              className="w-full mt-1 px-4 py-2 border text-gray-600 rounded-lg focus:ring-2 focus:ring-green-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            
            {/* <p className={`text-xs mt-1 ${
              getStrength() === "Weak"
                ? "text-red-500"
                : getStrength() === "Medium"
                ? "text-yellow-500"
                : "text-green-600"
            }`}>
              Strength: {getStrength()}
            </p> */}
          </div>

          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-green-700 gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>

            <Link href="/forgot-password" className="text-green-700 hover:underline">
              Forgot password?
            </Link>
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition flex items-center justify-center"
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Login"
            )}
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