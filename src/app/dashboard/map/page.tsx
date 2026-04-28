"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MapPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const snapshot = await getDocs(collection(db, "reports"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReports(data);
    };

    fetchReports();
  }, []);

  return (
  <div className="h-screen w-full flex flex-col">

    
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800">
        Outbreak Map
      </h1>
    </div>

    <div className="flex-1 w-full">
      <iframe
        className="w-full h-full"
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps?q=Nigeria&z=6&output=embed"
      ></iframe>
    </div>

    <div className="p-6 bg-gray-50 overflow-y-auto max-h-75">
      <div className="grid gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white p-4 rounded-xl shadow"
          >
            <h2 className="font-semibold text-lg">
              {report.farmerName}
            </h2>

            <p className="text-sm text-gray-600">
              📍 {report.address}
            </p>

            <p className="text-sm text-gray-600">
              Status: {report.status}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
);
}