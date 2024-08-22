import type { CollectionEntry } from "astro:content";

export const getSortedResearch = (research: CollectionEntry<"research">[]) => {
  return research.sort(
    (a, b) =>
      Math.floor(new Date(b.data.pubDate ?? b.data.pubDate).getTime() / 1000) -
      Math.floor(new Date(a.data.pubDate ?? a.data.pubDate).getTime() / 1000),
  );
};

export const getSortedResearchByCity = (
  research: CollectionEntry<"research">[],
  city: string,
) => getSortedResearch(research.filter((r) => r.data.cities.includes(city)));
