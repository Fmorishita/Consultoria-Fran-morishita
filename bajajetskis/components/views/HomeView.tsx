import { PageShell } from '../PageShell'
import { Hero } from '../Hero'
import { TrustBar } from '../TrustBar'
import { FeaturedUnits } from '../FeaturedUnits'
import { Process } from '../Process'
import { Comparison } from '../Comparison'
import { Testimonials } from '../Testimonials'
import { TradeIn } from '../TradeIn'
import { Faq } from '../Faq'
import { FinalCta } from '../FinalCta'
import { FaqJsonLd } from '../JsonLd'
import type { Lang } from '@/content/copy'

export function HomeView({ lang }: { lang: Lang }) {
  return (
    <PageShell lang={lang} pagina="home">
      <Hero lang={lang} />
      <TrustBar lang={lang} />
      <FeaturedUnits lang={lang} />
      <Process lang={lang} />
      <Comparison lang={lang} />
      <Testimonials lang={lang} />
      <TradeIn lang={lang} />
      <Faq lang={lang} />
      <FinalCta lang={lang} />
      <FaqJsonLd lang={lang} />
    </PageShell>
  )
}
