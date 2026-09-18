import { collectionDetail } from '@/lib/collection';
import { legalProducts } from '@/content/site';

const { generateStaticParams, generateMetadata, Page } = collectionDetail({
  basePath: '/legal-products/',
  indexTitle: 'Legal Products',
  indexSource: 'legal-products',
  detailPrefix: 'legal-products',
  crumb: 'Legal Products',
  items: legalProducts,
});

export { generateStaticParams, generateMetadata };
export default Page;
