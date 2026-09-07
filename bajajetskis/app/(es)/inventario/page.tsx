import { InventoryView } from '@/components/views/InventoryView'
import { metaDePagina } from '../../metadata'

export const metadata = metaDePagina('es', 'inventario')

export default function Inventario() {
  return <InventoryView lang="es" />
}
