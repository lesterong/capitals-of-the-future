import type { CollectionEntry } from "astro:content";

export const getSortedEvents = (events: CollectionEntry<"event">[]) => {
  return events.sort(
    (a, b) =>
      Math.floor(
        new Date(b.data.eventDate ?? b.data.eventDate).getTime() / 1000,
      ) -
      Math.floor(
        new Date(a.data.eventDate ?? a.data.eventDate).getTime() / 1000,
      ),
  );
};

export const getSortedEventsByCity = (events: CollectionEntry<"event">[], city: string) =>
  getSortedEvents(events.filter((event) => event.data.cities.includes(city)));
