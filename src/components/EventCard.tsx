import CardTags from "./CardTags";
import type { CollectionEntry } from "astro:content";

const EventCard = ({
  slug,
  data,
}: {
  slug: string;
  data: CollectionEntry<"event">["data"];
}) => {
  const { title, description, heroImg, eventDate, cities, organisers } = data;
  return (
    <article>
      <CardTags type="events" tags={cities} />
      <a
        href={`/events/${slug}`}
        className="hover:text-sky-700 hover:underline"
      >
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
      <div className="text-gray-500 mt-6 text-sm">
        {eventDate.toLocaleDateString("en-us", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </div>
    </article>
  );
};

export default EventCard;
