import BookmarkIcon from "~/components/icons/bookmarkIcon";
import MoviesIcon from "~/components/icons/moviesIcon";
import HomeIcon from "~/components/icons/homeIcon";
import TvSeriesIcon from "~/components/icons/tvSeriesIcon";
import { Form, NavLink, Outlet } from "@remix-run/react";

export default function MediaPage() {
  return (
    <div className=" flex h-full  flex-col items-center justify-center bg-blue-dark lg:mt-0 lg:flex-row">
      <nav className="fixed top-0 flex  w-full items-center justify-center p-0 text-white md:top-4 md:w-[96%] lg:left-2 lg:mt-0  lg:h-full   lg:w-[4rem]">
        <ul className="flex w-full list-none items-center justify-between gap-8 bg-blue-semi px-4 py-2 md:rounded-2xl lg:h-[90%]  lg:flex-col lg:px-0 lg:py-4">
          <li className="">
            <img src="../assets/logo.svg" alt="" />
          </li>
          <li className=" w-6">
            <NavLink to="/media/all" className="group">
              {({ isActive }) => <HomeIcon isActive={isActive} />}
            </NavLink>
          </li>
          <li className="">
            <NavLink to="/media/movies" className="group">
              {({ isActive }) => <MoviesIcon isActive={isActive} />}
            </NavLink>
          </li>
          <li className="w-6">
            {" "}
            <NavLink to="/media/tv-series" className="group">
              {({ isActive }) => <TvSeriesIcon isActive={isActive} />}
            </NavLink>
          </li>
          <li className="w-6">
            {" "}
            <NavLink to="/media/bookmarks" className="group">
              {({ isActive }) => <BookmarkIcon isActive={isActive} />}
            </NavLink>
          </li>
          <li className="flex items-center lg:mt-auto lg:flex-col">
            <img src="../assets/image-avatar.png" alt="" className="w-12" />
            <Form action="/logout" method="post">
              <button type="submit">Logout</button>
            </Form>
          </li>
        </ul>
      </nav>
      <main className="mt-[5rem] h-full w-full md:mt-[12rem] lg:mt-0 lg:ml-[10rem]">
        <Outlet />
      </main>
    </div>
  );
}
