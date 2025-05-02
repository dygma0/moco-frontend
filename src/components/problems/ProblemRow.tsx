import { Icon } from '../ui/Icon'
import { Badge } from '../ui/Badge'

export interface ProblemRowProps {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  acceptance: string
  tags: string[]
  status: 'completed' | 'in-progress' | 'not-started'
  isPremium?: boolean
}

export function ProblemRow({ id, title, difficulty, acceptance, tags, status, isPremium }: ProblemRowProps) {
  const difficultyVariant =
    difficulty === 'Easy' ? 'success' :
      difficulty === 'Medium' ? 'warning' :
        'danger';

  // Status text for screen readers
  const statusText = 
    status === 'completed' ? 'Completed' :
    status === 'in-progress' ? 'In progress' :
    'Not started';

  return (
    <tr className="border-b border-[#eaeaea] hover:bg-[#f9fafb] transition-colors">
      <td className="px-4 py-3 text-center">
        {status === 'completed' && (
          <Icon id={`completedStatus${id}`} title="Completed" className="h-4 w-4 text-green-600">
            <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
            <path d="m9 11 3 3L22 4"/>
          </Icon>
        )}
        {status === 'in-progress' && (
          <Icon id={`inProgressStatus${id}`} title="In progress" className="h-4 w-4 text-amber-600">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </Icon>
        )}
        {status === 'not-started' && (
          <Icon id={`notStartedStatus${id}`} title="Not started" className="h-4 w-4 text-gray-300">
            <circle cx="12" cy="12" r="10"/>
          </Icon>
        )}
        <span className="sr-only">{statusText}</span>
      </td>
      <td className="px-4 py-3 text-sm font-medium text-[#333]">{id}</td>
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
              role="status"
              ariaLabel="Premium problem"
            >
              Premium
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm">
        <Badge 
          variant={difficultyVariant}
          role="status"
          ariaLabel={`Difficulty level: ${difficulty}`}
        >
          {difficulty}
        </Badge>
      </td>
      <td className="px-4 py-3 text-sm text-[#666]" aria-label="Acceptance rate">{acceptance}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1" aria-label="Problem tags">
          {tags.map(tag => (
            <Badge 
              key={tag} 
              variant="default"
              ariaLabel={`Tag: ${tag}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </td>
    </tr>
  );
}
