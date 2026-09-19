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

/**
 * El conjunto de rutas es cerrado: los 6 Legal Products. Con `dynamicParams = false`,
 * cualquier otro slug cae en la 404 global de Next.js, que sí aplica el
 * layout raíz.
 */
export const dynamicParams = false;

export { generateStaticParams, generateMetadata };
export default Page;
