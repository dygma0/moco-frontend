import {FilterButton} from '../ui/FilterButton'
import {Button} from '../ui/Button'
import {Icon} from '../ui/Icon'

interface ProblemsFiltersProps {
    onFilterChange?: (filterType: string, value: string) => void
    onReset?: () => void
    statusFilter?: string
    difficultyFilter?: string
    tagFilter?: string
}

export function ProblemsFilters({
                                    onFilterChange,
                                    onReset,
                                    statusFilter = 'Any Status',
                                    difficultyFilter = 'Any Difficulty',
                                    tagFilter = 'Any Tag'
                                }: ProblemsFiltersProps) {
    return (
        <div className="border-b border-[#eaeaea]">
            <div className="p-4 flex flex-wrap gap-3">
                <FilterButton
                    label={statusFilter}
                    icon={
                        <Icon id="filterIcon" title="Filter">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                        </Icon>
                    }
                    onClick={() => onFilterChange?.('status', statusFilter)}
                />

                <FilterButton
                    label={difficultyFilter}
                    onClick={() => onFilterChange?.('difficulty', difficultyFilter)}
                />

                <FilterButton
                    label={tagFilter}
                    onClick={() => onFilterChange?.('tag', tagFilter)}
                />

                <div className="ml-auto">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onReset}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    )
}
