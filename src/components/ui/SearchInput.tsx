interface SearchInputProps {
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
  width?: string;
}

export function SearchInput({
  placeholder = "Search...",
  className = "",
  onChange,
  value,
  width = "240px",
}: SearchInputProps) {
  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#888]"
        aria-labelledby="searchIcon"
      >
        <title id="searchIcon">Search</title>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        placeholder={placeholder}
        className={`h-9 w-[${width}] rounded-md border border-[#e0e0e0] bg-white pl-9 pr-3 text-sm focus:border-[#c28b3b] focus:outline-none focus:ring-1 focus:ring-[#c28b3b] ${className}`}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
