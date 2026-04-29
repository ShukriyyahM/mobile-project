import ReportForm from "@/components/ReportForm";

export default function AgentDashboard() {
  return (
    <div>

      <h1>Agent Dashboard</h1>

      <div style={card}>
        <h2>Submit New Report</h2>
        <ReportForm />
      </div>

    </div>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px"
};