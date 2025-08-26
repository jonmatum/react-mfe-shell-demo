import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  canonical?: string;
}

const defaultProps: Required<Omit<SEOProps, 'publishedTime' | 'modifiedTime' | 'section' | 'tags' | 'noIndex' | 'canonical'>> = {
  title: 'Maturity Assessment Platform - Comprehensive Organizational Evaluation Tool',
  description: 'Evaluate your organization\'s maturity in Platform Engineering and Software Development with our comprehensive assessment tool. Built with React MFE Shell, featuring interactive scoring, real-time analytics, and detailed progress tracking.',
  keywords: [
    'maturity assessment',
    'organizational maturity',
    'platform engineering',
    'software development',
    'micro frontend',
    'react',
    'assessment tool',
    'evaluation platform',
    'development practices',
    'engineering maturity',
    'code quality',
    'ci/cd',
    'devops',
    'agile',
    'digital transformation'
  ],
  image: 'https://jonmatum.github.io/react-mfe-shell-demo/screenshot-wide.png',
  url: 'https://jonmatum.github.io/react-mfe-shell-demo/',
  type: 'website',
  author: 'React MFE Shell Demo'
};

export function SEO({
  title = defaultProps.title,
  description = defaultProps.description,
  keywords = defaultProps.keywords,
  image = defaultProps.image,
  url = defaultProps.url,
  type = defaultProps.type,
  author = defaultProps.author,
  publishedTime,
  modifiedTime,
  section,
  tags,
  noIndex = false,
  canonical
}: SEOProps = {}) {
  const fullTitle = title === defaultProps.title ? title : `${title} | Maturity Assessment Platform`;
  const keywordsString = keywords.join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      <meta name="author" content={author} />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Maturity Assessment Platform" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific Open Graph tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@reactmfeshell" />
      <meta name="twitter:site" content="@reactmfeshell" />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="React MFE Shell" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="Maturity Assessment Platform" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Content Classification */}
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="coverage" content="Worldwide" />
      
      {/* Technical Meta Tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Maturity Assessment Platform",
          "description": description,
          "url": url,
          "image": image,
          "author": {
            "@type": "Organization",
            "name": author
          },
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Platform Engineering Assessment",
            "Software Development Maturity Evaluation",
            "Interactive Scoring System",
            "Real-time Analytics",
            "Progress Tracking",
            "Data Export/Import",
            "Offline Functionality",
            "Mobile Responsive Design"
          ],
          "screenshot": image,
          "softwareVersion": "3.1.0",
          "datePublished": "2024-08-26",
          "dateModified": new Date().toISOString().split('T')[0],
          "inLanguage": "en-US",
          "isAccessibleForFree": true,
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "softwareRequirements": "Modern web browser"
        })}
      </script>
    </Helmet>
  );
}
