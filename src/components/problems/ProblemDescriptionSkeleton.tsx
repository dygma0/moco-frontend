export function ProblemDescriptionSkeleton() {
	return (
		<section className="lg:w-3/5 h-[calc(100vh-180px)] border-r border-[#eaeaea] animate-pulse">
			<div className="h-full">
				{/* Header Skeleton */}
				<header className="p-6 border-b border-[#eaeaea]">
					<div className="mb-4">
						<div className="flex items-center gap-2">
							{/* Title Skeleton */}
							<div className="h-6 bg-gray-200 rounded w-3/5" />
							{/* Difficulty Badge Skeleton */}
							<div className="h-6 w-16 bg-gray-200 rounded-full" />
						</div>
					</div>

					{/* Tabs Skeleton */}
					<nav aria-label="Problem tabs skeleton">
						<div className="rounded-md bg-transparent w-full justify-start h-auto p-0 flex items-center">
							{/* Description Tab Skeleton */}
							<div className="h-9 w-32 bg-gray-200 rounded-md mr-2" />
							<div className="ml-auto">
								{/* Hints Button Skeleton */}
								<div className="h-9 w-28 bg-gray-200 rounded-md" />
							</div>
						</div>
					</nav>
				</header>

				{/* Main Content Skeleton */}
				<main className="p-6 max-h-[calc(100vh-300px)] overflow-hidden">
					<div className="space-y-6">
						{/* Description Paragraphs Skeleton */}
						<div className="space-y-3">
							<div className="h-4 bg-gray-200 rounded w-full" />
							<div className="h-4 bg-gray-200 rounded w-full" />
							<div className="h-4 bg-gray-200 rounded w-4/5" />
							<div className="h-4 bg-gray-200 rounded w-3/5" />
						</div>

						{/* Examples Section Skeleton */}
						<div className="space-y-4">
							<div className="h-5 w-24 bg-gray-200 rounded" />
							<div className="p-4 border border-gray-200 rounded space-y-3">
								<div className="h-4 bg-gray-200 rounded w-1/4" />
								<div className="h-4 bg-gray-200 rounded w-1/3" />
							</div>
							<div className="p-4 border border-gray-200 rounded space-y-3">
								<div className="h-4 bg-gray-200 rounded w-1/4" />
								<div className="h-4 bg-gray-200 rounded w-1/3" />
							</div>
						</div>

						{/* Constraints Section Skeleton */}
						<div className="space-y-3">
							<div className="h-5 w-32 bg-gray-200 rounded" />
							<div className="h-4 bg-gray-200 rounded w-full" />
							<div className="h-4 bg-gray-200 rounded w-5/6" />
							<div className="h-4 bg-gray-200 rounded w-full" />
						</div>
					</div>
				</main>
			</div>
		</section>
	);
}
