import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AviFlu Monitoring System",
  description: "A system for reporting and monitoring avian influenza outbreaks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}