import type { CollectionEntry } from "astro:content";
import Cities from "@content/city/cities.json";
import { useEffect, useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { RESEARCH_PER_PAGE } from "consts";
import Pagination from "./Pagination";
import ResearchCard from "./ResearchCard";

const PaginatedResearchList = ({
  research,
}: {
  research: CollectionEntry<"research">[];
}) => {
  const validCities = Cities.map((city) => city.name);
  const validOrganisations = ["Asia Research Institute", "Others"];
  const [city, setCity] = useState<string>("");
  const [organisation, setOrganisation] = useState<string>("");

  const filteredResearch = research
    .filter((r) => {
      return city === "" || r.data.cities.includes(city);
    })
    .filter((r) => {
      return organisation === "" || r.data.organisation === organisation;
    });

  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(filteredResearch.length / RESEARCH_PER_PAGE);

  const researchToShow = filteredResearch.slice(
    (page - 1) * RESEARCH_PER_PAGE,
    page * RESEARCH_PER_PAGE,
  );

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlCity = urlParams.get("city");
    const urlOrganisation = urlParams.get("organisation");
    const urlPage = Number(urlParams.get("page"));
    if (validCities.includes(urlCity || "")) {
      setCity(urlCity || "");
    }

    if (validOrganisations.includes(urlOrganisation || "")) {
      setOrganisation(urlOrganisation || "");
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
      `/research${urlParams.size > 0 ? `?${urlParams.toString()}` : ""}`,
    );
    setCity(newCity);
  };

  const handleOrganisationChange = (newOrganisation: string) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (newOrganisation) {
      urlParams.set("organisation", newOrganisation);
    } else {
      urlParams.delete("organisation");
    }

    if (newOrganisation != organisation) {
      urlParams.delete("page");
      setPage(1);
    }

    history.replaceState(
      {},
      "",
      `/research${urlParams.size > 0 ? `?${urlParams.toString()}` : ""}`,
    );
    setOrganisation(newOrganisation);
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
      `/research${urlParams.size > 0 ? `?${urlParams.toString()}` : ""}`,
    );
  };

  return (
    <>
      <header className="pt-32 pb-6 sticky top-0">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex gap-1">
            <h1 className="font-bold text-5xl">Research</h1>
            <span>{filteredResearch.length}</span>
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
            <Listbox value={organisation} onChange={handleOrganisationChange}>
              <ListboxButton className="border border-gray-900 py-0.5 pl-3 pr-2 rounded-md flex gap-2 items-center">
                {!!city ? city : "All organisations"}{" "}
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
                  All organisations
                </ListboxOption>
                {validOrganisations.map((org) => (
                  <ListboxOption
                    value={org}
                    key={org}
                    className="data-[focus]:bg-sky-100 pl-2 pr-8 py-1"
                  >
                    {org}
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
            <div className="grid grid-cols-1 gap-y-7">
              {researchToShow.length === 0 && <p>No research found.</p>}
              {researchToShow.map((r) => (
                <ResearchCard {...r} key={r.id} />
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

export default PaginatedResearchList;
