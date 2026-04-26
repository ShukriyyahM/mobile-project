"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const q = query(
          collection(db, "reports"),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(data);
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    };

    fetchReports();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-800 mb-6">Reports</h1>

      {loading ? (
        <p>Loading...</p>
      ) : reports.length === 0 ? (
        <p className="text-gray-500">No reports found.</p>
      ) : (
        <div className="grid gap-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white p-4 rounded-xl shadow">
              
              <h2 className="font-semibold text-lg">
                {report.farmerName}
              </h2>

              <p className="text-sm text-gray-600">
                📍 {report.address}
              </p>

              <p className="text-sm text-gray-600">
                🐔 {report.poultryType} | Flock: {report.flockSize}
              </p>

              <p className="text-sm text-gray-600">
                🗓 {report.date}
              </p>

              <span
                className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                  report.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : report.status === "confirmed"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {report.status}
              </span>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}