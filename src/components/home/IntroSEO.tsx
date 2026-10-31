import { createAdminClient } from '@/lib/supabase/admin'

export default async function IntroSEO() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('homepage_content')
    .select('title, content')
    .eq('section_key', 'intro')
    .maybeSingle()

  const title = data?.title || 'Profesyonel Güzellik Merkezi'
  const content =
    data?.content ||
    'Lazer epilasyon, cilt bakımı, bölgesel incelme ve nail art hizmetleri sunuyoruz. Sertifikalı uzman kadromuz, modern cihazlarımız ve hijyenik ortamımızla bakımınız emin ellerde.'

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-2xl md:text-3xl font-heading font-medium text-lavender-900 mb-4">{title}</h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed">{content}</p>
      </div>
    </section>
  )
}
