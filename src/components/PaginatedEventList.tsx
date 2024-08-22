import type { CollectionEntry } from "astro:content";
import EventCard from "./EventCard";

const PaginatedEventList = ({
  events,
}: {
  events: CollectionEntry<"event">[];
}) => {
  return (
    <>
      <header className="pt-32 pb-6 relative">
        <div className="max-w-6xl px-4 mx-auto">
          <div className="flex gap-1">
            <h1 className="font-bold text-5xl">Events</h1>
            <span>{events.length}</span>
          </div>
          <div className="space-x-4 mt-4">
            <button className="border border-gray-900 py-0.5 px-3 rounded-md">All cities</button>
            <button className="border border-gray-900 py-0.5 px-3 rounded-md">All organisers</button>
          </div>
        </div>
      </header>
      <main>
        <div className="bg-gray-50 rounded-[40px] pt-12 relative z-10 min-h-lvh">
          <div className="max-w-6xl px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-7">
              {events.map((event) => (
                <EventCard {...event} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PaginatedEventList;
