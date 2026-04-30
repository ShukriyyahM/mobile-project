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

export default function MapView({
  reports,
  role,
}: {
  reports: Report[];
  role: string | null;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const defaultCenter: LatLngExpression = [9.082, 8.6753];

  const getColor = (status: string) => {
    if (status === "confirmed") return "red";
    if (status === "resolved") return "green";
    return "orange";
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={defaultCenter}
        zoom={6}
        className="w-full h-full"
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

      
      {/* <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-md z-1000">
        <h3 className="text-sm font-semibold mb-2">Legend</h3>

        <div className="flex items-center gap-2 text-sm mb-1">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          Confirmed
        </div>

        <div className="flex items-center gap-2 text-sm mb-1">
          <span className="w-3 h-3 bg-orange-400 rounded-full"></span>
          Pending
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          Resolved
        </div>
      </div> */}
    </div>
  );
}