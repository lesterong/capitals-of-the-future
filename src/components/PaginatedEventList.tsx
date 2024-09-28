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
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { EVENTS_PER_PAGE } from "consts";
import Pagination from "./Pagination";
import * as PageHeader from "@components/PageHeader";

const PaginatedEventList = ({
  events,
}: {
  events: CollectionEntry<"event">[];
}) => {
  const validCities = Cities.cities.map((city) => city.name);
  const validOrganisers = ["Asia Research Institute", "Others"];
  const [city, setCity] = useState<string>("");
  const [organiser, setOrganiser] = useState<string>("");

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

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlCity = urlParams.get("city");
    const urlOrganiser = urlParams.get("organiser");
    const urlPage = Number(urlParams.get("page"));
    if (validCities.includes(urlCity || "")) {
      setCity(urlCity || "");
    }

    if (validOrganisers.includes(urlOrganiser || "")) {
      setOrganiser(urlOrganiser || "");
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
      `/events${urlParams.size > 0 ? `?${urlParams.toString()}` : ""}`,
    );
    setCity(newCity);
  };

  const handleOrganiserChange = (newOrganiser: string) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (newOrganiser) {
      urlParams.set("organiser", newOrganiser);
    } else {
      urlParams.delete("organiser");
    }

    if (newOrganiser != organiser) {
      urlParams.delete("page");
      setPage(1);
    }

    history.replaceState(
      {},
      "",
      `/events${urlParams.size > 0 ? `?${urlParams.toString()}` : ""}`,
    );
    setOrganiser(newOrganiser);
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
      `/events${urlParams.size > 0 ? `?${urlParams.toString()}` : ""}`,
    );
  };

  return (
    <>
      <PageHeader.Root>
        <PageHeader.Content>
          <div className="flex gap-1">
            <h1 className="font-bold text-5xl">Events</h1>
            <span>{filteredEvents.length}</span>
          </div>
          <div className="space-x-4 mt-4 flex">
            <Listbox value={city} onChange={handleCityChange}>
              <ListboxButton className="border border-primary-100 py-0.5 pl-3 pr-2 rounded-md flex gap-2 items-center">
                {!!city ? city : "All cities"}{" "}
                <ChevronDownIcon className="size-3 stroke-current" />
              </ListboxButton>
              <ListboxOptions
                modal={false}
                anchor="bottom start"
                className="z-10 text-gray-900 bg-white drop-shadow-sm rounded-lg mt-1 origin-top-left transition duration-200 ease-out data-[closed]:scale-90 data-[closed]:opacity-0"
                transition
              >
                <ListboxOption
                  value=""
                  className="data-[focus]:bg-primary-100 pl-2 pr-8 py-1 transition-colors duration-100"
                >
                  All cities
                </ListboxOption>
                {validCities.map((city) => (
                  <ListboxOption
                    value={city}
                    key={city}
                    className="data-[focus]:bg-primary-100 pl-2 pr-8 py-1 transition-colors duration-100"
                  >
                    {city}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
            <Listbox value={organiser} onChange={handleOrganiserChange}>
              <ListboxButton className="border border-primary-100 py-0.5 pl-3 pr-2 rounded-md flex gap-2 items-center">
                {!!organiser ? organiser : "All organisers"}{" "}
                <ChevronDownIcon className="size-3 stroke-current" />
              </ListboxButton>
              <ListboxOptions
                modal={false}
                anchor="bottom start"
                className="z-10 text-gray-900 bg-white drop-shadow-sm rounded-lg mt-1 origin-top-left transition duration-200 ease-out data-[closed]:scale-90 data-[closed]:opacity-0"
                transition
              >
                <ListboxOption
                  value=""
                  className="data-[focus]:bg-primary-100 pl-2 pr-8 py-1 transition-colors duration-100"
                >
                  All organisers
                </ListboxOption>
                {validOrganisers.map((o) => (
                  <ListboxOption
                    value={o}
                    key={o}
                    className="data-[focus]:bg-primary-100 pl-2 pr-8 py-1 transition-colors duration-100"
                  >
                    {o}
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </Listbox>
          </div>
        </PageHeader.Content>
      </PageHeader.Root>
      <main className="text-gray-900">
        <div className="bg-gray-50 rounded-[40px] pt-12 relative z-10 min-h-lvh">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12">
              {eventsToShow.length === 0 && <p>No events found.</p>}
              {eventsToShow.map((event) => (
                <EventCard {...event} key={event.id} />
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

export default PaginatedEventList;
