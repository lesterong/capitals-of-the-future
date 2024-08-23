import type { CollectionEntry } from "astro:content";
import EventCard from "./EventCard";
import Cities from "@content/city/cities.json";
import { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { EVENTS_PER_PAGE } from "consts";
import { getPagination } from "@utils/pagination";

const PaginatedEventList = ({
  events,
}: {
  events: CollectionEntry<"event">[];
}) => {
  const validCities = Cities.map((city) => city.name);
  const validOrganisers = ["Asia Research Institute", "Others"];
  const [city, setCity] = useState<string>("");
  const [organiser, setOrganiser] = useState<string>("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (validCities.includes(urlParams.get("city") || "")) {
      setCity(urlParams.get("city") || "");
    }

    if (validOrganisers.includes(urlParams.get("organiser") || "")) {
      setOrganiser(urlParams.get("organiser") || "");
    }
  }, []);

  const filteredEvents = events
    .filter((event) => {
      return city === "" || event.data.cities.includes(city);
    })
    .filter((event) => {
      return organiser === "" || event.data.organisers.includes(organiser);
    });

  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);

  const eventsToShow = filteredEvents.slice(
    (page - 1) * EVENTS_PER_PAGE,
    page * EVENTS_PER_PAGE,
  );

  const pagination = getPagination(page, totalPages);
  console.log(pagination);

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const organiserParams = urlParams.get("organiser");
    if (newCity) {
      history.replaceState(
        {},
        "",
        `events?city=${newCity}${!organiserParams ? "" : `&organiser=${organiserParams}`}`,
      );
    } else {
      history.replaceState(
        {},
        "",
        `events${!organiserParams ? "" : `?organiser=${organiserParams}`}`,
      );
    }
  };

  const handleOrganiserChange = (newOrganiser: string) => {
    setOrganiser(newOrganiser);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const cityParams = urlParams.get("city");
    if (newOrganiser) {
      history.replaceState(
        {},
        "",
        `events?organiser=${newOrganiser}${!cityParams ? "" : `&city=${cityParams}`}`,
      );
    } else {
      history.replaceState(
        {},
        "",
        `events${!cityParams ? "" : `?city=${cityParams}`}`,
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <header className="pt-32 pb-6 relative">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex gap-1">
            <h1 className="font-bold text-5xl">Events</h1>
            <span>{eventsToShow.length}</span>
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
            <Listbox value={organiser} onChange={handleOrganiserChange}>
              <ListboxButton className="border border-gray-900 py-0.5 pl-3 pr-2 rounded-md flex gap-2 items-center">
                {!!organiser ? organiser : "All organisers"}{" "}
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
                  All organisers
                </ListboxOption>
                {validOrganisers.map((o) => (
                  <ListboxOption
                    value={o}
                    key={o}
                    className="data-[focus]:bg-sky-100 pl-2 pr-8 py-1"
                  >
                    {o}
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
              {eventsToShow.length === 0 && <p>No events found.</p>}
              {eventsToShow.map((event) => (
                <EventCard {...event} key={event.id} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="p-2 rounded-lg disabled:text-gray-400"
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
              >
                <ChevronDoubleLeftIcon className="size-4 stroke-current" />
              </button>
              <button
                className="p-2 rounded-lg disabled:text-gray-400"
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                <ChevronLeftIcon className="size-4 stroke-current" />
              </button>
              {pagination.map((p) => {
                if (p === "...") {
                  return (
                    <button disabled className="p-2 rounded-lg">
                      {p}
                    </button>
                  );
                }
                return (
                  <button
                    className={`p-2 rounded-lg ${page === p ? "bg-sky-800 text-white" : ""}`}
                    onClick={() => handlePageChange(p)}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                className="p-2 rounded-lg disabled:text-gray-400"
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                <ChevronRightIcon className="size-4 stroke-current" />
              </button>
              <button
                className="p-2 rounded-lg disabled:text-gray-400"
                disabled={page === totalPages}
                onClick={() => handlePageChange(totalPages)}
              >
                <ChevronDoubleRightIcon className="size-4 stroke-current" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PaginatedEventList;
