import { Link, createFileRoute } from "@tanstack/react-router";
import { LoginAside } from "../../components/login/LoginAside";
import { LoginFooter } from "../../components/login/LoginFooter";
import { LoginForm } from "../../components/login/LoginForm";
import { SocialLoginButtons } from "../../components/login/SocialLoginButtons";

export const Route = createFileRoute("/login/")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel Component */}
      <LoginAside />

      {/* Right Panel as <main> */}
      <main className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 bg-white">
        {/* Mobile Logo as <header> */}
        <header className="lg:hidden mb-8 w-full max-w-md">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Link to={"/" as any} className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-[#c28b3b] flex items-center justify-center text-white font-semibold">
              Q
            </div>
          </Link>
        </header>

        <div className="w-full max-w-md">
          <section className="text-center mb-8" aria-labelledby="login-heading">
            <h2
              id="login-heading"
              className="text-2xl font-bold text-[#333] mb-2"
            >
              로그인
            </h2>
            <p className="text-[#666]">계정에 로그인하고 학습을 계속하세요</p>
          </section>

          <div className="space-y-6">
            <LoginForm />
            <SocialLoginButtons />
          </div>

          {/* Signup Link */}
          <div className="mt-8 text-center text-sm text-[#666]">
            <p>
              계정이 없으신가요?{" "}
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Link
                to={"/signup" as any}
                className="text-[#c28b3b] font-medium hover:underline"
              >
                회원가입
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
