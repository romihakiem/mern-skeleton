import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Gagal mendaftar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-6 text-center">
                    <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-brand-500 font-bold text-white">
                        M
                    </div>
                    <h1 className="text-lg font-semibold text-gray-800">
                        Buat akun baru
                    </h1>
                </div>

                {error && (
                    <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Nama
                        </label>
                        <input
                            required
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-brand-500 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:opacity-60"
                    >
                        {loading ? "Memproses..." : "Daftar"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500">
                    Sudah punya akun?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-brand-500 hover:underline"
                    >
                        Masuk
                    </Link>
                </p>
            </div>
        </div>
    );
}
