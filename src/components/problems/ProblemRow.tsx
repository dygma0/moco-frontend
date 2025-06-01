import { Link } from "@tanstack/react-router";
import { Badge } from "../ui/Badge";

export interface ProblemRowProps {
  id: string;
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
    <Link
      to="/problems/$id"
      params={{ id }}
      className="contents group"
      aria-label={`View problem ${title}`}
    >
      <tr className="border-b border-[#eaeaea] hover:bg-[#f9fafb] transition-colors cursor-pointer">
        <td className="px-4 py-3">
          <span className="flex items-center">
            <span className="text-sm font-medium text-[#333] group-hover:text-[#c28b3b]">
              {title}
            </span>
            {isPremium && (
              <Badge
                variant="primary"
                className="ml-2"
                aria-label="Premium problem"
              >
                Premium
              </Badge>
            )}
          </span>
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
          <ul
            className="flex flex-wrap gap-1 list-none p-0 m-0"
            aria-label="Problem tags"
          >
            {tags.map((tag) => (
              <li key={tag}>
                <Badge variant="default" aria-label={`Tag: ${tag}`}>
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    </Link>
  );
}
