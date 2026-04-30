"use client";

import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";

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
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);

    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
   }, []);

    if (!mounted) return null;

    const defaultCenter: LatLngExpression = [9.082, 8.6753];

  
   const getColor = (status: string) => {
    if (status === "confirmed") return "red";
    if (status === "resolved") return "green";
    return "orange";
   };

   return (
     <MapContainer
      center={defaultCenter}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {reports.map((report) => {
        if (!report.location) return null;

        
        if (role === "farmer" && report.status !== "confirmed") {
          return null;
        }

        const position: [number, number] = [
          report.location.lat,
          report.location.lng,
        ];

        return (
          <React.Fragment key={report.id}>
            
            <Marker position={position}>
              <Popup>
                <strong>{report.farmerName}</strong>
                <br />

                {role === "admin" && (
                  <>
                    {report.address} <br />
                    Status: {report.status}
                  </>
                )}

                {role === "investigator" && (
                  <>Status: {report.status}</>
                )}

                {role === "farmer" && (
                  <>Confirmed case</>
                )}
              </Popup>
            </Marker>

           
            <Circle
              center={position}
              radius={5000}
              pathOptions={{
                color: getColor(report.status),
                fillColor: getColor(report.status),
                fillOpacity: 0.2,
              }}
            />
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}