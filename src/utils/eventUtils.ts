import type { CollectionEntry } from "astro:content";

export const getSortedEvents = (posts: CollectionEntry<"event">[]) => {
  return posts.sort(
    (a, b) =>
      Math.floor(
        new Date(b.data.eventDate ?? b.data.eventDate).getTime() / 1000,
      ) -
      Math.floor(
        new Date(a.data.eventDate ?? a.data.eventDate).getTime() / 1000,
      ),
  );
};

export const getSortedEventsByCity = (posts: CollectionEntry<"event">[], city: string) =>
  getSortedEvents(posts.filter((post) => post.data.cities.includes(city)));
