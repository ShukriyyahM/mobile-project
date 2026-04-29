"use client";

export default function Settings() {
    return (
        <div>
            <h1 className="text-2xl text-green-800 font-bold mb-6">
                Settings
            </h1>

            <div className="bg-white p-6 rounded-xl shadow space-y-4">

                <div>
                    <label className="text-sm text-gray-800">Name</label>
                    <input className="w-full mt-1 border px-4 py-2 rounded-l-2xl" />
                </div>

                <button className="bg-green-800 text-white px-4 py-2 rounded-lg">
                    Save Changes
                </button>

            </div>
        </div>
    );
}