import type { CollectionEntry } from "astro:content";

export const getSortedNews = (news: CollectionEntry<"news">[]) => {
  return news.sort(
    (a, b) =>
      Math.floor(
        new Date(b.data.newsDate ?? b.data.newsDate).getTime() / 1000,
      ) -
      Math.floor(new Date(a.data.newsDate ?? a.data.newsDate).getTime() / 1000),
  );
};

export const getSortedNewsByCity = (
  news: CollectionEntry<"news">[],
  city: string,
) => getSortedNews(news.filter((n) => n.data.cities.includes(city)));
