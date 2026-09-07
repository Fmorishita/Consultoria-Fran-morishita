import { ContactView } from '@/components/views/ContactView'
import { metaDePagina } from '../../metadata'

export const metadata = metaDePagina('es', 'contacto')

export default function Contacto() {
  return <ContactView lang="es" />
}
