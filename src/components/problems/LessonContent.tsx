import { Icon } from "../ui/Icon";

// Define interfaces for the components
interface LessonContentProps {
	onClose: () => void;
}

interface LessonSectionProps {
	id: string;
	title: string;
	children: React.ReactNode;
	className?: string;
}

interface LessonKeyPointsProps {
	id: string;
	title: string;
	points: Array<{
		title: string;
		description: string;
	}>;
}

interface LessonCodeExampleProps {
	id: string;
	title: string;
	code: string;
}

// LessonSection component for consistent section styling
function LessonSection({
	id,
	title,
	children,
	className = "",
}: LessonSectionProps) {
	return (
		<section className={`mb-8 ${className}`} aria-labelledby={id}>
			<h2 id={id} className="text-xl font-medium text-[#333] mb-4">
				{title}
			</h2>
			{children}
		</section>
	);
}

// LessonKeyPoints component for displaying key points
function LessonKeyPoints({ id, title, points }: LessonKeyPointsProps) {
	return (
		<div className="bg-[#f8f3e7] p-4 rounded-lg border border-[#e6d7b8]">
			<h3 id={id} className="text-lg font-medium text-[#c28b3b] mb-2">
				{title}
			</h3>
			<ul className="list-disc pl-5 space-y-2 text-[#666]">
				{points.map((point, index) => (
					<li key={index}>
						<strong>{point.title}</strong> {point.description}
					</li>
				))}
			</ul>
		</div>
	);
}

// LessonCodeExample component for displaying code examples
function LessonCodeExample({ id, title, code }: LessonCodeExampleProps) {
	return (
		<section
			className="bg-black text-white p-4 rounded-lg mb-8"
			aria-labelledby={id}
		>
			<h3 id={id} className="text-lg font-medium mb-2">
				{title}
			</h3>
			<pre className="text-sm font-mono overflow-x-auto">{code}</pre>
		</section>
	);
}

export function LessonContent({ onClose }: LessonContentProps) {
	// Sample data for the lesson
	const keyPoints = [
		{
			title: "전처리 접근법:",
			description:
				"행렬을 미리 처리하여 누적 합을 계산해 두면 나중에 쿼리를 빠르게 처리할 수 있습니다.",
		},
		{
			title: "2D 누적 합:",
			description:
				"2차원 배열에서 누적 합을 효율적으로 계산하는 방법을 이해해야 합니다.",
		},
		{
			title: "시간 복잡도:",
			description:
				"전처리는 O(m*n)이 소요되지만, 각 쿼리는 O(1)에 처리할 수 있습니다.",
		},
	];

	const codeExample = `const matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
];

const numMatrix = new NumMatrix(matrix);
numMatrix.sumRegion(2, 1, 4, 3); // 8 반환 (영역: [[2,1],[3,1],[4,1],[2,2],[3,2],[4,2],[2,3],[3,3],[4,3]])
numMatrix.sumRegion(1, 1, 2, 2); // 11 반환 (영역: [[1,1],[1,2],[2,1],[2,2]])
numMatrix.sumRegion(1, 2, 2, 4); // 12 반환 (영역: [[1,2],[1,3],[1,4],[2,2],[2,3],[2,4]])`;

	return (
		<article className="flex flex-col h-full bg-white">
			{/* Header */}
			<header className="flex items-center justify-between p-4 border-b border-[#eaeaea]">
				<div className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-md bg-[#f8f3e7] flex items-center justify-center">
						<Icon
							id="lessonIcon"
							title="Lesson"
							className="h-4 w-4 text-[#c28b3b]"
						>
							<path d="M12 7v14"></path>
							<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
						</Icon>
					</div>
					<div>
						<h1 id="lesson-title" className="text-lg font-medium text-[#333]">
							2. Two Sum - 문제 소개
						</h1>
						<div className="flex items-center gap-2 text-sm">
							<span
								className="text-green-600"
								role="status"
								aria-label="Difficulty level: Easy"
							>
								Easy
							</span>
						</div>
					</div>
				</div>
				<button
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[#f8f3e7] hover:text-[#a67a2e] active:bg-[#e6d7b8] active:text-[#8a6626] h-8 w-8"
					onClick={onClose}
					aria-label="Close lesson"
				>
					<Icon id="closeIcon" title="Close" className="h-4 w-4">
						<path d="M18 6 6 18"></path>
						<path d="m6 6 12 12"></path>
					</Icon>
				</button>
			</header>

			{/* Tabs */}
			<nav className="border-b border-[#eaeaea]" aria-label="Lesson navigation">
				<div className="w-full">
					<div
						role="tablist"
						aria-orientation="horizontal"
						className="inline-flex items-center rounded-md text-muted-foreground bg-transparent w-full justify-start h-auto p-0 px-4"
					>
						<button
							type="button"
							role="tab"
							aria-selected={true}
							aria-controls="lesson-content-panel"
							id="lesson-content-tab"
							className="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground py-3 px-4 rounded-none data-[state=active]:shadow-none text-sm font-medium border-b-2 border-[#c28b3b] text-[#c28b3b]"
						>
							<span className="flex items-center">
								<Icon
									id="lessonTabIcon"
									title="Lesson"
									className="h-4 w-4 mr-1"
								>
									<path d="M12 7v14"></path>
									<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
								</Icon>
								문제 소개
							</span>
						</button>
					</div>
				</div>
			</nav>

			{/* Content */}
			<main
				className="flex-1 overflow-y-auto p-6"
				role="tabpanel"
				id="lesson-content-panel"
				aria-labelledby="lesson-content-tab"
				tabIndex={0}
			>
				<div className="max-w-4xl mx-auto">
					<LessonSection id="intro-heading" title="문제 소개">
						<p className="text-[#666] mb-4">
							이 문제는 주어진 2차원 행렬(matrix)에서 특정 직사각형 영역의 요소
							합을 효율적으로 계산하는 클래스를 구현하는 것입니다. 핵심은 행렬이
							불변 (immutable)하다는 점입니다. 즉, 한 번 생성된 행렬의 값은
							변경되지 않습니다.
						</p>
						<p className="text-[#666] mb-4">
							여러 번의{" "}
							<code className="bg-[#f8f8f6] px-1 rounded">sumRegion</code>{" "}
							쿼리가 주어질 때, 각 쿼리에 대해 지정된 범위 (왼쪽 위 모서리{" "}
							<code className="bg-[#f8f8f6] px-1 rounded">(row1, col1)</code>{" "}
							부터 오른쪽 아래 모서리{" "}
							<code className="bg-[#f8f8f6] px-1 rounded">(row2, col2)</code>{" "}
							까지) 내의 모든 요소의 합을 빠르게 반환해야 합니다.
						</p>
					</LessonSection>

					<LessonCodeExample
						id="example-heading"
						title="예시 사용법"
						code={codeExample}
					/>

					<LessonSection id="key-points-heading" title="이 문제의 핵심">
						<p className="text-[#666] mb-4">
							이 문제는 특히 여러 쿼리에 대해 효율한 합계를 사용하는
							시나리오에서 효율적인 계산 방법이 중요합니다.
						</p>
						<LessonKeyPoints
							id="core-points-heading"
							title="핵심 포인트"
							points={keyPoints}
						/>
					</LessonSection>

					<LessonSection id="description-heading" title="Description">
						<p className="text-[#666] mb-4">
							주어진 2D 행렬 matrix에 대해, 다음 유형의 여러 쿼리를 처리해야
							합니다.
						</p>
						<p className="text-[#666] mb-4">
							matrix의 요소들 중, 왼쪽 위 모서리 (row1, col1)과 오른쪽 아래
							모서리 (row2, col2)로 정의되는 사각형 내부 요소들의 합을 계산해야
							합니다.
						</p>
						<p className="text-[#666] mb-4">NumMatrix 클래스를 구현하세요:</p>
						<ul className="list-disc pl-5 space-y-2 text-[#666]">
							<li>
								<code className="bg-[#f8f8f6] px-1 rounded">
									NumMatrix(int[][] matrix)
								</code>
								: 정수 행렬 matrix로 객체를 초기화합니다.
							</li>
							<li>
								<code className="bg-[#f8f8f6] px-1 rounded">
									int sumRegion(int row1, int col1, int row2, int col2)
								</code>
								: 왼쪽 위 모서리 (row1, col1)과 오른쪽 아래 모서리 (row2,
								col2)로 정의되는 사각형 내부 matrix 요소들의 합을 반환합니다.
								<br />
								sumRegion이 O(1) 시간 복잡도로 동작하는 알고리즘을 설계해야
								합니다.
							</li>
						</ul>
					</LessonSection>

					<LessonSection id="constraints-heading" title="Constraints">
						<ul className="list-disc pl-5 space-y-2 text-[#666]">
							<li>m == matrix.length</li>
							<li>n == matrix[i].length</li>
							<li>1 &lt;= m, n &lt;= 200</li>
							<li>
								-10<sup>4</sup> &lt;= matrix[i][j] &lt;= 10<sup>4</sup>
							</li>
							<li>0 &lt;= row1 &lt;= row2 &lt; m</li>
							<li>0 &lt;= col1 &lt;= col2 &lt; n</li>
							<li>
								'sumRegion' 메소드는 최대 10<sup>4</sup>번 호출됩니다.
							</li>
						</ul>
					</LessonSection>
				</div>
			</main>

			{/* Footer */}
			<footer className="flex items-center justify-between p-4 border-t border-[#eaeaea]">
				<button
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-[#f8f3e7] hover:text-[#a67a2e] active:bg-[#e6d7b8] active:text-[#8a6626] rounded-md h-9 px-4 border-[#e0e0e0]"
					disabled
					aria-label="Go to previous lesson"
				>
					<Icon id="prevIcon" title="Previous" className="h-4 w-4 mr-1">
						<path d="m15 18-6-6 6-6"></path>
					</Icon>
					Previous
				</button>
				<div className="text-sm text-[#666]" aria-label="Lesson 1 of 9">
					1 of 9
				</div>
				<button
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-[#f8f3e7] hover:text-[#a67a2e] active:bg-[#e6d7b8] active:text-[#8a6626] rounded-md h-9 px-4 border-[#e0e0e0]"
					aria-label="Go to next lesson"
				>
					Next
					<Icon id="nextIcon" title="Next" className="h-4 w-4 ml-1">
						<path d="m9 18 6-6-6-6"></path>
					</Icon>
				</button>
			</footer>
		</article>
	);
}
