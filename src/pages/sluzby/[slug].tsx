import type { GetStaticPaths, GetStaticProps } from "next";
import ServiceDetailPage from "../../app/pages/ServiceDetailPage";
import { SERVICE_SLUGS } from "../../app/seo/site";

export default ServiceDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SERVICE_SLUGS.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};
