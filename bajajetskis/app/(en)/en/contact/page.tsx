import { ContactView } from '@/components/views/ContactView'
import { metaDePagina } from '../../../metadata'

export const metadata = metaDePagina('en', 'contacto')

export default function Contact() {
  return <ContactView lang="en" />
}
