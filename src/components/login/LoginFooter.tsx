import { Link } from "@tanstack/react-router";

export function LoginFooter() {
	return (
		<footer className="pt-8 w-full max-w-md text-center text-xs text-[#999]">
			<p>© {new Date().getFullYear()} Quibe. All rights reserved.</p>
			{/* Navigation links within footer */}
			<nav aria-label="Footer links" className="mt-2 flex justify-center gap-4">
				{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
				<Link to={"/terms" as any} className="hover:text-[#666]">
					이용약관
				</Link>
				{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
				<Link to={"/privacy" as any} className="hover:text-[#666]">
					개인정보처리방침
				</Link>
				{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
				<Link to={"/help" as any} className="hover:text-[#666]">
					고객지원
				</Link>
			</nav>
		</footer>
	);
}
