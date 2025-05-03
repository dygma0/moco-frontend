import { Link } from "@tanstack/react-router";
import HappyOtterImage from "../../assets/happy-otter.png";

export function SignupAside() {
	return (
		<aside className="hidden lg:flex lg:w-1/2 bg-[#f8f3e7] flex-col justify-center items-center p-12 relative">
			{/* Logo/Header section within aside */}
			<header className="absolute top-8 left-8">
				<Link to="/" className="flex items-center gap-2">
					<span className="text-lg font-medium text-[#333]">Quibe</span>
				</Link>
			</header>
			{/* Main content of the aside */}
			<section className="max-w-md text-center mb-8">
				<h1 className="text-3xl font-bold text-[#333] mb-4">
					지금 바로 시작하세요!
				</h1>
				<p className="text-[#666]">
					Quibe와 함께라면 알고리즘 실력 향상이 즐거워집니다. 지금 가입하고 첫
					문제에 도전해보세요!
				</p>
			</section>
			<div className="w-64 h-64 flex items-center justify-center">
				<img
					src={HappyOtterImage}
					alt="Illustration of a happy otter wearing glasses and reading a book"
					className="w-full h-auto max-w-[300px]"
				/>
			</div>
		</aside>
	);
}
