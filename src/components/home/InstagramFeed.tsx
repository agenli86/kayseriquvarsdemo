'use client'

import { useState, useEffect } from 'react'
import { Instagram } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

type Post = {
  id: string
  permalink: string | null
  caption: string | null
  sort_order: number
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [igUrl, setIgUrl] = useState('https://instagram.com/quvarsbeauty')
  const [igHandle, setIgHandle] = useState('quvarsbeauty')

  useEffect(() => {
    const supabase = createClient()
    async function load() {
      const [postsRes, settingRes] = await Promise.all([
        supabase
          .from('instagram_posts')
          .select('id, permalink, caption, sort_order')
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

  useEffect(() => {
    if (loading || posts.length === 0) return
    const existing = document.querySelector('script[src*="instagram.com/embed.js"]')
    if (existing) {
      if (typeof window !== 'undefined' && (window as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
        (window as { instgrm?: { Embeds: { process: () => void } } }).instgrm!.Embeds.process()
      }
      return
    }
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    script.onload = () => {
      if (typeof window !== 'undefined' && (window as { instgrm?: { Embeds: { process: () => void } } }).instgrm) {
        (window as { instgrm?: { Embeds: { process: () => void } } }).instgrm!.Embeds.process()
      }
    }
    document.body.appendChild(script)
  }, [loading, posts])

  const validPosts = posts.filter(
    (p) =>
      p.permalink &&
      (p.permalink.includes('instagram.com/p/') ||
        p.permalink.includes('instagram.com/reel/') ||
        p.permalink.includes('instagram.com/tv/'))
  )

  if (!loading && validPosts.length === 0) return null

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-lavender-50 rounded-full text-xs font-medium text-lavender-700 uppercase tracking-wider">
            <Instagram size={12} />
            <span>Instagram Akışı</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-medium text-lavender-900 leading-tight">
            Bizi Instagram&apos;da{' '}
            <span className="text-gradient italic">takip edin</span>
          </h2>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-lavender-50 animate-pulse"
                style={{ minHeight: '480px' }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validPosts.map((post) => (
              <blockquote
                key={post.id}
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
                  {post.caption || "Instagram'da görüntüle"}
                </a>
              </blockquote>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
