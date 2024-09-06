import CardTags from "./CardTags";
import type { CollectionEntry } from "astro:content";

const ResearchCard = ({
  slug,
  data,
  body,
}: {
  slug: string;
  data: CollectionEntry<"research">["data"];
  body: CollectionEntry<"research">["body"];
}) => {
  const { title, publication, authors, pubDate, cities } = data;
  return (
    <article className="grid grid-cols-1 md:grid-cols-5 gap-x-10 gap-y-4">
      <div className="col-span-1 md:col-span-2">
        <CardTags type="research" tags={cities} />
        <a
          href={`/research/${slug}`}
          className="hover:text-sky-700 hover:underline"
        >
          <h3 className="text-[22px] font-bold">{title}</h3>
        </a>
        <p className="text-gray-500 mt-2">{authors}</p>
        <p className="text-gray-500">{publication}</p>
        <p className="text-gray-500 mt-6 hidden md:block text-sm">
          {pubDate.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="col-span-1 md:col-span-3">
        <p className="line-clamp-6">{body}</p>
        <p className="text-gray-500 mt-4 block md:hidden text-sm">
          {pubDate.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </article>
  );
};

export default ResearchCard;
