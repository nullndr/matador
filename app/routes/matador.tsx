import { LinksFunction } from "@remix-run/node";
import { NavLink, Outlet, useCatch } from "@remix-run/react";
import { SideBar } from "~/components/Matador";
import { classNames } from "~/lib/matador/helpers/style-helpers";

const navigation = [
  { name: "Queues", href: "./queues" },
  { name: "Redis", href: "./redis" },
  { name: "Clients", href: "./clients" },
];

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/assets/matador.png",
      type: "image/png",
    },
  ];
};

export default function MatadorLayout() {
  return (
    <>
      <SideBar srcImage="/assets/matador.png" name="Matador">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "group flex items-center px-2 py-2 text-base font-medium rounded-md"
              )
            }
          >
            {item.name}
          </NavLink>
        ))}
      </SideBar>
      <div className="md:pl-64">
        <div className="py-6 px-4 sm:px-6 md:px-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <>
      <header>
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight text-gray-900">
            {`${caught.status} ${caught.statusText}`}
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl text-right mx-auto py-6 sm:px-6 lg:px-8">
          <p className="font-semibold">{caught.data}</p>
        </div>
      </main>
    </>
  );
}
