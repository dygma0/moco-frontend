import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Icon } from "../../components/ui/Icon";
import { SearchInput } from "../../components/ui/SearchInput";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProblemsFilters } from "../../components/problems/ProblemsFilters";
import { ProblemsTable } from "../../components/problems/ProblemsTable";
import { ProblemRowProps } from "../../components/problems/ProblemRow";

export const Route = createFileRoute("/problems/")({
	component: ProblemsPage,
});

function ProblemsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [statusFilter, setStatusFilter] = useState("Any Status");
	const [difficultyFilter, setDifficultyFilter] = useState("Any Difficulty");
	const [tagFilter, setTagFilter] = useState("Any Tag");
	const [currentPage, setCurrentPage] = useState(1);

	const problems: ProblemRowProps[] = [
		{
			id: 1,
			title: "Two Sum",
			difficulty: "Easy",
			acceptance: "48.2%",
			tags: ["Array", "Hash Table"],
			status: "completed",
		},
		{
			id: 2,
			title: "Add Two Numbers",
			difficulty: "Medium",
			acceptance: "39.1%",
			tags: ["Linked List", "Math", "Recursion"],
			status: "completed",
		},
		{
			id: 3,
			title: "Longest Substring Without Repeating Characters",
			difficulty: "Medium",
			acceptance: "33.8%",
			tags: ["Hash Table", "String", "Sliding Window"],
			status: "in-progress",
		},
		{
			id: 4,
			title: "Median of Two Sorted Arrays",
			difficulty: "Hard",
			acceptance: "35.4%",
			tags: ["Array", "Binary Search", "Divide and Conquer"],
			status: "not-started",
		},
		{
			id: 5,
			title: "Longest Palindromic Substring",
			difficulty: "Medium",
			acceptance: "32.4%",
			tags: ["String", "Dynamic Programming"],
			status: "not-started",
		},
		{
			id: 6,
			title: "Zigzag Conversion",
			difficulty: "Medium",
			acceptance: "42.8%",
			tags: ["String"],
			status: "not-started",
		},
		{
			id: 7,
			title: "Reverse Integer",
			difficulty: "Medium",
			acceptance: "26.9%",
			tags: ["Math"],
			status: "not-started",
		},
		{
			id: 8,
			title: "String to Integer (atoi)",
			difficulty: "Medium",
			acceptance: "16.6%",
			tags: ["String", "Math"],
			status: "not-started",
		},
		{
			id: 9,
			title: "Palindrome Number",
			difficulty: "Easy",
			acceptance: "53.3%",
			tags: ["Math"],
			status: "completed",
		},
		{
			id: 10,
			title: "Regular Expression Matching",
			difficulty: "Hard",
			acceptance: "28.1%",
			tags: ["String", "Dynamic Programming", "Recursion"],
			status: "not-started",
			isPremium: true,
		},
	];

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	};

	const handleFilterChange = (filterType: string, value: string) => {
		if (filterType === "status") {
			setStatusFilter(value);
		} else if (filterType === "difficulty") {
			setDifficultyFilter(value);
		} else if (filterType === "tag") {
			setTagFilter(value);
		}
		setCurrentPage(1);
	};

	const handleResetFilters = () => {
		setStatusFilter("Any Status");
		setDifficultyFilter("Any Difficulty");
		setTagFilter("Any Tag");
		setSearchQuery("");
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleRandomProblem = () => {
		alert("Navigate to a random problem");
	};

	return (
		<div className="flex-1 p-6 overflow-auto">
			<div className="max-w-[1200px] mx-auto">
				{/* Header */}
				<PageHeader
					title="Problems"
					description="Solve algorithm problems to improve your skills"
					icon={
						<Icon
							id="problemsHeaderIcon"
							title="Problems Document"
							stroke="#c28b3b"
							size={20}
						>
							<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
							<path d="M14 2v6h6" />
							<path d="M16 13H8" />
							<path d="M16 17H8" />
							<path d="M10 9H8" />
						</Icon>
					}
					actions={
						<>
							<SearchInput
								placeholder="Search problems..."
								value={searchQuery}
								onChange={handleSearchChange}
							/>
							<Button variant="primary" size="sm" onClick={handleRandomProblem}>
								Random Problem
							</Button>
						</>
					}
				/>

				{/* Table Card */}
				<div className="bg-white rounded-lg shadow-sm mb-6">
					{/* Filters */}
					<ProblemsFilters
						statusFilter={statusFilter}
						difficultyFilter={difficultyFilter}
						tagFilter={tagFilter}
						onFilterChange={handleFilterChange}
						onReset={handleResetFilters}
					/>

					{/* Table */}
					<ProblemsTable
						problems={problems}
						currentPage={currentPage}
						totalPages={235}
						totalProblems={2345}
						onPageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
}
