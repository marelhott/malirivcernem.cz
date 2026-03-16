import type { GetStaticPaths, GetStaticProps } from "next";
import PortfolioDetailPage from "../../app/pages/PortfolioDetailPage";
import {
  PORTFOLIO_PROJECT_SLUGS,
  getPortfolioProjectBySlug,
  type PortfolioProject,
} from "../../app/data/portfolioProjects";

export default function PortfolioDetailNextPage({
  project,
}: {
  project: PortfolioProject;
}) {
  return <PortfolioDetailPage project={project} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: PORTFOLIO_PROJECT_SLUGS.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  const resolvedSlug = Array.isArray(slug) ? slug[0] : slug;
  const project = resolvedSlug ? getPortfolioProjectBySlug(resolvedSlug) : null;

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      project,
    },
  };
};
