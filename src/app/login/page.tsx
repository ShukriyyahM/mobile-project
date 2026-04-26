"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";


export default function Login() {
    const router = useRouter();

    const [email,setEmail] = useState(""); 
    const [password,setPassword] = useState(""); 
    const [loading,setLoading] = useState(false); 
    

    const handleLogin = async (e:any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);

            localStorage.setItem("auth", "true");

            const role = "farmer";
            localStorage.setItem("role", role)

            router.push("/dashboard");

        } catch (error: any) {
          alert(error.message);
        }

        setLoading(false);
    };

    return (
        <>
          <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-green-700 px-4">
            
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                  
                   <div className="flex flex-col items-center mb-6">
                    <Image 
                       src="/images/Bird.png"
                       alt="logo"
                       width={40}
                       height={40}
                    />
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
                      className="w-full mt-1 px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                   </div>

                <div>
                    <label className="text-sm text-gray-600">Password</label>
                    
                    <input 
                      type="password"
                      required
                      className="w-full mt-1 px-4 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button
                   type="submit"
                   disabled={loading}
                   className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition-transition"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

               </form>

               <div className="text-center mt-4">
                <Link href="/" className="text-sm text-green-800 hover:underline">
                    ← Back to Home
                </Link>
               </div>

            </div>
            
           
        </main>
        </>
    )
}