"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function CreateReport() {
  const [form, setForm] = useState({
    farmerName: "",
    address: "",
    poultryType: "",
    flockSize: "",
    date: "",
  });

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
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

    alert("Report submitted");

    setForm({
      farmerName: "",
      address: "",
      poultryType: "",
      flockSize: "",
      date: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto">

      <h1 className="text-2xl font-bold text-green-800 mb-6">
        Submit Report
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Farmer Name"
          value={form.farmerName}
          onChange={(e) =>
            setForm({ ...form, farmerName: e.target.value })
          }
          className="w-full text-gray-600 border p-2"
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="w-full text-gray-600 border p-2"
        />

        <input
          placeholder="Poultry Type"
          value={form.poultryType}
          onChange={(e) =>
            setForm({ ...form, poultryType: e.target.value })
          }
          className="w-full text-gray-600 border p-2"
        />

        <input
          type="number"
          placeholder="Flock Size"
          value={form.flockSize}
          onChange={(e) =>
            setForm({ ...form, flockSize: e.target.value })
          }
          className="w-full text-gray-600 border p-2"
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full text-gray-600 border p-2"
        />

       
        <button
          type="button"
          onClick={getLocation}
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Get GPS Location
        </button>

        {location && <p> Location captured</p>}

        <button className="w-full bg-green-700 text-white py-3 rounded">
          Submit Report
        </button>

      </form>
    </div>
  );
}