import { Link, createFileRoute } from "@tanstack/react-router";
import { LoginFooter } from "../../components/login/LoginFooter"; // Re-use footer
import { SignupAside } from "../../components/signup/SignupAside";
import { SignupForm } from "../../components/signup/SignupForm";

export const Route = createFileRoute("/signup/")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel Component */}
      <SignupAside />

      {/* Right Panel as <main> */}
      <main className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 bg-white">
        {/* Mobile Logo as <header> */}
        <header className="lg:hidden mb-8 w-full max-w-md">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-[#c28b3b] flex items-center justify-center text-white font-semibold">
              Q
            </div>
            {/* <span className="text-lg font-medium text-[#333]">Quibe</span> */}
          </Link>
        </header>

        <div className="w-full max-w-md">
          <section
            className="text-center mb-8"
            aria-labelledby="signup-heading"
          >
            <h2
              id="signup-heading"
              className="text-2xl font-bold text-[#333] mb-2"
            >
              회원가입
            </h2>
            <p className="text-[#666]">
              새 계정을 만들고 학습 여정을 시작하세요
            </p>
          </section>

          <div className="space-y-6">
            <SignupForm />
            {/* No social login buttons on signup page for now */}
          </div>

          {/* Login Link */}
          <div className="mt-8 text-center text-sm text-[#666]">
            <p>
              이미 계정이 있으신가요?{" "}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link
                to={"/login/" as any}
                className="text-[#c28b3b] font-medium hover:underline"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Component */}
        <LoginFooter />
      </main>
    </div>
  );
}
