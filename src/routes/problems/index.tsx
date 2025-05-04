import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Icon } from "../../components/ui/Icon";
import { SearchInput } from "../../components/ui/SearchInput";
import { Button } from "../../components/ui/Button";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProblemsFilters } from "../../components/problems/ProblemsFilters";
import { ProblemsTable } from "../../components/problems/ProblemsTable";
import type { ProblemRowProps } from "../../components/problems/ProblemRow";

export const Route = createFileRoute("/problems/")({
	component: ProblemsPage,
});

function ProblemsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [difficultyFilter, setDifficultyFilter] = useState("Any Difficulty");
	const [tagFilter, setTagFilter] = useState("Any Tag");
	const [currentPage, setCurrentPage] = useState(1);

	const problems: ProblemRowProps[] = [
		{
			id: 1,
			title: "Two Sum",
			difficulty: "Easy",
			tags: ["Array", "Hash Table"],
		},
		{
			id: 2,
			title: "Add Two Numbers",
			difficulty: "Medium",
			tags: ["Linked List", "Math", "Recursion"],
		},
		{
			id: 3,
			title: "Longest Substring Without Repeating Characters",
			difficulty: "Medium",
			tags: ["Hash Table", "String", "Sliding Window"],
		},
		{
			id: 4,
			title: "Median of Two Sorted Arrays",
			difficulty: "Hard",
			tags: ["Array", "Binary Search", "Divide and Conquer"],
		},
		{
			id: 5,
			title: "Longest Palindromic Substring",
			difficulty: "Medium",
			tags: ["String", "Dynamic Programming"],
		},
		{
			id: 6,
			title: "Zigzag Conversion",
			difficulty: "Medium",
			tags: ["String"],
		},
		{
			id: 7,
			title: "Reverse Integer",
			difficulty: "Medium",
			tags: ["Math"],
		},
		{
			id: 8,
			title: "String to Integer (atoi)",
			difficulty: "Medium",
			tags: ["String", "Math"],
		},
		{
			id: 9,
			title: "Palindrome Number",
			difficulty: "Easy",
			tags: ["Math"],
		},
		{
			id: 10,
			title: "Regular Expression Matching",
			difficulty: "Hard",
			tags: ["String", "Dynamic Programming", "Recursion"],
			isPremium: true,
		},
	];

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	};

	const handleFilterChange = (filterType: string, value: string) => {
		if (filterType === "difficulty") {
			setDifficultyFilter(value);
		} else if (filterType === "tag") {
			setTagFilter(value);
		}
		setCurrentPage(1);
	};

	const handleResetFilters = () => {
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
