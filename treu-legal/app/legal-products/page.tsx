import { collectionIndex } from '@/lib/collection';
import { legalProducts } from '@/content/site';

const { metadata, Page } = collectionIndex({
  basePath: '/legal-products/',
  indexTitle: 'Legal Products',
  indexSource: 'legal-products',
  detailPrefix: 'legal-products',
  crumb: 'Legal Products',
  items: legalProducts,
});

export const generateMetadata = metadata;
export default Page;
