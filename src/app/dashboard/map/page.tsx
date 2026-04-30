"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import MapView from "@/components/MapView";

export default function MapPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // ✅ Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const snapshot = await getDocs(collection(db, "reports"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    if (storedRole === "farmer") {
      router.push("/dashboard");
    }

    setLoading(false);
  }, []);

  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col">

      
      <div className="p-6">
        <h1 className="text-2xl font-bold text-green-800">
          Outbreak Map
        </h1>
      </div>

      
      <div className="flex-1 w-full">
        <MapView reports={reports} role={role} />
      </div>

      {/* Report List */}
      <div className="p-6 bg-gray-50 overflow-y-auto max-h-62.5">
        <div className="grid gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <h2 className="font-semibold text-gray-700 text-lg">
                {report.farmerName}
              </h2>

              <p className="text-sm text-gray-600">
                 {report.address}
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