'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { Instagram } from 'lucide-react'

const INSTAGRAM_URL = 'https://www.instagram.com/p/DYepvCUI8tl/'

export default function DroneVideoSection() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      ;(window as any).instgrm.Embeds.process()
    }
  }, [])

  return (
    <section className="pb-16 md:pb-20" aria-label="Drone ile çekilmiş yol tarifi videosu">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-heading font-medium text-lavender-900 mb-3">
            Salonumuza Nasıl Gelinir?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Drone ile çekilmiş yol tarifi videomuzla salonumuzun konumunu kolayca bulun
          </p>
        </div>

        <div className="mx-auto max-w-[600px] w-full">
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={INSTAGRAM_URL}
            data-instgrm-version="14"
            style={{ margin: '0 auto', width: '100%' }}
          />

          <div className="mt-5 flex justify-center">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-quvars text-white text-sm font-semibold rounded-full shadow-soft hover:shadow-glow transition-all btn-glow"
              aria-label="Drone yol tarifi videosunu Instagram'da aç"
            >
              <Instagram size={16} />
              <span>Instagram&apos;da Aç</span>
            </a>
          </div>
        </div>
      </div>

      <Script
        src="//www.instagram.com/embed.js"
        strategy="afterInteractive"
        onLoad={() => {
          if ((window as any).instgrm) {
            ;(window as any).instgrm.Embeds.process()
          }
        }}
      />
    </section>
  )
}
