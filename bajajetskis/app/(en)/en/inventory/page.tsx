import { InventoryView } from '@/components/views/InventoryView'
import { metaDePagina } from '../../../metadata'

export const metadata = metaDePagina('en', 'inventario')

export default function Inventory() {
  return <InventoryView lang="en" />
}
