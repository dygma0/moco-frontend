import React from "react";

interface ProblemSectionProps {
	id: string;
	title: string;
	children: React.ReactNode;
	className?: string;
}

export function ProblemSection({
	id,
	title,
	children,
	className = "",
}: ProblemSectionProps) {
	return (
		<section className={`mt-6 ${className}`} aria-labelledby={id}>
			<h2 id={id} className="text-lg font-medium text-[#333] mb-3">
				{title}
			</h2>
			{children}
		</section>
	);
}

interface ProblemListSectionProps {
	id: string;
	title: string;
	items: string[];
	className?: string;
}

export function ProblemListSection({
	id,
	title,
	items,
	className = "",
}: ProblemListSectionProps) {
	return (
		<ProblemSection id={id} title={title} className={className}>
			<ul className="list-disc pl-5 space-y-1">
				{items.map((item, index) => (
					<li key={index} className="text-[#666]">
						{item}
					</li>
				))}
			</ul>
		</ProblemSection>
	);
}
