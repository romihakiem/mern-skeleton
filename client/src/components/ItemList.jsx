export default function ItemList({
    items,
    selectedId,
    onSelect,
    onNew,
    search,
    onSearch,
}) {
    return (
        <div className="flex h-full flex-col rounded-lg border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                    <h2 className="font-semibold text-gray-800">Daftar Item</h2>
                    <button
                        onClick={onNew}
                        className="rounded-md bg-brand-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-brand-600"
                    >
                        + Tambah
                    </button>
                </div>
                <input
                    value={search}
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Cari item..."
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                />
            </div>

            <ul className="flex-1 overflow-y-auto">
                {items.length === 0 && (
                    <li className="p-4 text-center text-sm text-gray-400">
                        Belum ada item
                    </li>
                )}
                {items.map((item) => (
                    <li key={item._id}>
                        <button
                            onClick={() => onSelect(item)}
                            className={`block w-full border-b border-gray-100 px-4 py-3 text-left transition hover:bg-brand-50 ${
                                selectedId === item._id ? "bg-brand-50" : ""
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800">
                                    {item.name}
                                </span>
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                        item.status === "active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                    }`}
                                >
                                    {item.status === "active"
                                        ? "Aktif"
                                        : "Nonaktif"}
                                </span>
                            </div>
                            <div className="mt-0.5 text-xs text-gray-500">
                                {item.category} · Stok {item.stock}
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
