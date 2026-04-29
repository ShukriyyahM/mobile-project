"use client";

import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>

      
      <aside style={{
        width: "220px",
        background: "#111827",
        color: "white",
        padding: "20px"
      }}>
        <h2>Aviflu</h2>

        <nav style={{ marginTop: "20px" }}>
          <Link href="/dashboard">Dashboard</Link><br /><br />
          <Link href="/dashboard/reports">Reports</Link><br /><br />
          <Link href="/dashboard/map">Map</Link><br /><br />
        </nav>
      </aside>

      
      <main style={{
        flex: 1,
        padding: "20px",
        background: "#f3f4f6"
      }}>
        {children}
      </main>

    </div>
  );
}