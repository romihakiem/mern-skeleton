import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import ItemList from "../components/ItemList";
import ItemDetail from "../components/ItemDetail";
import api from "../api/axios";

const ITEMS_PER_PAGE = 10;

export default function Dashboard() {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState(null);
    const [isNew, setIsNew] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageMeta, setPageMeta] = useState({
        page: 1,
        totalPages: 1,
        hasPrevPage: false,
        hasNextPage: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchItems = async (q = "", p = 1) => {
        setLoading(true);
        try {
            const res = await api.get("/items", {
                params: { ...(q ? { search: q } : {}), page: p, limit: ITEMS_PER_PAGE },
            });
            setItems(res.data.items);
            setPageMeta({
                page: res.data.page,
                totalPages: res.data.totalPages,
                hasPrevPage: res.data.hasPrevPage,
                hasNextPage: res.data.hasNextPage,
            });
        } catch (err) {
            setError(err.response?.data?.message || "Gagal memuat data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(search, page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        setPage(1);
        const timeout = setTimeout(() => fetchItems(search, 1), 300);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const handlePageChange = (nextPage) => {
        if (nextPage < 1 || nextPage > pageMeta.totalPages) return;
        setPage(nextPage);
    };

    const handleSelect = (item) => {
        setSelected(item);
        setIsNew(false);
    };

    const handleNew = () => {
        setSelected(null);
        setIsNew(true);
    };

    const handleCancel = () => {
        setSelected(null);
        setIsNew(false);
    };

    const handleSave = async (form, id) => {
        if (id) {
            const res = await api.put(`/items/${id}`, form);
            setItems((prev) => prev.map((it) => (it._id === id ? res.data.item : it)));
            setSelected(res.data.item);
        } else {
            const res = await api.post("/items", form);
            setSelected(res.data.item);
            setIsNew(false);
            // Item baru muncul paling atas (sort createdAt desc), jadi kembali ke halaman 1
            if (page === 1) {
                fetchItems(search, 1);
            } else {
                setPage(1);
            }
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Yakin ingin menghapus item ini?")) return;
        await api.delete(`/items/${id}`);
        setSelected(null);
        // Jika item terakhir di halaman ini dihapus, mundur satu halaman
        const isLastItemOnPage = items.length === 1 && page > 1;
        const targetPage = isLastItemOnPage ? page - 1 : page;
        if (targetPage === page) {
            fetchItems(search, page);
        } else {
            setPage(targetPage);
        }
    };

    const selectedId = useMemo(() => selected?._id, [selected]);

    return (
        <Layout>
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-800">Dashboard Item</h1>
                <p className="text-sm text-gray-500">Kelola data item Anda — pilih dari daftar untuk melihat detail.</p>
            </div>

            {error && <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</div>}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[360px_1fr]" style={{ minHeight: "60vh" }}>
                <ItemList items={items} selectedId={selectedId} onSelect={handleSelect} onNew={handleNew} search={search} onSearch={setSearch} pagination={pageMeta} onPageChange={handlePageChange} />
                <ItemDetail item={selected} isNew={isNew} onSave={handleSave} onDelete={handleDelete} onCancel={handleCancel} />
            </div>

            {loading && <p className="mt-4 text-center text-sm text-gray-400">Memuat data...</p>}
        </Layout>
    );
}
