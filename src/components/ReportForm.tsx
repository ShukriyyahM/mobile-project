"use client";

import { useState } from "react";
import { createReport } from "@/services/reportService";

export default function ReportForm() {
  const [title, setTitle] = useState("");

  async function submit() {
    await createReport({ title });
    alert("Report submitted");
  }

  return (
    <div>

      <input
        placeholder="Report title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={input}
      />

      <button onClick={submit} style={button}>
        Submit Report
      </button>

    </div>
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc"
};

const button = {
  padding: "10px 15px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer"
};