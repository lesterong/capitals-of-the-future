import CardTags from "./CardTags";
import type { CollectionEntry } from "astro:content";

const NewsCard = ({
  slug,
  data,
}: {
  slug: string;
  data: CollectionEntry<"news">["data"];
}) => {
  const { title, description, heroImg, newsDate, cities } = data;
  return (
    <article>
      <CardTags type="news" tags={cities} />
      <a href={`/news/${slug}`} className="hover:text-sky-700 hover:underline">
        <h3 className="text-xl font-bold mt-1">{title}</h3>
      </a>
      {heroImg && (
        <img
          src={heroImg.src}
          alt=""
          className="rounded-lg aspect-video mt-2"
        />
      )}
      <p className="mt-2 text-gray-700">{description}</p>
      <div className="text-gray-500 mt-6">
        {newsDate.toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}{" "}
        / 0 comments
      </div>
    </article>
  );
};

export default NewsCard;
