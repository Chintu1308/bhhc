import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords }) {
  const defaultTitle = "BHHC | Full-Stack Developer & IoT Engineer";
  const defaultDesc = "Portfolio of Bongu Hari Hara Charan. Crafting scalable architectures, DevSecOps pipelines, and interactive 3D web experiences.";
  const defaultKeywords = "BHHC, Full-Stack Developer, IoT, DevSecOps, React, React Three Fiber, Visakhapatnam";

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
    </Helmet>
  );
}
