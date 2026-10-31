import Header from './Header'
import Footer from './Footer'
import StickyButtons from './StickyButtons'
import Topbar from './Topbar'
import { getSettings } from '@/lib/settings'

// Site geçici olarak kapalı. Tekrar açmak için false yapın.
const SITE_KAPALI = true

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  if (SITE_KAPALI) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a0f2e 0%, #2d1b4e 50%, #1a0f2e 100%)',
          color: '#fff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', fontWeight: 800, letterSpacing: '0.08em' }}>SUSPENDED</div>
          <p style={{ marginTop: '1rem', opacity: 0.75 }}>This site is currently suspended.</p>
        </div>
      </main>
    )
  }

  const settings = await getSettings()

  return (
    <>
      {settings.topbar_active === 'true' && <Topbar text={settings.topbar_text} />}
      <Header settings={settings} />
      <main className="min-h-screen">{children}</main>
      <Footer settings={settings} />
      <StickyButtons settings={settings} />
      {/* Schema.org LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': settings.homepage_schema_type || 'BeautySalon',
            name: settings.site_title || 'Güzellik Merkezi',
            description: settings.site_description,
            telephone: settings.phone,
            email: settings.email,
            url: process.env.NEXT_PUBLIC_SITE_URL,
            image: settings.logo_url || settings.og_image,
            address: {
              '@type': 'PostalAddress',
              streetAddress: settings.address,
              addressLocality: settings.city || '',
              addressCountry: 'TR',
            },
            openingHours: settings.working_hours,
            sameAs: [settings.facebook, settings.instagram, settings.tiktok, settings.youtube].filter(Boolean),
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.8',
              reviewCount: '91',
            },
          }),
        }}
      />
    </>
  )
}
