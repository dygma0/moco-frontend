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
  
  return (
    <tr className="border-b border-[#eaeaea] hover:bg-[#f9fafb] transition-colors">
      <td className="px-4 py-3 text-center">
        {status === 'completed' && (
          <Icon id={`completedStatus${id}`} title="Completed" className="h-4 w-4 text-green-600">
            <path d="M21.801 10A10 10 0 1 1 17 3.335" />
            <path d="m9 11 3 3L22 4" />
          </Icon>
        )}
        {status === 'in-progress' && (
          <Icon id={`inProgressStatus${id}`} title="In progress" className="h-4 w-4 text-amber-600">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </Icon>
        )}
        {status === 'not-started' && (
          <Icon id={`notStartedStatus${id}`} title="Not started" className="h-4 w-4 text-gray-300">
            <circle cx="12" cy="12" r="10" />
          </Icon>
        )}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-[#333]">{id}</td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <a className="text-sm font-medium text-[#333] hover:text-[#c28b3b]" href={`/problems/${id}`}>
            {title}
          </a>
          {isPremium && (
            <Badge variant="primary" className="ml-2">
              Premium
            </Badge>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm">
        <Badge variant={difficultyVariant}>
          {difficulty}
        </Badge>
      </td>
      <td className="px-4 py-3 text-sm text-[#666]">{acceptance}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>
      </td>
    </tr>
  );
}
