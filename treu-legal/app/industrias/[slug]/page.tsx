import { collectionDetail } from '@/lib/collection';
import { industries } from '@/content/site';

const { generateStaticParams, generateMetadata, Page } = collectionDetail({
  basePath: '/industrias/',
  indexTitle: 'Industrias',
  indexSource: 'industrias',
  detailPrefix: 'industrias',
  crumb: 'Industrias',
  items: industries,
});

/**
 * El conjunto de rutas es cerrado: las 4 industrias. Con `dynamicParams = false`,
 * cualquier otro slug cae en la 404 global de Next.js, que sí aplica el
 * layout raíz.
 */
export const dynamicParams = false;

export { generateStaticParams, generateMetadata };
export default Page;
