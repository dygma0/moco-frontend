import { Button } from "../ui/Button";
import { FilterButton } from "../ui/FilterButton";

interface ProblemsFiltersProps {
  onFilterChange?: (filterType: string, value: string) => void;
  onReset?: () => void;
  difficultyFilter?: string;
  tagFilter?: string;
}

export function ProblemsFilters({
  onFilterChange,
  onReset,
  difficultyFilter = "Any Difficulty",
  tagFilter = "Any Tag",
}: ProblemsFiltersProps) {
  return (
    <div className="border-b border-[#eaeaea]">
      <div className="p-4 flex flex-wrap gap-3">
        <FilterButton
          label={difficultyFilter}
          onClick={() => onFilterChange?.("difficulty", difficultyFilter)}
        />

        <FilterButton
          label={tagFilter}
          onClick={() => onFilterChange?.("tag", tagFilter)}
        />

        <div className="ml-auto">
          <Button variant="outline" size="sm" onClick={onReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
