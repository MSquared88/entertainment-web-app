import { Outlet } from "@remix-run/react";

//db

export default function MediaPage() {
  return (
    <div className="flex  w-full">
      <Outlet />
    </div>
  );
}
