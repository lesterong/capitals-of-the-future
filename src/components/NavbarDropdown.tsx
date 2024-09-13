import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Cities from "@content/city/cities.json";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const NavbarDropdown = ({ path }: { path: string }) => {
  const cities = Cities.map((city) => city.name);
  return (
    <Menu>
      <MenuButton className="font-medium text-gray-900/60 data-[active]:text-gray-900 hidden md:inline-flex gap-1 items-center">
        City
        <ChevronDownIcon className="size-3 stroke-current" />
      </MenuButton>
      <MenuItems
        modal={false}
        anchor="bottom start"
        className={`shadow-sm border border-gray-400/30 bg-gray-50/70 backdrop-blur-xl rounded-xl mt-3 py-1 z-[9999] grid grid-flow-col origin-top-left transition duration-200 ease-out data-[closed]:scale-90 data-[closed]:opacity-0`}
        style={{
          gridTemplateRows: `repeat(${cities.length <= 5 ? cities.length : 5}, minmax(0, 1fr))`,
        }}
        transition
      >
        {cities.map((city) => {
          return (
            // @ts-ignore
            <MenuItem className="block data-[focus]:text-gray-900" key={city}>
              <a
                className={`block py-1 pl-3 pr-8 
                  ${
                    `/${city.toLowerCase()}` === path
                      ? "text-gray-900 after:content-['']"
                      : "text-gray-900/60 hover:text-gray-900"
                  }`}
                href={`/${city.toLowerCase()}`}
              >
                {city}
              </a>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default NavbarDropdown;
