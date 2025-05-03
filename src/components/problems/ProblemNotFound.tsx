import searchOtter from "../../assets/search-otter.png";

export function ProblemNotFound() {
	const headingId = "problem-not-found-heading";

	return (
		<section
			className="lg:w-3/5 h-[calc(100vh-180px)] border-r border-[#eaeaea] flex items-center justify-center p-6"
			aria-labelledby={headingId}
		>
			<div className="flex flex-col items-center justify-center text-center">
				<div className="mb-6">
					<img
						src={searchOtter}
						alt="Illustration of an otter with a magnifying glass searching"
						width="120"
						height="120"
					/>
				</div>
				<h2 id={headingId} className="text-2xl font-bold text-[#333] mb-2">
					문제를 찾을 수 없습니다
				</h2>
				<p className="text-[#666] mb-6 max-w-md">
					요청하신 문제가 존재하지 않거나, 삭제되었거나, 일시적으로 사용할 수
					없습니다.
				</p>
			</div>
		</section>
	);
}
