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

export { generateStaticParams, generateMetadata };
export default Page;
