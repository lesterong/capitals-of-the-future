import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { getPagination } from "@utils/pagination";

const Pagination = ({
  page,
  totalPages,
  handlePageChange,
}: {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) => {
  const pagination = getPagination(page, totalPages);
  return (
    <div className="text-gray-700">
      <button
        className="p-2 rounded-lg transition-colors disabled:text-gray-400"
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
      >
        <ChevronDoubleLeftIcon className="size-4 stroke-current" />
      </button>
      <button
        className="p-2 rounded-lg transition-colors disabled:text-gray-400"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeftIcon className="size-4 stroke-current" />
      </button>
      {pagination.map((p) => {
        if (p === "...") {
          return (
            <button key={p} disabled className="p-2 rounded-lg">
              {p}
            </button>
          );
        }
        return (
          <button
            className={`p-2 rounded-lg transition-colors ${page === p ? "bg-sky-800 text-white" : ""}`}
            onClick={() => handlePageChange(p)}
            key={p}
          >
            {p}
          </button>
        );
      })}
      <button
        className="p-2 rounded-lg transition-colors disabled:text-gray-400"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <ChevronRightIcon className="size-4 stroke-current" />
      </button>
      <button
        className="p-2 rounded-lg transition-colors disabled:text-gray-400"
        disabled={page === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        <ChevronDoubleRightIcon className="size-4 stroke-current" />
      </button>
    </div>
  );
};

export default Pagination;
