import type { ReactNode } from "react";
import Seo from "@/components/common/Seo";
import PageHero from "@/components/common/PageHero";
import { Helmet } from "react-helmet-async";

interface LegalPageLayoutProps {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
}

export default function LegalPageLayout({ title, description, path, children }: LegalPageLayoutProps) {
  return (
    <main>
      <Seo title={title} description={description} path={path} />
      <Helmet><meta name="robots" content="index,follow" /></Helmet>
      <PageHero
        title={title}
        subtitle="Última actualización: 28 de septiembre de 2026"
        breadcrumbs={[{ label: title }]}
        badge="Información legal"
      />
      <article className="section-light py-14 md:py-20">
        <div className="container mx-auto max-w-3xl px-4 legal-content">{children}</div>
      </article>
    </main>
  );
}