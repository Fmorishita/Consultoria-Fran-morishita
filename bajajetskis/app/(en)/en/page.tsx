import { HomeView } from '@/components/views/HomeView'
import { metaDePagina } from '../../metadata'

export const metadata = metaDePagina('en', 'home')

export default function Home() {
  return <HomeView lang="en" />
}
