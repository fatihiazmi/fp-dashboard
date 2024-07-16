"use client";
// import ThemeChange from "./ThemeChange";
import Link from "next/link";
import SignOut from "@/components/SignOut";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const Navbar = ({ children }) => {
  const { user } = useAuth();
  const pathname = usePathname()
  console.log(pathname);
  const isHomePage = pathname === "/" || pathname === "/dashboard";

  return (
    <>
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="navbar bg-base-300 w-full">
            {!isHomePage && (
              <div className="flex-none">
                <label
                  htmlFor="my-drawer-3"
                  aria-label="open sidebar"
                  className="btn btn-square btn-ghost"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-6 w-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
            )}
            <div className="mx-2 flex-1 px-2 text-xl font-semibold">
                First Pride Contest Dashboard
            </div>
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                {user && (
                  <>
                    <li>
                      <SignOut />
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <Link href="/dashboard/online">Online</Link>
            </li>
            <li>
              <Link className="text-gray-500 cursor-not-allowed" onClick={(e) => {e.preventDefault()}} href="/dashboard/speedrun">Speedrun (Unavailable)</Link>
            </li>
            <li>
              <Link className="text-gray-500 cursor-not-allowed" onClick={(e) => {e.preventDefault()}} href="/dashboard/on-ground">On-Ground (Unavailable)</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
