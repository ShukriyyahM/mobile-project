"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Report = {
  id: string;
  farmerName: string;
  address: string;
  status: string;
  location?: {
    lat: number;
    lng: number;
  };
};

export default function MapView({ reports }: { reports: Report[] }) {
  const [mounted, setMounted] = useState(false); 

  const defaultCenter: [number, number] = [9.082, 8.6753];

 
  useEffect(() => {
    setMounted(true);
  }, []);

 
  if (!mounted) return null;

  return (
    <MapContainer
      key="map" 
      center={defaultCenter}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {reports.map((report) => {
        if (!report.location) return null;

        const position: [number, number] = [
          report.location.lat,
          report.location.lng,
        ];

        return (
          <>
            <Marker key={report.id} position={position}>
              <Popup>
                <strong>{report.farmerName}</strong> <br />
                {report.address} <br />
                Status: {report.status}
              </Popup>
            </Marker>

            <Circle
              center={position}
              radius={5000}
              pathOptions={{
                color:
                  report.status === "confirmed"
                    ? "red"
                    : report.status === "resolved"
                    ? "green"
                    : "orange",
              }}
            />
          </>
        );
      })}
    </MapContainer>
  );
}