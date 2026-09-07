import { WorkshopView } from '@/components/views/WorkshopView'
import { metaDePagina } from '../../../metadata'

export const metadata = metaDePagina('en', 'taller')

export default function Workshop() {
  return <WorkshopView lang="en" />
}
