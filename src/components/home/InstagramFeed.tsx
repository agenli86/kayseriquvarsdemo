'use client'

import { useState, useEffect } from 'react'
import { Instagram, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Post = {
  id: string
  permalink: string | null
  embed_code: string | null
  sort_order: number
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [igUrl, setIgUrl] = useState('https://www.instagram.com/quvarsbeauty/')
  const [igHandle, setIgHandle] = useState('quvarsbeauty')

  useEffect(() => {
    const supabase = createClient()
    async function load() {
      const [postsRes, settingRes] = await Promise.all([
        supabase
          .from('instagram_posts')
          .select('id, permalink, embed_code, sort_order')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })
          .limit(6),
        supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'instagram')
          .maybeSingle(),
      ])
      if (postsRes.data) setPosts(postsRes.data)
      if (settingRes.data?.value) {
        setIgUrl(settingRes.data.value)
        const handle = settingRes.data.value
          .replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
          .replace(/\/$/, '')
        if (handle) setIgHandle(handle)
      }
      setLoading(false)
    }
    load()
  }, [])

  // Load Instagram embed.js only for posts using blockquote (no embed_code)
  useEffect(() => {
    if (loading) return
    const hasBlockquotes = posts.some(
      (p) =>
        !p.embed_code?.trim() &&
        p.permalink &&
        (p.permalink.includes('instagram.com/p/') ||
          p.permalink.includes('instagram.com/reel/') ||
          p.permalink.includes('instagram.com/tv/'))
    )
    if (!hasBlockquotes) return

    const existing = document.querySelector('script[src*="instagram.com/embed.js"]')
    if (existing) {
      if (typeof window !== 'undefined' && (window as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
        ;(window as { instgrm?: { Embeds: { process: () => void } } }).instgrm!.Embeds.process()
      }
      return
    }
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    script.onload = () => {
      if ((window as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
        ;(window as { instgrm?: { Embeds: { process: () => void } } }).instgrm!.Embeds.process()
      }
    }
    document.body.appendChild(script)
  }, [loading, posts])

  const validPosts = posts.filter(
    (p) =>
      p.embed_code?.trim() ||
      (p.permalink &&
        (p.permalink.includes('instagram.com/p/') ||
          p.permalink.includes('instagram.com/reel/') ||
          p.permalink.includes('instagram.com/tv/')))
  )

  if (!loading && validPosts.length === 0) return null

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-lavender-50 rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
            <Instagram size={12} />
            <span>Instagram &amp; Sosyal Medya</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
            Bizi sosyal medyada{' '}
            <span className="text-gradient italic">takip edin</span>
          </h2>
          <p className="text-gray-600 mt-3 text-base md:text-lg">
            En son çalışmalarımız ve atmosferimiz — Instagram, TikTok ve daha fazlası
          </p>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-lavender-700 hover:text-rose-600 font-semibold transition-colors"
          >
            <Instagram size={18} />
            <span>@{igHandle}</span>
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl bg-lavender-50 animate-pulse aspect-[9/16]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
            {validPosts.map((post) => (
              <div
                key={post.id}
                className="rounded-2xl overflow-hidden shadow-soft bg-white aspect-[9/16] flex items-center justify-center"
              >
                {post.embed_code?.trim() ? (
                  // Admin panelinden girilen iframe embed kodu (TikTok, YouTube, Vimeo vb.)
                  // Güvenilir kaynak: yalnızca admin erişebilir
                  <div
                    className="w-full h-full [&_iframe]:w-full [&_iframe]:h-full"
                    dangerouslySetInnerHTML={{ __html: post.embed_code }}
                  />
                ) : (
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={post.permalink!}
                    data-instgrm-version="14"
                    style={{
                      background: '#FFF',
                      border: '0',
                      borderRadius: '3px',
                      boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                      margin: '1px',
                      maxWidth: '540px',
                      minWidth: '326px',
                      padding: '0',
                      width: '99.375%',
                    }}
                  >
                    <a href={post.permalink!} target="_blank" rel="noopener noreferrer">
                      Instagram&apos;da görüntüle
                    </a>
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/quvarsbeauty/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-lavender-200 text-lavender-800 text-sm font-semibold rounded-full hover:border-lavender-400 hover:shadow-soft transition-all"
          >
            <ExternalLink size={14} />
            <span>Tüm Postlarımız</span>
          </a>
        </div>
      </div>
    </section>
  )
}
