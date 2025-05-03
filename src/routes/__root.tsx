import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/Sidebar";
import { NotFoundPage } from "../components/NotFoundPage";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFoundPage,
});

function RootComponent() {
	return (
		<div className="flex h-screen bg-[#f8f8f6]">
			{/* Sidebar */}
			<Sidebar />

			{/* Main content */}
			<div className="flex-1 overflow-auto">
				<Outlet />
			</div>
		</div>
	);
}
