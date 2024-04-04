import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";

import ProfileDropdown from "./ProfileDropdown";

import { Link, useLocation } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../hooks";
import Modal from "../Modals/Modal";
import QuestionForm from "../QuestionForm/QuestionForm";

const Navbar = () => {
  const { isShowing, toggle } = useModal();

  const { logout, user } = useAuth();
  const location = useLocation();
  const menuItems = [
    {
      label: "Sign out",
      onClick: logout,
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Modal show={isShowing} onCloseButtonClick={toggle} title="Add Question">
        <QuestionForm afterSubmit={toggle} />
      </Modal>
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between">
                <div className="flex">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    <Link
                      to="/home"
                      className={`inline-flex items-center border-b-2 ${
                        isActive("/home")
                          ? "border-b-2 border-indigo-500"
                          : "hover:border-gray-300"
                      } px-1 pt-1 text-sm font-medium text-gray-900`}
                    >
                      Home
                    </Link>
                    <Link
                      to="/questions"
                      className={`inline-flex items-center border-b-2 ${
                        isActive("/questions")
                          ? "border-b-2 border-indigo-500"
                          : "hover:border-gray-300"
                      } px-1 pt-1 text-sm font-medium text-gray-900`}
                    >
                      Questions
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  {user?.role !== "patient" && (
                    <div className="flex-shrink-0">
                      <span
                        onClick={toggle}
                        className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                      >
                        <PlusIcon
                          className="-ml-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                        New Question
                      </span>
                    </div>
                  )}
                  <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                    <ProfileDropdown
                      avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      menuItems={menuItems}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 pb-3 pt-2">
                <Disclosure.Button
                  as={Link}
                  to={"/home"}
                  className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
                >
                  Home
                </Disclosure.Button>
                <Disclosure.Button
                  as={Link}
                  to="/questions"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Questions
                </Disclosure.Button>
                <Disclosure.Button
                  as="span"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-rose-400 hover:border-gray-300 hover:bg-gray-50 hover:text-red-700 sm:pl-5 sm:pr-6"
                  onClick={logout}
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
