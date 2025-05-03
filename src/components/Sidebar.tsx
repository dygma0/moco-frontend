import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useAuthStore } from "../api/auth/authStore";

type IconProps = {
	id: string;
	title: string;
	children: ReactNode;
};

function Icon({ id, title, children }: IconProps) {
	return (
		<span className="text-[#888]">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				aria-labelledby={id}
			>
				<title id={id}>{title}</title>
				{children}
			</svg>
		</span>
	);
}

type NavLinkProps = {
	to: string;
	icon: ReactNode;
	children: ReactNode;
};

function NavLink({ to, icon, children }: NavLinkProps) {
	const baseClassName =
		"flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-[#666] hover:bg-[#f8f8f6]";
	const activeClassName =
		"flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors bg-[#f8f8f6] text-[#333] font-medium";

	return (
		<Link
			to={to}
			className={baseClassName}
			activeProps={{
				className: activeClassName,
			}}
			activeOptions={{
				exact: to === "/",
			}}
		>
			{icon}
			{children}
		</Link>
	);
}

const mainNavItems = [
	{
		to: "/",
		label: "Dashboard",
		icon: (
			<Icon id="dashboardIcon" title="Dashboard icon">
				<rect width="7" height="9" x="3" y="3" rx="1" />
				<rect width="7" height="5" x="14" y="3" rx="1" />
				<rect width="7" height="9" x="14" y="12" rx="1" />
				<rect width="7" height="5" x="3" y="16" rx="1" />
			</Icon>
		),
	},
	{
		to: "/problems",
		label: "Problems",
		icon: (
			<Icon id="problemsIcon" title="Problems icon">
				<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
				<path d="M14 2v6h6" />
				<path d="M16 13H8" />
				<path d="M16 17H8" />
				<path d="M10 9H8" />
			</Icon>
		),
	},
	{
		to: "/submissions",
		label: "Submissions",
		icon: (
			<Icon id="submissionsIcon" title="Submissions icon">
				<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
				<polyline points="22 4 12 14.01 9 11.01" />
			</Icon>
		),
	},
	{
		to: "/settings",
		label: "Settings",
		icon: (
			<Icon id="settingsIcon" title="Settings icon">
				<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
				<circle cx="12" cy="12" r="3" />
			</Icon>
		),
	},
];

const shortcutNavItems = [
	{
		to: "/new-problem",
		label: "Add new Problem",
		icon: (
			<Icon id="addProblemIcon" title="Add new problem icon">
				<path d="M5 12h14" />
				<path d="M12 5v14" />
			</Icon>
		),
	},
	{
		to: "/usage",
		label: "Workspace usage",
		icon: (
			<Icon id="workspaceIcon" title="Workspace usage icon">
				<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
				<path d="M21 3v5h-5" />
			</Icon>
		),
	},
	{
		to: "/progress",
		label: "Progress tracking",
		icon: (
			<Icon id="progressIcon" title="Progress tracking icon">
				<path d="M3 3v18h18" />
				<path d="m19 9-5 5-4-4-3 3" />
			</Icon>
		),
	},
	{
		to: "/overview",
		label: "Overview - Problems solved",
		icon: (
			<Icon id="overviewIcon" title="Overview icon">
				<rect width="18" height="18" x="3" y="3" rx="2" />
				<path d="M9 9h6" />
				<path d="M9 15h6" />
			</Icon>
		),
	},
];

function Header() {
	return (
		<div className="p-2 mb-6">
			<div className="flex items-center gap-2">
				<div className="h-8 w-8 rounded-md bg-[#f8f3e7] flex items-center justify-center text-[#c28b3b] font-semibold">
					Q
				</div>
				<div>
					<div className="font-medium text-[#333]">Quibe</div>
					<div className="text-xs text-[#888]">Not a test. Just a vibe 🔥</div>
				</div>
			</div>
		</div>
	);
}

function UserProfile() {
	const user = useAuthStore((state) => state.user);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const clearAuth = useAuthStore((state) => state.clearAuth);
	const navigate = useNavigate();

	const handleLogout = () => {
		clearAuth();
		navigate({ to: "/login" });
	};

	// Get initials from name
	const getInitials = (name: string | null) => {
		if (!name) return "?";
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase();
	};

	return (
		<div className="mt-auto pt-4 border-t border-[#eaeaea]">
			<div className="flex items-center justify-between p-2">
				<div className="flex items-center gap-2">
					<span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 bg-[#f0f0f0] items-center justify-center text-[#666] font-medium">
						{isAuthenticated ? getInitials(user.name) : "?"}
					</span>
					<div>
						<div className="text-sm font-medium text-[#333]">
							{isAuthenticated ? user.name : "Guest User"}
						</div>
						<div className="text-xs text-[#888]">
							{isAuthenticated ? user.email : "Not logged in"}
						</div>
					</div>
				</div>
				<button
					type="button"
					className="text-[#888] hover:text-[#333]"
					onClick={
						isAuthenticated ? handleLogout : () => navigate({ to: "/login" })
					}
					title={isAuthenticated ? "Logout" : "Login"}
				>
					{isAuthenticated ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
							<polyline points="16 17 21 12 16 7" />
							<line x1="21" y1="12" x2="9" y2="12" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
							<polyline points="10 17 15 12 10 7" />
							<line x1="15" y1="12" x2="3" y2="12" />
						</svg>
					)}
				</button>
			</div>
		</div>
	);
}

type NavSectionProps = {
	title?: string;
	items: Array<{
		to: string;
		label: string;
		icon: ReactNode;
	}>;
};

function NavSection({ title, items }: NavSectionProps) {
	return (
		<div className={title ? "mt-8" : ""}>
			{title && (
				<div className="text-xs font-medium text-[#888] px-3 mb-2">{title}</div>
			)}
			<nav className="space-y-1">
				{items.map((item) => (
					<NavLink key={item.label} to={item.to} icon={item.icon}>
						{item.label}
					</NavLink>
				))}
			</nav>
		</div>
	);
}

export function Sidebar() {
	return (
		<div className="w-[240px] bg-white border-r border-[#eaeaea] p-4 flex flex-col h-screen">
			<Header />
			<NavSection items={mainNavItems} />
			<NavSection title="Shortcuts" items={shortcutNavItems} />
			<UserProfile />
		</div>
	);
}
