import { SlashIcon } from "@heroicons/react/24/solid";

const CardTags = ({
  type,
  tags = [],
  light = false,
}: {
  type: "events" | "news" | "research";
  tags?: string[];
  light?: boolean;
}) => {
  return (
    <div className="flex items-center space-x-1">
      <a
        href={`/${type}`}
        className={`text-sm font-bold uppercase transition-colors duration-100 ${light ? 'text-primary-300 hover:text-primary-400' : 'text-primary-700 hover:text-primary-900'}`}
      >
        {type}
      </a>
      <SlashIcon className={`size-4 ${light ? 'fill-gray-300/60' : 'fill-gray-700/40'}`} />
      <div className="shrink flex flex-wrap gap-1">
        {tags.sort().map((tag) => (
          <a
            className="text-sm bg-gray-100 border border-gray-200/70 px-2 py-0.5 rounded-lg transition-all text-gray-900 hover:border-primary-700 active:scale-95"
            href={`/${type}?city=${tag}`}
            key={tag}
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default CardTags;
