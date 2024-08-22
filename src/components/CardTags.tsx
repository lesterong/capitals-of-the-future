const CardTags = ({
  type,
  tags = [],
}: {
  type: "events" | "news" | "research";
  tags?: string[];
}) => {
  return (
    <div className="flex items-center space-x-1">
      <a
        href={`/${type}`}
        className="text-sm font-bold uppercase transition-colors text-sky-600 hover:text-sky-800"
      >
        {type}
      </a>
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          className="size-4 stroke-gray-700/40"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 20.247 6-16.5"
          ></path>
        </svg>
      </span>
      <div className="shrink flex flex-wrap gap-1">
        {tags.map((tag) => (
          <a href={`/${tag.toLowerCase()}`} key={tag}>
            <button className="text-sm bg-gray-100 border border-gray-200/70 px-2 py-0.5 rounded-lg transition-all hover:border-sky-600 active:scale-95">
              {tag}
            </button>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CardTags
