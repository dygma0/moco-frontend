import { ReactNode } from 'react'
import { Icon } from './Icon'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems?: number
  itemsPerPage?: number
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  totalItems,
  itemsPerPage = 10
}: PaginationProps) {
  // Calculate the range of pages to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max pages to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)
      
      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)
      
      // Adjust if at the beginning or end
      if (currentPage <= 2) {
        end = 3
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 2
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...')
      }
      
      // Add page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push('...')
      }
      
      // Always include last page
      pages.push(totalPages)
    }
    
    return pages
  }
  
  const pageNumbers = getPageNumbers()
  
  return (
    <div className="flex items-center justify-between p-4 border-t border-[#eaeaea]">
      {totalItems && (
        <div className="text-sm text-[#666]">
          Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
        </div>
      )}
      <div className="flex items-center gap-2">
        <button 
          className="h-8 w-8 rounded-md border border-[#e0e0e0] flex items-center justify-center text-[#666] hover:bg-[#f8f8f6] disabled:opacity-50 disabled:pointer-events-none" 
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Icon id="prevPageIcon" title="Previous page">
            <path d="m15 18-6-6 6-6" />
          </Icon>
        </button>
        
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="text-[#666]">...</span>
          ) : (
            <button 
              key={`page-${page}`}
              className={`h-8 w-8 rounded-md flex items-center justify-center ${
                page === currentPage 
                  ? 'bg-[#c28b3b] text-white' 
                  : 'border border-[#e0e0e0] text-[#666] hover:bg-[#f8f8f6]'
              }`} 
              type="button"
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )
        ))}
        
        <button 
          className="h-8 w-8 rounded-md border border-[#e0e0e0] flex items-center justify-center text-[#666] hover:bg-[#f8f8f6] disabled:opacity-50 disabled:pointer-events-none" 
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Icon id="nextPageIcon" title="Next page">
            <path d="m9 18 6-6-6-6" />
          </Icon>
        </button>
      </div>
    </div>
  )
}
