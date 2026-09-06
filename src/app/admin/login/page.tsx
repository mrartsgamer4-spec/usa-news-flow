'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            const data = await res.json();

            if (data.success) {
                router.push("/admin/dashboard");
                router.refresh();
            } else {
                setError(data.message || "Incorrect password! Access denied.");
            }
        } catch (err) {
            setError("Failed to connect to authentication server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <form onSubmit={handleLogin} className="bg-white border border-gray-200 p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
                <div className="flex items-center gap-2 text-news-red font-bold text-xl border-b pb-3">
                    <Lock size={22} />
                    <h2>Admin Authentication</h2>
                </div>
                {error && <p className="text-red-600 text-xs bg-red-50 p-2 rounded border border-red-200">{error}</p>}
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Admin Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter secure password"
                        className="w-full border border-gray-300 p-2 rounded text-sm focus:outline-none focus:border-news-red"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-news-red text-white py-2 rounded font-bold text-sm hover:bg-red-700 transition disabled:opacity-50"
                >
                    {loading ? "Verifying..." : "Login to Dashboard"}
                </button>
            </form>
        </div>
    );
}