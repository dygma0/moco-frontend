import { ReactNode } from 'react'
import { ProblemRow, ProblemRowProps } from './ProblemRow'
import { Pagination } from '../ui/Pagination'
import { Icon } from '../ui/Icon'

interface ProblemsTableProps {
  problems: ProblemRowProps[]
  currentPage: number
  totalPages: number
  totalProblems: number
  onPageChange: (page: number) => void
  itemsPerPage?: number
}

export function ProblemsTable({ 
  problems, 
  currentPage, 
  totalPages, 
  totalProblems,
  onPageChange,
  itemsPerPage = 10
}: ProblemsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#eaeaea] bg-[#f9fafb] text-xs text-[#666]">
              <th className="px-4 py-3 text-left font-medium cursor-pointer">
                <div className="flex items-center">
                  Status
                  <span className="ml-1">
                    <Icon id="sortStatusIcon" title="Sort ascending" size={12}>
                      <path d="m5 12 7-7 7 7" />
                      <path d="M12 19V5" />
                    </Icon>
                  </span>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium cursor-pointer">
                <div className="flex items-center">
                  #
                  <span className="ml-1">
                    <Icon id="sortIdIcon" title="Sort ascending" size={12}>
                      <path d="m5 12 7-7 7 7" />
                      <path d="M12 19V5" />
                    </Icon>
                  </span>
                </div>
              </th>
              <th className="px-4 py-3 text-left font-medium cursor-pointer">
                <div className="flex items-center">Title</div>
              </th>
              <th className="px-4 py-3 text-left font-medium cursor-pointer">
                <div className="flex items-center">Difficulty</div>
              </th>
              <th className="px-4 py-3 text-left font-medium cursor-pointer">
                <div className="flex items-center">Acceptance</div>
              </th>
              <th className="px-4 py-3 text-left font-medium">Tags</th>
            </tr>
          </thead>
          <tbody>
            {problems.map(problem => (
              <ProblemRow 
                key={problem.id}
                id={problem.id}
                title={problem.title}
                difficulty={problem.difficulty}
                acceptance={problem.acceptance}
                tags={problem.tags}
                status={problem.status}
                isPremium={problem.isPremium}
              />
            ))}
          </tbody>
        </table>
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalProblems}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}
