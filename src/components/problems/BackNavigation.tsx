import { Icon } from "../ui/Icon";

interface BackNavigationProps {
  href: string;
  text: string;
}

export function BackNavigation({ href, text }: BackNavigationProps) {
  return (
    <nav className="mb-6" aria-label="Back navigation">
      <a
        className="inline-flex items-center text-sm text-[#666] hover:text-[#c28b3b]"
        href={href}
        aria-label={`Navigate back to ${text}`}
      >
        <Icon id="backArrow" title="Back Arrow" className="h-4 w-4 mr-1">
          <path d="m12 19-7-7 7-7"></path>
          <path d="M19 12H5"></path>
        </Icon>
        <span>{text}</span>
      </a>
    </nav>
  );
}
