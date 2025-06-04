import { Helmet } from "react-helmet";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  canonicalUrl?: string;
}

export function SEO({
  title = "Quibe - 퀴베 코딩 챌린지",
  description = "Quibe에서 다양한 코딩 챌린지와 문제를 즐기며 프로그래밍 실력을 향상시켜 보세요.",
  keywords = "코딩 챌린지, 프로그래밍, 개발, 알고리즘, 학습",
  ogImage = "/android-chrome-512x512.png",
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
}: SEOProps) {
  const currentUrl =
    typeof window !== "undefined" ? window.location.pathname : "";
  const url = ogUrl || `https://quibe.io${currentUrl}`;
  const canonical = canonicalUrl || url;

  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph 메타 태그 */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter 메타 태그 */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* 기타 필수 메타 태그 */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#ffffff" />

      {/* 표준 링크 */}
      <link rel="canonical" href={canonical} />
    </Helmet>
  );
}
