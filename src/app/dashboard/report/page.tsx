"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ReportPage() {

  
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [form, setForm] = useState({
    farmerName: "",
    address: "",
    poultryType: "",
    flockSize: "",
    affectedBirds: "",
    deadBirds: "",
    symptoms: "",
    date: "",
  });

  
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to retrieve location");
      }
    );
  };

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    
    await addDoc(collection(db, "reports"), {
      ...form,
      location,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("Report submitted!");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Submit Report</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input name="farmerName" placeholder="Farmer Name" onChange={handleChange} className="w-full text-gray-600 border p-2" />

        <input name="address" placeholder="Address" onChange={handleChange} className="w-full text-gray-600 border p-2" />

        <div className="flex gap-4">
        <button
          type="button"
          onClick={getLocation}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Get GPS Location
        </button>

        
        {location && (
          <p className="text-sm text-gray-600">
            📍 Location captured
          </p>
        )}

        

        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
          Submit
        </button>
        </div>

      </form>
    </div>
  );
}