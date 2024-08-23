import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Cities from "@content/city/cities.json";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const NavbarDropdown = () => {
  const cities = Cities.map((city) => city.name);
  return (
    <Menu>
      <MenuButton className="text-gray-900/65 data-[active]:text-gray-900 hidden md:inline-flex gap-1 items-center">
        City
        <ChevronDownIcon className="size-3 stroke-current" />
      </MenuButton>
      <MenuItems
        anchor="bottom start"
        className="bg-white/70 backdrop-blur-xl rounded-xl mt-3 py-1 z-20"
      >
        {cities.map((city) => {
          return (
            <MenuItem>
              <a
                className="block py-1 pl-3 pr-8 text-gray-900/65 hover:text-gray-900"
                href={city.toLowerCase()}
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
