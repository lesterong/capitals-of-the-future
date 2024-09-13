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
  handlePageChange: pageChange,
}: {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}) => {
  const pagination = getPagination(page, totalPages);
  const handlePageChange = (page: number) => {
    pageChange(page);
    window.scrollTo(0, 0);
  };
  return (
    <div className="text-gray-700">
      <button
        className="inline-flex items-center px-2 h-10 rounded-lg transition-colors disabled:text-gray-400 enabled:hover:bg-primary-100"
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
      >
        <ChevronDoubleLeftIcon className="size-4 stroke-current" />
      </button>
      <button
        className="inline-flex items-center px-2 h-10 rounded-lg transition-colors disabled:text-gray-400 enabled:hover:bg-primary-100"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
      >
        <ChevronLeftIcon className="size-4 stroke-current" />
      </button>
      {pagination.map((p) => {
        if (p === "...") {
          return (
            <button
              key={p}
              disabled
              className="inline-flex items-center px-2 h-10 rounded-lg"
            >
              {p}
            </button>
          );
        }
        return (
          <button
            className={`inline-flex items-center px-2 h-10 hover:bg-primary-100 rounded-lg transition-colors
              ${page === p ? "bg-primary-800 text-white hover:bg-primary-800" : ""}
              `}
            onClick={() => handlePageChange(p)}
            key={p}
          >
            {p}
          </button>
        );
      })}
      <button
        className="inline-flex items-center px-2 h-10 rounded-lg transition-colors disabled:text-gray-400 enabled:hover:bg-primary-100"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
      >
        <ChevronRightIcon className="size-4 stroke-current" />
      </button>
      <button
        className="inline-flex items-center px-2 h-10 rounded-lg transition-colors disabled:text-gray-400 enabled:hover:bg-primary-100"
        disabled={page === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        <ChevronDoubleRightIcon className="size-4 stroke-current" />
      </button>
    </div>
  );
};

export default Pagination;
