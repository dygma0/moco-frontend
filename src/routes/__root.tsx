import {
  Outlet,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router";
import { NotFoundPage } from "../components/NotFoundPage";
import { SEO } from "../components/SEO";
import { Sidebar } from "../components/Sidebar";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  const { location } = useRouterState();
  const showSidebar = !["/login", "/signup"].includes(location.pathname);

  return (
    <>
      <SEO />
      <div
        className={`min-h-screen ${showSidebar ? "flex bg-[#f8f8f6]" : "bg-white"}`}
      >
        {showSidebar && <Sidebar />}

        <div className={`${!showSidebar ? "w-full" : "flex-1 overflow-auto"}`}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
