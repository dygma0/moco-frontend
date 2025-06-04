import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useSignup } from "../../api/hooks/useSignup";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signupMutation = useSignup();

  useEffect(() => {
    if (signupMutation.isSuccess && signupMutation.data.success) {
      navigate({ to: "/login" });
    }
  }, [signupMutation.isSuccess, signupMutation.data, navigate]);

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setPasswordError(false);

    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
      setPasswordError(true);
      confirmPasswordRef.current?.focus();
      return;
    }

    signupMutation.mutate(
      { name, email, password },
      {
        onSuccess: (data) => {
          if (!data.success) {
            setErrorMessage(data.message || "회원가입에 실패했습니다");
          }
        },
        onError: (error) => {
          setErrorMessage(error.message || "회원가입에 실패했습니다");
        },
      },
    );
  };

  const handlePasswordFocus = () => {
    if (passwordError) {
      setPasswordError(false);
      setErrorMessage("");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSignup}>
      {/* Name Input */}
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          이름
        </label>
        <input
          type="text"
          id="name"
          placeholder="홍길동"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c28b3b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12"
        />
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          이메일
        </label>
        <input
          type="email"
          id="email"
          placeholder="name@example.com"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c28b3b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12"
        />
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          비밀번호
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handlePasswordFocus}
            className={`flex w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 pr-10 ${passwordError ? "border-red-300 focus-visible:ring-red-300" : "border-gray-200 focus-visible:ring-[#c28b3b]"}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Icon
              id={showPassword ? "eyeOffIcon" : "eyeIcon"}
              title={showPassword ? "Hide password" : "Show password"}
              size={20}
              aria-hidden="true"
            >
              {showPassword ? (
                <>
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </>
              ) : (
                <>
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </Icon>
          </button>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          비밀번호 확인
        </label>
        <div className="relative">
          <input
            ref={confirmPasswordRef}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={handlePasswordFocus}
            aria-describedby="confirmPasswordError"
            className={`flex w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 pr-10 ${passwordError ? "border-red-300 focus-visible:ring-red-300" : "border-gray-200 focus-visible:ring-[#c28b3b]"}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            <Icon
              id={showConfirmPassword ? "eyeOffIcon" : "eyeIcon"}
              title={showConfirmPassword ? "Hide password" : "Show password"}
              size={20}
              aria-hidden="true"
            >
              {showConfirmPassword ? (
                <>
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                  <line x1="2" x2="22" y1="2" y2="22" />
                </>
              ) : (
                <>
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </>
              )}
            </Icon>
          </button>
        </div>
        {errorMessage && (
          <p
            id="confirmPasswordError"
            className="text-sm text-red-600 mt-1"
            aria-live="polite"
          >
            {errorMessage}
          </p>
        )}
      </div>

      {/* Signup Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full h-12"
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        ) : (
          "회원가입"
        )}
      </Button>

      {/* Show success message if signup was successful */}
      {signupMutation.isSuccess && signupMutation.data.success && (
        <p className="text-sm text-green-600 mt-2 text-center">
          회원가입이 완료되었습니다. 로그인 페이지로 이동합니다...
        </p>
      )}
    </form>
  );
}
