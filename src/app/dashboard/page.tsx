"use client";

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-green-800">
                Dashboard Overview
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500 text-sm">Total Reports</h2>
                    <p className="text-2xl font-bold text-green-800">24</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500 text-sm">Affected Farms</h2>
                    <p className="text-2xl font-bold text-red-600">10</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-gray-500 text-sm">Pending Cases</h2>
                    <p className="text-2xl font-bold text-yellow-600">24</p>
                </div>

            </div>
        </div>
    );
}