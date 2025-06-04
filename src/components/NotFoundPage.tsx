import { Link } from "@tanstack/react-router";
import SadOtterImage from "../assets/sad-otter.png";
import { Icon } from "./ui/Icon";

export function NotFoundPage() {
  return (
    <div className="flex-1 p-6 overflow-auto bg-[#f8f8f6]">
      <div className="max-w-[1200px] mx-auto w-full">
        <nav aria-label="Back navigation" className="mb-6 flex justify-start">
          <Link
            to="/problems"
            className="inline-flex items-center text-sm text-[#666] hover:text-[#c28b3b]"
          >
            <Icon
              id="arrowLeftIcon"
              title="Back arrow"
              size={16}
              className="mr-1"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </Icon>
            Back to Home
          </Link>
        </nav>

        <main className="flex flex-col items-center justify-center text-center pt-10 pb-20">
          <div className="max-w-md w-full">
            <img
              src={SadOtterImage}
              alt="Illustration of a sad-looking otter."
              className="w-48 h-48 mx-auto mb-4"
              role="presentation"
            />

            <h1 className="text-3xl md:text-4xl font-bold text-[#666] mb-3">
              Oops! Page Not Found
            </h1>

            <p className="text-lg text-[#999] mb-8">
              The page you were looking for doesn't seem to exist.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
