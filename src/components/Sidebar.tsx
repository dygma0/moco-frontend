import { Link, useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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
      <span className="sidebar-text">{children}</span>
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

function Header({ expanded }: { expanded: boolean }) {
  return (
    <div className={`p-2 mb-6 flex ${expanded ? "" : "justify-center"}`}>
      <div
        className={`flex items-center gap-2 ${expanded ? "" : "justify-center"}`}
      >
        <div className="h-8 w-8 rounded-md bg-[#f8f3e7] flex items-center justify-center text-[#c28b3b] font-semibold">
          Q
        </div>
        <div className="sidebar-text">
          <div className="font-medium text-[#333]">Quibe</div>
          <div className="text-xs text-[#888]">Not a test. Just a vibe 🔥</div>
        </div>
      </div>
    </div>
  );
}

function UserProfile({ expanded }: { expanded: boolean }) {
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
    <div
      className={`mt-auto pt-4 border-t border-[#eaeaea] ${expanded ? "" : "flex flex-col items-center"}`}
    >
      {expanded ? (
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
            className="text-[#888] hover:text-[#333] self-center"
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
                aria-hidden="true"
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
      ) : (
        <div className="flex flex-col items-center py-4">
          <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8 bg-[#f0f0f0] items-center justify-center text-[#666] font-medium">
            {isAuthenticated ? getInitials(user.name) : "?"}
          </span>
        </div>
      )}
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
  expanded?: boolean;
};

function NavSection({ title, items, expanded = false }: NavSectionProps) {
  return (
    <div className={title ? "mt-8" : ""}>
      {title && (
        <div className="text-xs font-medium text-[#888] px-3 mb-2 sidebar-text">
          {title}
        </div>
      )}
      <nav
        className={`space-y-1 ${expanded ? "" : "flex flex-col items-center"}`}
      >
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
  const [expanded, setExpanded] = useState(false);

  // 화면이 좁아졌을 때 자동으로 접힘
  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handleResize = () => {
      if (media.matches) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };
    handleResize(); // mount 시 체크
    media.addEventListener("change", handleResize);
    return () => media.removeEventListener("change", handleResize);
  }, []);

  // Add CSS for sidebar text visibility
  const sidebarStyles = `
		.sidebar-text {
			display: ${expanded ? "block" : "none"};
		}
	`;

  // 사이드바 토글 버튼 (오른쪽 가장자리)
  const ToggleButton = (
    <button
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
      className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white border border-[#eaeaea] rounded-full p-1 shadow-sm hover:shadow-md transition-all z-10"
      aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-chevron-right h-4 w-4 text-[#888]"
        aria-hidden="true"
      >
        {expanded ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  );

  return (
    <div className="relative">
      <style>{sidebarStyles}</style>
      {/* Sidebar 본체 + 토글 버튼 */}
      <div
        className={`
					h-screen bg-white border-r border-[#eaeaea] p-4 flex flex-col relative
					transition-all duration-300 ease-in-out
					${expanded ? "w-[240px]" : "w-[70px]"}
				`}
      >
        <Header expanded={expanded} />
        <NavSection items={mainNavItems} expanded={expanded} />
        <UserProfile expanded={expanded} />
        {/* 토글 버튼 */}
        {ToggleButton}
      </div>
    </div>
  );
}
