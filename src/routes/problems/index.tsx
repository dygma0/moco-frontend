import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useChallenges } from "../../api/hooks/useChallenges";
import { mapChallengeToProblemRow } from "../../api/mappers/challengeMapper";
import type { ProblemRowProps } from "../../components/problems/ProblemRow";
import { ProblemsTable } from "../../components/problems/ProblemsTable";
import { Icon } from "../../components/ui/Icon";
import { PageHeader } from "../../components/ui/PageHeader";

export const Route = createFileRoute("/problems/")({
  component: ProblemsPage,
});

const SkeletonElement = ({ className }: { className?: string }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className || ""}`} />
);

const SkeletonRow = () => (
  <tr className="border-b border-[#eaeaea]">
    <td className="px-4 py-4">
      <SkeletonElement className="h-4 w-3/4" />
    </td>
    <td className="px-4 py-4">
      <SkeletonElement className="h-4 w-1/2" />
    </td>
    <td className="px-4 py-4">
      <div className="flex flex-wrap gap-1">
        <SkeletonElement className="h-4 w-12" />
        <SkeletonElement className="h-4 w-16" />
      </div>
    </td>
  </tr>
);

const ProblemsTableSkeleton = ({ rows = 10 }: { rows?: number }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-[#eaeaea] bg-[#f9fafb] text-xs text-[#666]">
          <th className="px-4 py-3 text-left font-medium">
            <div className="flex items-center">Title</div>
          </th>
          <th className="px-4 py-3 text-left font-medium">
            <div className="flex items-center">Difficulty</div>
          </th>
          <th className="px-4 py-3 text-left font-medium">Tags</th>
        </tr>
      </thead>
      <tbody>
        {/* eslint-disable-next-line react/no-array-index-key */}
        {Array.from({ length: rows }).map((_, index) => (
          <SkeletonRow key={index} />
        ))}
      </tbody>
    </table>
    {/* Skeleton Pagination Placeholder */}
    <div className="flex items-center justify-between px-4 py-3 border-t border-[#eaeaea]">
      <SkeletonElement className="h-4 w-24" />
      <SkeletonElement className="h-4 w-20" />
    </div>
  </div>
);

function ProblemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("Any Difficulty");
  const [tagFilter, setTagFilter] = useState("Any Tag");
  const [currentPage, setCurrentPage] = useState(1);

  const apiPage = currentPage - 1;
  const itemsPerPage = 10;

  const { data, isLoading, error } = useChallenges(
    apiPage,
    itemsPerPage,
    searchQuery,
    difficultyFilter,
    tagFilter,
  );

  const problems: ProblemRowProps[] =
    data?.content.map(mapChallengeToProblemRow) || [];

  const totalPages = data?.totalPages || 1;
  const totalProblems = data?.totalElements || 0;

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "difficulty") {
      setDifficultyFilter(value);
    } else if (filterType === "tag") {
      setTagFilter(value);
    }
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setDifficultyFilter("Any Difficulty");
    setTagFilter("Any Tag");
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRandomProblem = () => {
    alert("Navigate to a random problem");
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <PageHeader
          title="Problems"
          description="Solve algorithm problems to improve your skills"
          icon={
            <Icon
              id="problemsHeaderIcon"
              title="Problems Document"
              stroke="#c28b3b"
              size={20}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
              <path d="M10 9H8" />
            </Icon>
          }
        />

        {/* Table Card */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          {/* Loading State */}
          {isLoading && <ProblemsTableSkeleton rows={itemsPerPage} />}

          {/* Error State */}
          {error && !isLoading && (
            <div className="p-8 text-center">
              <p className="text-red-500">
                Error loading problems. Please try again later.
              </p>
              <p className="text-sm text-gray-500 mt-2">{error.message}</p>
            </div>
          )}

          {/* Table */}
          {!isLoading && !error && (
            <ProblemsTable
              problems={problems}
              currentPage={currentPage}
              totalPages={totalPages}
              totalProblems={totalProblems}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
