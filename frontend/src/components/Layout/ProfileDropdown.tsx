import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

type ProfileDropdownProps = {
  avatarSrc: string;
  menuItems: MenuItem[];
};

type MenuItem = {
  label: string;
  onClick?: () => void;
  to?: string;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  avatarSrc,
  menuItems,
}) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={avatarSrc} alt="Profile Picture" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems.map((item, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <>
                  {item.to ? (
                    <Link
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-100" : "text-gray-700"
                      }`}
                      to={item.to}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-100" : "text-gray-700"
                      }`}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
