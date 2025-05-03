import {
	createRootRoute,
	Link,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";
import { Sidebar } from "../components/Sidebar";
import { NotFoundPage } from "../components/NotFoundPage";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFoundPage,
});

function RootComponent() {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const isLoginPage = pathname === "/login";

	return (
		<div
			className={`min-h-screen ${isLoginPage ? "bg-white" : "flex bg-[#f8f8f6]"}`}
		>
			{!isLoginPage && <Sidebar />}

			<div
				className={`${isLoginPage ? "w-full h-screen" : "flex-1 overflow-auto"}`}
			>
				<Outlet />
			</div>
		</div>
	);
}
