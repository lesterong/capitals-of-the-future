import CardTags from "./CardTags";
import type { CollectionEntry } from "astro:content";

const ResearchCard = ({
  slug,
  data,
}: {
  slug: string;
  data: CollectionEntry<"research">["data"];
}) => {
  const { title, abstract, publication, authors, pubDate, cities } = data;
  return (
    <article className="grid grid-cols-1 md:grid-cols-5 gap-x-10">
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
        <p className="text-gray-500 mt-6 hidden md:block">
          {pubDate.toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}{" "}
          / 0 comments
        </p>
      </div>
      <div className="col-span-1 md:col-span-3">
        <p className="whitespace-pre-line">{abstract}</p>
      </div>
      <p className="text-gray-500 mt-6 block md:hidden">
        {pubDate.toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" "}
        / 0 comments
      </p>
    </article>
  );
};

export default ResearchCard;
