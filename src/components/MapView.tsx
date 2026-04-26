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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

 const defaultCenter: LatLngExpression = [9.082, 8.6753];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {reports.map((report) => {
        if (!report.location) return null;

        const position: LatLngExpression = [
          report.location.lat,
          report.location.lng,
        ];

        const getColor = (status: string) => {
          if (status === "confirmed") return "red";
          if (status === "resolved") return "green";
          return "orange";
        };

        return (
          <React.Fragment key={report.id}>
            <Marker position={position}>
              <Popup>
                <strong>{report.farmerName}</strong>
                <br />
                {report.address}
                <br />
                Status: {report.status}
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