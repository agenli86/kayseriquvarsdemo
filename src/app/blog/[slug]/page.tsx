import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import SiteLayout from '@/components/layout/SiteLayout'
import { getImageUrl, SITE_URL } from '@/lib/constants'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!data) return { title: 'Yazı bulunamadı' }

  return {
    title: data.title,
    description: data.meta_description || data.excerpt || '',
    alternates: { canonical: `${SITE_URL}/blog/${data.slug}` },
    openGraph: {
      type: 'article',
      title: data.title,
      description: data.meta_description || data.excerpt || '',
      images: data.image_url ? [getImageUrl(data.image_url)] : [],
      publishedTime: data.published_at || data.created_at,
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = params
  const supabase = createAdminClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!post) notFound()

  const heroImg = post.image_url ? getImageUrl(post.image_url) : 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=80'
  const date = new Date(post.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[420px] md:min-h-[520px] overflow-hidden bg-lavender-900">
        <Image
          src={heroImg}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lavender-900 via-lavender-900/70 to-lavender-900/50" />
        <div className="relative h-full flex flex-col justify-end container mx-auto px-4 pb-12 md:pb-16">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mb-6 w-fit">
            <ArrowLeft size={16} />
            <span>Blog&apos;a Dön</span>
          </Link>
          <h1 className="text-3xl md:text-5xl font-heading text-white max-w-4xl leading-[1.1] mb-5">
            {post.title}
          </h1>
          <div className="flex items-center gap-5 text-sm text-white/80">
            <span className="inline-flex items-center gap-2"><Calendar size={14} />{date}</span>
            {post.reading_time > 0 && <span className="inline-flex items-center gap-2"><Clock size={14} />{post.reading_time} dk okuma</span>}
          </div>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {post.excerpt && <p className="text-xl text-lavender-700 italic mb-10 pb-8 border-b">{post.excerpt}</p>}
          {post.content ? (
            <div className="prose-quvars text-base md:text-lg" dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p className="text-gray-500 italic">İçerik henüz hazırlanıyor.</p>
          )}
        </div>
      </article>
    </SiteLayout>
  )
}
