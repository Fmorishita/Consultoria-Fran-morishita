import { WorkshopView } from '@/components/views/WorkshopView'
import { metaDePagina } from '../../metadata'

export const metadata = metaDePagina('es', 'taller')

export default function Taller() {
  return <WorkshopView lang="es" />
}
