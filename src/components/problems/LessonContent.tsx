import { useState, useEffect } from "react";
import { Icon } from "../ui/Icon";
import { useLessons } from "../../api/hooks/useLessons";
import { TextContent } from "./lesson/TextContent";
import { GapFillContent } from "./lesson/GapFillContent";
import { ImplementationContent } from "./lesson/ImplementationContent";
import type { LessonSection } from "../../api/challenges";

interface LessonContentProps {
	onClose: () => void;
	challengeId?: string;
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
			<ul className="list-disc pl-5 space-y-2 text-[#666] text-base">
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
			<pre className="text-base font-mono overflow-x-auto">{code}</pre>
		</section>
	);
}

export function LessonContent({
	onClose,
	challengeId = "6810e04894294c605ee43018",
}: LessonContentProps) {
	const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

	const { data: lessons, isLoading, isError, error } = useLessons(challengeId);

	// Reset section index when lesson changes
	useEffect(() => {
		setCurrentSectionIndex(0);
	}, [currentLessonIndex]);

	const currentLesson =
		lessons && lessons.length > 0 ? lessons[currentLessonIndex] : null;
	const sections = currentLesson?.sections || [];
	const currentSection =
		sections.length > 0 ? sections[currentSectionIndex] : null;

	const totalLessons = lessons?.length || 0;
	const totalSections = sections.length;

	const handleNextSection = () => {
		if (currentSectionIndex < totalSections - 1) {
			setCurrentSectionIndex(currentSectionIndex + 1);
		} else if (currentLessonIndex < totalLessons - 1) {
			setCurrentLessonIndex(currentLessonIndex + 1);
		}
	};

	const handlePrevSection = () => {
		if (currentSectionIndex > 0) {
			setCurrentSectionIndex(currentSectionIndex - 1);
		} else if (currentLessonIndex > 0) {
			setCurrentLessonIndex(currentLessonIndex - 1);
			// Set to the last section of the previous lesson
			const prevLesson = lessons?.[currentLessonIndex - 1];
			if (prevLesson) {
				setCurrentSectionIndex(prevLesson.sections.length - 1);
			}
		}
	};

	// Render content based on section type
	const renderSectionContent = (section: LessonSection) => {
		switch (section.type) {
			case "TEXT":
				return <TextContent section={section} />;
			case "GAP_FILL":
				return <GapFillContent section={section} />;
			case "IMPLEMENTATION":
				return <ImplementationContent section={section} />;
			default:
				return <div>Unsupported section type</div>;
		}
	};

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
							<path d="M12 7v14" />
							<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
						</Icon>
					</div>
					<div>
						<h1 id="lesson-title" className="text-lg font-medium text-[#333]">
							{currentSection ? currentSection.title : "Loading..."}
						</h1>
						<div className="flex items-center gap-2 text-sm">
							{!isLoading && currentLesson && (
								<span className="text-[#666]">
									Lesson {currentLessonIndex + 1} of {totalLessons}
								</span>
							)}
						</div>
					</div>
				</div>
				<button
					type="button"
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-[#f8f3e7] hover:text-[#a67a2e] active:bg-[#e6d7b8] active:text-[#8a6626] h-8 w-8"
					onClick={onClose}
					aria-label="Close lesson"
				>
					<Icon id="closeIcon" title="Close" className="h-4 w-4">
						<path d="M18 6 6 18" />
						<path d="m6 6 12 12" />
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
									<path d="M12 7v14" />
									<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
								</Icon>
								학습 자료
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
			>
				<div className="max-w-4xl mx-auto">
					{isLoading && (
						<div className="flex justify-center items-center h-64">
							<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#c28b3b]" />
						</div>
					)}

					{isError && (
						<div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
							<h2 className="text-lg font-medium mb-2">
								Error Loading Lessons
							</h2>
							<p>
								{error instanceof Error
									? error.message
									: "An unknown error occurred"}
							</p>
						</div>
					)}

					{!isLoading && !isError && !currentSection && (
						<div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md">
							<h2 className="text-lg font-medium mb-2">No Lessons Available</h2>
							<p>There are no lessons available for this challenge.</p>
						</div>
					)}

					{!isLoading && !isError && currentSection && (
						<div className="space-y-6">
							{renderSectionContent(currentSection)}
						</div>
					)}
				</div>
			</main>

			{/* Footer */}
			<footer className="flex items-center justify-between p-4 border-t border-[#eaeaea]">
				<button
					type="button"
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-[#f8f3e7] hover:text-[#a67a2e] active:bg-[#e6d7b8] active:text-[#8a6626] rounded-md h-9 px-4 border-[#e0e0e0]"
					onClick={handlePrevSection}
					disabled={
						isLoading || (currentLessonIndex === 0 && currentSectionIndex === 0)
					}
					aria-label="Go to previous section"
				>
					<Icon id="prevIcon" title="Previous" className="h-4 w-4 mr-1">
						<path d="m15 18-6-6 6-6" />
					</Icon>
					Previous
				</button>
				<div
					className="text-sm text-[#666]"
					aria-label={`Section ${currentSectionIndex + 1} of ${totalSections}`}
				>
					{!isLoading && currentSection
						? `${currentSectionIndex + 1} of ${totalSections}`
						: ""}
				</div>
				<button
					type="button"
					className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-[#f8f3e7] hover:text-[#a67a2e] active:bg-[#e6d7b8] active:text-[#8a6626] rounded-md h-9 px-4 border-[#e0e0e0]"
					onClick={handleNextSection}
					disabled={
						isLoading ||
						(currentLessonIndex === totalLessons - 1 &&
							currentSectionIndex === totalSections - 1)
					}
					aria-label="Go to next section"
				>
					Next
					<Icon id="nextIcon" title="Next" className="h-4 w-4 ml-1">
						<path d="m9 18 6-6-6-6" />
					</Icon>
				</button>
			</footer>
		</article>
	);
}
