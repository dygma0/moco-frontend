import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// TODO: Implement actual login logic
		console.log("Login attempt with:", { email, password });
	};

	return (
		<form className="space-y-6" onSubmit={handleLogin}>
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
				<div className="flex justify-between items-center">
					<label
						htmlFor="password"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						비밀번호
					</label>
					{/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
					<Link
						to={"/forgot-password" as any}
						className="text-xs text-[#c28b3b] hover:underline"
					>
						비밀번호를 잊으셨나요?
					</Link>
				</div>
				<div className="relative">
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						placeholder="••••••••"
						autoComplete="current-password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="flex w-full rounded-md border border-gray-200 bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c28b3b] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-12 pr-10"
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

			{/* Login Button */}
			<Button type="submit" variant="primary" size="lg" className="w-full h-12">
				로그인
			</Button>
		</form>
	);
}
