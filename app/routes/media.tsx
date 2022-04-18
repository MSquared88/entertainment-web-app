import BookmarkIcon from "~/components/icons/bookmarkIcon";
import MoviesIcon from "~/components/icons/moviesIcon";
import HomeIcon from "~/components/icons/homeIcon";
import TvSeriesIcon from "~/components/icons/tvSeriesIcon";
import { Form, NavLink, Outlet } from "@remix-run/react";

export default function MediaPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-blue-dark  pt-[1rem] lg:flex-row lg:pt-0">
      <nav className="flex h-[5rem] w-[96%] items-center justify-center bg-blue-dark text-white lg:mt-0 lg:h-[96%] lg:w-full">
        <ul className="flex h-full w-full list-none items-center justify-between gap-8 rounded-2xl bg-blue-semi lg:h-full lg:w-24 lg:flex-col">
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
          <li className=" flex items-center lg:mt-auto lg:flex-col">
            <img src="../assets/image-avatar.png" alt="" className="w-12" />
            <Form action="/logout" method="post">
              <button type="submit">Logout</button>
            </Form>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
