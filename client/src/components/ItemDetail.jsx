import { useEffect, useState } from "react";

const emptyForm = {
    name: "",
    description: "",
    category: "",
    price: 0,
    stock: 0,
    status: "active",
};

export default function ItemDetail({ item, isNew, onSave, onDelete, onCancel }) {
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (item) {
            setForm({
                name: item.name || "",
                description: item.description || "",
                category: item.category || "",
                price: item.price || 0,
                stock: item.stock || 0,
                status: item.status || "active",
            });
        } else {
            setForm(emptyForm);
        }
    }, [item]);

    if (!item && !isNew) {
        return (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white text-sm text-gray-400">
                Pilih item di sebelah kiri, atau klik "+ Tambah" untuk membuat item baru
            </div>
        );
    }

    const handleChange = (field) => (e) => {
        const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await onSave(form, item?._id);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="h-full rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="font-semibold text-gray-800">{isNew ? "Item Baru" : "Detail Item"}</h2>
                {!isNew && (
                    <button onClick={() => onDelete(item._id)} className="text-sm font-medium text-red-500 transition hover:text-red-600">
                        Hapus
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Nama</label>
                    <input
                        required
                        value={form.name}
                        onChange={handleChange("name")}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-600">Deskripsi</label>
                    <textarea
                        value={form.description}
                        onChange={handleChange("description")}
                        rows={3}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">Kategori</label>
                        <input
                            value={form.category}
                            onChange={handleChange("category")}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">Status</label>
                        <select
                            value={form.status}
                            onChange={handleChange("status")}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                        >
                            <option value="active">Aktif</option>
                            <option value="inactive">Nonaktif</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">Harga</label>
                        <input
                            type="number"
                            min="0"
                            value={form.price}
                            onChange={handleChange("price")}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-600">Stok</label>
                        <input
                            type="number"
                            min="0"
                            value={form.stock}
                            onChange={handleChange("stock")}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={onCancel} className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition hover:bg-gray-100">
                        Batal
                    </button>
                    <button type="submit" disabled={saving} className="rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-600 disabled:opacity-60">
                        {saving ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}
