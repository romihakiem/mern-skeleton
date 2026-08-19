export default function Pagination({ page, totalPages, hasPrevPage, hasNextPage, onPageChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPrevPage}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Sebelumnya
            </button>

            <span className="text-sm text-gray-500">
                Halaman <span className="font-medium text-gray-700">{page}</span> dari <span className="font-medium text-gray-700">{totalPages}</span>
            </span>

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNextPage}
                className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Berikutnya
            </button>
        </div>
    );
}
