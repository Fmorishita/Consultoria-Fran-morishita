import { collectionIndex } from '@/lib/collection';
import { industries } from '@/content/site';

const { metadata, Page } = collectionIndex({
  basePath: '/industrias/',
  indexTitle: 'Industrias',
  indexSource: 'industrias',
  detailPrefix: 'industrias',
  crumb: 'Industrias',
  items: industries,
  columns: 2,
});

export const generateMetadata = metadata;
export default Page;
