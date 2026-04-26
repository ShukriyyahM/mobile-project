"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

       
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/bird.png"
            alt="logo"
            width={35}
            height={35}
          />
          <span className="text-xl font-bold text-green-800">
            AviFlu
          </span>
        </Link>

        
        {!isLoginPage && (
          <nav className="hidden md:flex items-center gap-8 text-gray-600">
            <Link href="/" className="hover:text-green-700">
              Home
            </Link>

            <Link href="#about" className="hover:text-green-700">
              About
            </Link>

            <Link href="#features" className="hover:text-green-700">
              Features
            </Link>
          </nav>
        )}

       
        <Link
          href="/"
          className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
        >
          Home
        </Link>

      </div>
    </header>
  );
}
