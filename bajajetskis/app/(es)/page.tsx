import { HomeView } from '@/components/views/HomeView'
import { metaDePagina } from '../metadata'

export const metadata = metaDePagina('es', 'home')

export default function Inicio() {
  return <HomeView lang="es" />
}
