import { Icon } from "../ui/Icon";
import { Badge } from "../ui/Badge";

export interface ProblemRowProps {
	id: number;
	title: string;
	difficulty: "Easy" | "Medium" | "Hard";
	tags: string[];
	isPremium?: boolean;
}

export function ProblemRow({
	id,
	title,
	difficulty,
	tags,
	isPremium,
}: ProblemRowProps) {
	const difficultyVariant =
		difficulty === "Easy"
			? "success"
			: difficulty === "Medium"
				? "warning"
				: "danger";

	return (
		<tr className="border-b border-[#eaeaea] hover:bg-[#f9fafb] transition-colors">
			<td className="px-4 py-3">
				<div className="flex items-center">
					<a
						className="text-sm font-medium text-[#333] hover:text-[#c28b3b]"
						href={`/problems/${id}`}
						aria-label={`View problem ${id}: ${title}`}
					>
						{title}
					</a>
					{isPremium && (
						<Badge
							variant="primary"
							className="ml-2"
							aria-label="Premium problem"
						>
							Premium
						</Badge>
					)}
				</div>
			</td>
			<td className="px-4 py-3 text-sm">
				<Badge
					variant={difficultyVariant}
					aria-label={`Difficulty level: ${difficulty}`}
				>
					{difficulty}
				</Badge>
			</td>
			<td className="px-4 py-3">
				<div className="flex flex-wrap gap-1" aria-label="Problem tags">
					{tags.map((tag) => (
						<Badge key={tag} variant="default" ariaLabel={`Tag: ${tag}`}>
							{tag}
						</Badge>
					))}
				</div>
			</td>
		</tr>
	);
}
