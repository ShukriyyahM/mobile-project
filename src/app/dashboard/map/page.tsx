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
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Outbreak Map</h1>

      
      <div className="w-full h-125 rounded-lg overflow-hidden mb-6">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps?q=9.082,8.6753&z=6&output=embed"
        ></iframe>
      </div>

      
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
  );
}