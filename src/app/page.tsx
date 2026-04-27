"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="bg-white">

     
      <header className="w-full border-b bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          
          <div className="flex items-center gap-2">
            <Image
              src="/images/bird.png"
              alt="logo"
              width={35}
              height={35}
            />
            <span className="text-xl font-bold text-green-900">
              AviFlu
            </span>
          </div>

         
          <nav className="hidden md:flex items-center gap-8 text-gray-600">
            <a href="#" className="text-green-900 border-b-2 border-green-800 pb-1">
              Home
            </a>

            <a href="#about" className="hover:text-green-700">
              About
            </a>

            <a href="#features" className="hover:text-green-700">
              Features
            </a>

            <a href="#contact" className="hover:text-green-700">
              Contact
            </a>
          </nav>

          
          <Link
            href="/login"
            className="hidden md:inline-flex items-center gap-2 bg-green-900 text-white px-5 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      
      <section className="bg-linear-to-br from-green-50 to-green-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-900 px-4 py-2 rounded-full text-sm mb-6">
              ✔ Protecting Poultry, Protecting Livelihoods.
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-green-950 mb-4">
              AviFlu Monitoring System
            </h1>

            <p className="text-gray-600 mb-6 max-w-md">
              Report and monitor bird flu outbreaks efficiently.
              Real-time data, smarter decisions, healthier farms.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-green-900 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex justify-center">
            <Image
              src="/images/hero.png"
              alt="hero"
              width={500}
              height={400}
              className="w-full max-w-lg"
              priority
            />
          </div>

        </div>
      </section>

     
      <section id="about" className="py-20 px-6 text-center">
        <h2 className="text-2xl font-bold text-green-900 mb-4">
          About This System
        </h2>

        <p className="text-gray-700 max-w-2xl mx-auto mb-10">
          The AviFlu Monitoring System is designed to support farmers,
          investigators, and authorities in reporting and managing avian
          influenza outbreaks with real-time data and smart visualization tools.
        </p>

        
        <div id="how" className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">

          <div className="bg-green-50 p-6 rounded-xl text-left">
            <h3 className="font-semibold text-green-900 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-700 text-sm">
              Provide a reliable platform for early detection and monitoring
              of poultry diseases to reduce spread and protect livestock.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl text-left">
            <h3 className="font-semibold text-green-900 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-700 text-sm">
              Build a smart disease surveillance system that enables fast
              response and better decision-making.
            </p>
          </div>

        </div>
      </section>

      
      <section id="features" className="bg-green-50 py-20 px-6">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-12">
          Why Choose AviFlu System?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold mb-2 text-green-800">Easy Reporting</h3>
            <p className="text-gray-700 text-sm">
              Farmers can quickly submit outbreak reports with accurate details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold mb-2 text-green-800">Map Tracking</h3>
            <p className="text-gray-700 text-sm">
              Authorities can visualize outbreaks using an interactive map.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold mb-2 text-green-800">Real-Time Monitoring</h3>
            <p className="text-gray-700 text-sm">
              Monitor confirmed and pending cases instantly for quick response.
            </p>
          </div>

        </div>
      </section>

      
      <section id="contact">
        <footer className="bg-green-950 text-white text-center py-6">
          © Notzero2026 AviFlu Monitoring System. All rights reserved.
        </footer>
      </section>

    </main>
  );
}