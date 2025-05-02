import { Icon } from "../ui/Icon";

interface BackNavigationProps {
  href: string;
  text: string;
}

export function BackNavigation({ href, text }: BackNavigationProps) {
  return (
    <div className="mb-6">
      <a className="inline-flex items-center text-sm text-[#666] hover:text-[#c28b3b]" href={href}>
        <Icon id="backArrow" title="Back Arrow" className="h-4 w-4 mr-1">
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </Icon>
        {text}
      </a>
    </div>
  );
}
