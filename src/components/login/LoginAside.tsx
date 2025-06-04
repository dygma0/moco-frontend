import { Link } from "@tanstack/react-router";
import HappyOtterImage from "../../assets/happy-otter.png";

export function LoginAside() {
  return (
    <aside className="hidden lg:flex lg:w-1/2 bg-[#f8f3e7] flex-col justify-center items-center p-12 relative">
      {/* Logo/Header section within aside */}
      <header className="absolute top-8 left-8">
        <Link to="/problems" className="flex items-center gap-2">
          <span className="text-lg font-medium text-[#333]">Quibe</span>
        </Link>
      </header>
      {/* Main content of the aside */}
      <section className="max-w-md text-center mb-8">
        <h1 className="text-3xl font-bold text-[#333] mb-4">
          알고리즘 학습의 새로운 시작
        </h1>
        <p className="text-[#666]">
          AI와 함께 당신의 컴퓨팅 사고력과 요구사항 분석 능력을 단계적으로
          발전시키며, 문제 해결의 즐거움과 성취감을 경험해보세요.
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
