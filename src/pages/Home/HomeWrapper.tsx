import { Link, Outlet } from "@tanstack/react-router";
import { CheckCircle, DollarSign, Grid2X2, Home, LogOut } from "lucide-react";

const HomeWrapper = () => {
  const links = [
    {
      title: "Dashboard",
      href: "/home",
      icon: Grid2X2,
    },
    {
      title: "Expenses",
      href: "/home/expenses",
      icon: DollarSign,
    },
    {
      title: "Earnings",
      href: "/home/earnings",
      icon: CheckCircle,
    },
    {
      title: "Savings",
      href: "/home/savings",
      icon: Home,
    },
  ];

  return (
    <div className="h-screen w-full flex bg-white">
      <div className="w-96 h-full p-6 px-4">
        <div className="h-full flex flex-col justify-between  gap-2.5">
          <ul className=" flex flex-col gap-2.5">
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <li className="" key={`${link}-${index}`}>
                  <Link
                    to={link.href}
                    activeProps={{
                      className: "bg-gray-700 text-white border-gray-700", // applied when active
                    }}
                    className="w-full gap-2.5 capitalize flex items-center text-gray-700 border border-gray-200 bg-gray-100 rounded-lg px-4 py-2 hover:bg-gray-700 hover:text-white transition-all ease-in-out duration-300"
                  >
                    <Icon className="h-4 w-4" />
                    {link.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button className="w-full flex cursor-pointer gap-2.5 items-center text-white bg-gray-700 rounded-lg px-4 py-2">
             <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center p-2 pl-0">
        <div className="w-full h-full  bg-gray-100 rounded-4xl py-6">
          <div className="w-full h-full overflow-y-scroll py-2.5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWrapper;
