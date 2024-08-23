import type { CollectionEntry } from "astro:content";
import NewsCard from "./NewsCard";
import Cities from "@content/city/cities.json";
import { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { NEWS_PER_PAGE } from "consts";
import Pagination from "./Pagination";

const PaginatedNewsList = ({ news }: { news: CollectionEntry<"news">[] }) => {
  const validCities = Cities.map((city) => city.name);
  const [city, setCity] = useState<string>("");

  const filteredNews = news.filter((n) => {
    return city === "" || n.data.cities.includes(city);
  });

  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredNews.length / NEWS_PER_PAGE);

  const newsToShow = filteredNews.slice(
    (page - 1) * NEWS_PER_PAGE,
    page * NEWS_PER_PAGE,
  );

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlCity = urlParams.get("city");
    const urlPage = Number(urlParams.get("page"));
    if (validCities.includes(urlCity || "")) {
      setCity(urlCity || "");
    }

    if (!isNaN(urlPage)) {
      if (urlPage <= totalPages && urlPage > 0) {
        setPage(urlPage);
      }
    }
  }, []);

  const handleCityChange = (newCity: string) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (newCity) {
      urlParams.set("city", newCity);
    } else {
      urlParams.delete("city");
    }
    if (newCity != city) {
      urlParams.delete("page");
      setPage(1);
    }
    history.replaceState(
      {},
      "",
      `/news${urlParams.size > 0 ? `?${urlParams.toString()}` : ""}`,
    );
    setCity(newCity);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (newPage) {
      urlParams.set("page", `${newPage}`);
    } else {
      urlParams.delete("page");
    }
    history.replaceState(
      {},
      "",
      `/news${urlParams.size > 0 ? `?${urlParams.toString()}` : ""}`,
    );
  };

  return (
    <>
      <header className="pt-32 pb-6 relative">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex gap-1">
            <h1 className="font-bold text-5xl">News</h1>
            <span>{filteredNews.length}</span>
          </div>
          <div className="space-x-4 mt-4 flex">
            <Listbox value={city} onChange={handleCityChange}>
              <ListboxButton className="border border-gray-900 py-0.5 pl-3 pr-2 rounded-md flex gap-2 items-center">
                {!!city ? city : "All cities"}{" "}
                <ChevronDownIcon className="size-3 stroke-current" />
              </ListboxButton>
              <ListboxOptions
                anchor="bottom start"
                className="z-10 bg-white drop-shadow-sm rounded-lg mt-1 origin-top-left transition duration-200 ease-out data-[closed]:scale-90 data-[closed]:opacity-0"
                transition
              >
                <ListboxOption
                  value=""
                  className="data-[focus]:bg-sky-100 pl-2 pr-8 py-1"
                >
                  All cities
                </ListboxOption>
                {validCities.map((city) => (
                  <ListboxOption
                    value={city}
                    key={city}
                    className="data-[focus]:bg-sky-100 pl-2 pr-8 py-1"
                  >
                    {city}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </div>
      </header>
      <main>
        <div className="bg-gray-50 rounded-[40px] pt-12 relative z-10 min-h-lvh">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-7">
              {newsToShow.length === 0 && <p>No news found.</p>}
              {newsToShow.map((n) => (
                <NewsCard {...n} key={n.id} />
              ))}
            </div>
            <div className="flex justify-center mt-8 pb-12">
              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PaginatedNewsList;
