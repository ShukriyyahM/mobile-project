"use client";

import Link from "next/link";
import { FileText, Home, Settings,  LogOut, FileCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function DashboardLayout({children} : any) {
    const router = useRouter ();

    useEffect(() => {
        const isAuth = localStorage.getItem("auth");

        if (!isAuth) {
            router.push("/login");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        router.push("/login");
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-center">

                <div>
                    <h1 className="text-2xl font-bold text-green-800 mb-10">
                        AviFlu
                    </h1>

                    <nav className="space-y-4">
                        <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-green-800">
                            <Home size={18} /> Dashboard
                        </Link>

                         <Link href="/dashboard/report" className="flex items-center gap-2 text-gray-700 hover:text-green-800">
                            <FileText size={18} /> Reports
                        </Link>

                         <Link href="/dashboard/settings" className="flex items-center gap-2 text-gray-700 hover:text-green-800">
                            <Settings size={18} /> Settings
                        </Link>

                        <Link href="/dashboard/report/create" className="flex items-center gap-2 text-gray-700 hover:text-green-800">
                            <FileCheck size={18} /> New Report
                        </Link>
                    </nav>
                </div>

                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600"
                >
                  <LogOut size={18} />  Logout
                </button>
            </aside>

            <main className="flex p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );

}
