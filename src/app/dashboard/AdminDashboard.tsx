export default function AdminDashboard() {
  return (
    <div>

      <h1>Admin Dashboard</h1>

      
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={card}>
          <h3>Total Users</h3>
          <p>120</p>
        </div>

        <div style={card}>
          <h3>Reports</h3>
          <p>45</p>
        </div>

        <div style={card}>
          <h3>Agents</h3>
          <p>12</p>
        </div>

      </div>

     
      <div style={{ marginTop: "30px" }}>
        <h2>👥 User Management</h2>
        <p>View, assign roles, and manage users here</p>
      </div>

    </div>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "12px",
  flex: 1,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};