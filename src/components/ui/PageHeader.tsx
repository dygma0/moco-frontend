import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  iconBgColor?: string;
  iconColor?: string;
  actions?: ReactNode;
}

export function PageHeader({
  title,
  description,
  icon,
  iconBgColor = "#f8f3e7",
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {icon && (
          <div
            className={`h-10 w-10 rounded-md ${iconBgColor} flex items-center justify-center`}
          >
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-xl font-medium text-[#333]">{title}</h1>
          {description && <p className="text-sm text-[#888]">{description}</p>}
        </div>
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
