import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/problems/')({
  component: ProblemsPage,
})

function ProblemsPage() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-md bg-[#f8f3e7] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c28b3b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-labelledby="problemsHeaderIcon">
                <title id="problemsHeaderIcon">Problems Document</title>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-medium text-[#333]">Problems</h1>
              <p className="text-sm text-[#888]">Solve algorithm problems to improve your skills</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888]" aria-labelledby="searchIcon">
                <title id="searchIcon">Search</title>
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input 
                placeholder="Search problems..." 
                className="h-9 w-[240px] rounded-md border border-[#e0e0e0] bg-white pl-9 pr-3 text-sm focus:border-[#c28b3b] focus:outline-none focus:ring-1 focus:ring-[#c28b3b]" 
                type="text"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 rounded-md text-xs h-9 px-3 bg-[#c28b3b] hover:bg-[#a67a2e] text-white" type="button">
              Random Problem
            </button>
          </div>
        </div>
        
        {/* Table Card */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          {/* Filters */}
          <div className="border-b border-[#eaeaea]">
            <div className="p-4 flex flex-wrap gap-3">
              <div className="relative">
                <button className="justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground rounded-md h-8 px-3 border-[#e0e0e0] text-xs font-medium flex items-center gap-1" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 mr-1" aria-labelledby="filterIcon">
                    <title id="filterIcon">Filter</title>
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  Any Status
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 ml-1" aria-labelledby="chevronDownIcon1">
                    <title id="chevronDownIcon1">Dropdown</title>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              
              <div className="relative">
                <button className="justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground rounded-md h-8 px-3 border-[#e0e0e0] text-xs font-medium flex items-center gap-1" type="button">
                  Any Difficulty
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 ml-1" aria-labelledby="chevronDownIcon2">
                    <title id="chevronDownIcon2">Dropdown</title>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              
              <div className="relative">
                <button className="justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground rounded-md h-8 px-3 border-[#e0e0e0] text-xs font-medium flex items-center gap-1" type="button">
                  Any Tag
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 ml-1" aria-labelledby="chevronDownIcon3">
                    <title id="chevronDownIcon3">Dropdown</title>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              </div>
              
              <div className="ml-auto">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground rounded-md h-8 px-3 border-[#e0e0e0] text-xs font-medium" type="button">
                  Reset
                </button>
              </div>
            </div>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#eaeaea] bg-[#f9fafb] text-xs text-[#666]">
                  <th className="px-4 py-3 text-left font-medium cursor-pointer">
                    <div className="flex items-center">
                      Status
                      <span className="ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-labelledby="sortUpIcon1">
                          <title id="sortUpIcon1">Sort ascending</title>
                          <path d="m5 12 7-7 7 7" />
                          <path d="M12 19V5" />
                        </svg>
                      </span>
                    </div>
                  </th>
                  <th className="px-4 py-3 text-left font-medium cursor-pointer">
                    <div className="flex items-center">
                      #
                      <span className="ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-labelledby="sortUpIcon2">
                          <title id="sortUpIcon2">Sort ascending</title>
                          <path d="m5 12 7-7 7 7" />
                          <path d="M12 19V5" />
                        </svg>
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
                {/* Problem Rows */}
                <ProblemRow 
                  id={1}
                  title="Two Sum"
                  difficulty="Easy"
                  acceptance="48.2%"
                  tags={["Array", "Hash Table"]}
                  status="completed"
                />
                <ProblemRow 
                  id={2}
                  title="Add Two Numbers"
                  difficulty="Medium"
                  acceptance="39.1%"
                  tags={["Linked List", "Math", "Recursion"]}
                  status="completed"
                />
                <ProblemRow 
                  id={3}
                  title="Longest Substring Without Repeating Characters"
                  difficulty="Medium"
                  acceptance="33.8%"
                  tags={["Hash Table", "String", "Sliding Window"]}
                  status="in-progress"
                />
                <ProblemRow 
                  id={4}
                  title="Median of Two Sorted Arrays"
                  difficulty="Hard"
                  acceptance="35.4%"
                  tags={["Array", "Binary Search", "Divide and Conquer"]}
                  status="not-started"
                />
                <ProblemRow 
                  id={5}
                  title="Longest Palindromic Substring"
                  difficulty="Medium"
                  acceptance="32.4%"
                  tags={["String", "Dynamic Programming"]}
                  status="not-started"
                />
                <ProblemRow 
                  id={6}
                  title="Zigzag Conversion"
                  difficulty="Medium"
                  acceptance="42.8%"
                  tags={["String"]}
                  status="not-started"
                />
                <ProblemRow 
                  id={7}
                  title="Reverse Integer"
                  difficulty="Medium"
                  acceptance="26.9%"
                  tags={["Math"]}
                  status="not-started"
                />
                <ProblemRow 
                  id={8}
                  title="String to Integer (atoi)"
                  difficulty="Medium"
                  acceptance="16.6%"
                  tags={["String", "Math"]}
                  status="not-started"
                />
                <ProblemRow 
                  id={9}
                  title="Palindrome Number"
                  difficulty="Easy"
                  acceptance="53.3%"
                  tags={["Math"]}
                  status="completed"
                />
                <ProblemRow 
                  id={10}
                  title="Regular Expression Matching"
                  difficulty="Hard"
                  acceptance="28.1%"
                  tags={["String", "Dynamic Programming", "Recursion"]}
                  status="not-started"
                  isPremium={true}
                />
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-[#eaeaea]">
              <div className="text-sm text-[#666]">
                Showing 1-10 of 2,345 problems
              </div>
              <div className="flex items-center gap-2">
                <button className="h-8 w-8 rounded-md border border-[#e0e0e0] flex items-center justify-center text-[#666] hover:bg-[#f8f8f6]" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-labelledby="prevPageIcon">
                    <title id="prevPageIcon">Previous page</title>
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button className="h-8 w-8 rounded-md bg-[#c28b3b] flex items-center justify-center text-white" type="button">
                  1
                </button>
                <button className="h-8 w-8 rounded-md border border-[#e0e0e0] flex items-center justify-center text-[#666] hover:bg-[#f8f8f6]" type="button">
                  2
                </button>
                <button className="h-8 w-8 rounded-md border border-[#e0e0e0] flex items-center justify-center text-[#666] hover:bg-[#f8f8f6]" type="button">
                  3
                </button>
                <span className="text-[#666]">...</span>
                <button className="h-8 w-8 rounded-md border border-[#e0e0e0] flex items-center justify-center text-[#666] hover:bg-[#f8f8f6]" type="button">
                  235
                </button>
                <button className="h-8 w-8 rounded-md border border-[#e0e0e0] flex items-center justify-center text-[#666] hover:bg-[#f8f8f6]" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-labelledby="nextPageIcon">
                    <title id="nextPageIcon">Next page</title>
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for problem rows
interface ProblemRowProps {
  id: number
  title: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  acceptance: string
  tags: string[]
  status: 'completed' | 'in-progress' | 'not-started'
  isPremium?: boolean
}

function ProblemRow({ id, title, difficulty, acceptance, tags, status, isPremium }: ProblemRowProps) {
  const difficultyColor = 
    difficulty === 'Easy' ? 'text-green-600' :
    difficulty === 'Medium' ? 'text-amber-600' : 
    'text-red-600';
  
  return (
    <tr className="border-b border-[#eaeaea] hover:bg-[#f9fafb] transition-colors">
      <td className="px-4 py-3 text-center">
        {status === 'completed' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600" aria-labelledby={`completedStatus${id}`}>
            <title id={`completedStatus${id}`}>Completed</title>
            <path d="M21.801 10A10 10 0 1 1 17 3.335" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        )}
        {status === 'in-progress' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-amber-600" aria-labelledby={`inProgressStatus${id}`}>
            <title id={`inProgressStatus${id}`}>In progress</title>
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        )}
        {status === 'not-started' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-gray-300" aria-labelledby={`notStartedStatus${id}`}>
            <title id={`notStartedStatus${id}`}>Not started</title>
            <circle cx="12" cy="12" r="10" />
          </svg>
        )}
      </td>
      <td className="px-4 py-3 text-sm font-medium text-[#333]">{id}</td>
      <td className="px-4 py-3">
        <div className="flex items-center">
          <a className="text-sm font-medium text-[#333] hover:text-[#c28b3b]" href={`/problems/${id}`}>
            {title}
          </a>
          {isPremium && (
            <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#f8f3e7] text-[#c28b3b]">
              Premium
            </span>
          )}
        </div>
      </td>
      <td className={`px-4 py-3 text-sm ${difficultyColor}`}>{difficulty}</td>
      <td className="px-4 py-3 text-sm text-[#666]">{acceptance}</td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-[#f8f8f6] text-[#666]">
              {tag}
            </span>
          ))}
        </div>
      </td>
    </tr>
  );
}
