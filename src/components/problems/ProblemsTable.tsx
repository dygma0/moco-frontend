import { ProblemRow, type ProblemRowProps } from "./ProblemRow";
import { Pagination } from "../ui/Pagination";

interface ProblemsTableProps {
	problems: ProblemRowProps[];
	currentPage: number;
	totalPages: number;
	totalProblems: number;
	onPageChange: (page: number) => void;
	itemsPerPage?: number;
}

export function ProblemsTable({
	problems,
	currentPage,
	totalPages,
	totalProblems,
	onPageChange,
	itemsPerPage = 10,
}: ProblemsTableProps) {
	return (
		<section
			className="bg-white rounded-lg shadow-sm mb-6"
			aria-labelledby="problems-table-title"
		>
			<h2 id="problems-table-title" className="sr-only">
				Problems List
			</h2>
			<div className="overflow-x-auto">
				<table className="w-full" aria-label="Problems table">
					<caption className="sr-only">
						List of programming problems with their difficulty and tags
					</caption>
					<thead>
						<tr className="border-b border-[#eaeaea] bg-[#f9fafb] text-xs text-[#666]">
							<th
								scope="col"
								className="px-4 py-3 text-left font-medium cursor-pointer"
							>
								<div className="flex items-center">Title</div>
							</th>
							<th
								scope="col"
								className="px-4 py-3 text-left font-medium cursor-pointer"
							>
								<div className="flex items-center">Difficulty</div>
							</th>
							<th scope="col" className="px-4 py-3 text-left font-medium">
								Tags
							</th>
						</tr>
					</thead>
					<tbody>
						{problems.map((problem) => (
							<ProblemRow
								key={problem.id}
								id={problem.id}
								title={problem.title}
								difficulty={problem.difficulty}
								tags={problem.tags}
								isPremium={problem.isPremium}
							/>
						))}
					</tbody>
				</table>

				<nav aria-label="Problems pagination">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={totalProblems}
						itemsPerPage={itemsPerPage}
						onPageChange={onPageChange}
					/>
				</nav>
			</div>
		</section>
	);
}
