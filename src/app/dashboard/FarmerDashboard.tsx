"use client";

import { useEffect, useState } from "react";
import MapView from "@/components/MapView";
import { getReports } from "@/services/reportService";

export default function FarmerDashboard() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getReports();
      setReports(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1>Farmer Dashboard</h1>
      <MapView reports={reports} />
    </div>
  );
}