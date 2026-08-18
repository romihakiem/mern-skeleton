import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="border-b border-gray-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-500 text-sm font-bold text-white">
                            M
                        </div>
                        <span className="font-semibold text-gray-800">
                            MERN Skeleton
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                            Halo,{" "}
                            <span className="font-medium text-gray-700">
                                {user?.name}
                            </span>
                        </span>
                        <button
                            onClick={logout}
                            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100"
                        >
                            Keluar
                        </button>
                    </div>
                </div>
            </header>
            <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        </div>
    );
}
