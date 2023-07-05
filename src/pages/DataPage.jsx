import axios from "axios";
import { Fragment, useReducer } from "react";
import { useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useUser from "../auth/useUser";
import useToken from "../auth/useToken";
import DataPageOption from "../components/DataPageOption";
// import DataRender from "../components/Draft/DataRender";

const imageUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp_3YqeetRoOdPsnESJq-J6MuPOrYpmZqxig&usqp=CAU";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Users", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  {
    name: "Sign out",
    href: "/",
    onclick: () => {
      localStorage.removeItem("ipoteka_token");
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DataPage() {
  localStorage.setItem(
    "ipoteka_token",
    "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLQlpqOXEtbk9yOXdPVmhRNXFibWx0NmVJMVp0OWlOa1c3eWhVMVZSN0cwIn0.eyJleHAiOjE2ODg0Nzc0NDUsImlhdCI6MTY4ODQ3Mzg0NSwianRpIjoiYzViZWU1NGEtYzExOS00ZGMwLWJkZDItYjgyYTcxNjU4ZmEwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL3BhcnNlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlNmRhM2ZlNS1lODBlLTRjZTktYWEwNy03NTA3OTg4NTQ0YTkiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJwYXJzZXIiLCJzZXNzaW9uX3N0YXRlIjoiNTFjNDIxNWUtYTMzMi00Y2E2LWFhN2YtMWU2NzA3MDllZWJhIiwiYWNyIjoiMSIsInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhcnNlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJwYXJzZXIiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjUxYzQyMTVlLWEzMzItNGNhNi1hYTdmLTFlNjcwNzA5ZWViYSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiKzk5ODk5NjA5MzExMCJ9.eHfBphCfemPU0lMVDN15sfmR-_w2e1U5O1o9R59XRiYc8LqqtJxj1KQD7vUeYJZBGj7bjHDIXWzmK-afG8JMhkc8SwcLMjWs0rjcxY1HTwQSC_VtCit0pvNILXxVKmHizpvinShzfh3ZhhqKd6yRqU5sbiPEKrh9ewKwcSrM5fPu_LsT9nDijjThYeM2Ible2GPHD8ISMAjSYIRsO6TPM53TMD5oXJzjVtiTUiE83L-3oT7hjx_s3A5MuP90fd10PWUc6IM4ZGWhvqcg9G8YvF9C8-nuiGbgRzhe95vreZ3KDjxE5BmCzLEHbHXj0czCdvSfqdTSKarfIloWcUsg3w"
  );
  const user = useUser();
  const [token] = useToken();
  console.log(user);
  console.log("My user");
  console.log(user);
  const [data, setData] = useState();
  const [mainListRefresh, refreshMainList] = useReducer((a) => !a, false);

  useEffect(() => {
    async function loadArticle() {
      // const response = await axios.get(`/offlineData.json`);
      try {
        const response = await axios.get(
          process.env.REACT_APP_PROXY + `/pinfl/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const newArticle = response.data;
        if (newArticle) {
          setData(newArticle);
        }
      } catch (e) {
        console.log(e.message);
        localStorage.removeItem("ipoteka_token");
      }
    }
    loadArticle();
  }, [mainListRefresh]);
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 object-contain rounded-md"
                        src={
                          process.env.PUBLIC_URL + "/images/opt-ipotkeka.png"
                        }
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl ? user.imageUrl : imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                    onClick={item.onclick}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.imageUrl ? user.imageUrl : imageUrl}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        onClick={item.onclick}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {data && (
              <>
                <DataPageOption data={data} refreshMainList={refreshMainList} />
                {/* <DataRender data={data} /> */}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
