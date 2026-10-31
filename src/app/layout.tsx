import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import { getSettings, getPageSeo } from '@/lib/settings'
import { SITE_NAME, SITE_URL, getImageUrl } from '@/lib/constants'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700'],
})

export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  themeColor: '#9D7BE3',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export async function generateMetadata(): Promise<Metadata> {
  const [seo, settings] = await Promise.all([getPageSeo('anasayfa'), getSettings()])

  const defaultTitle = "Güzellik Merkezi & Lazer Epilasyon Salonu"
  const defaultDescription = "Güzellik merkezimizde son teknoloji lazer, profesyonel cilt bakımı ve estetik çözümler. Güvenilir hizmet için hemen randevu alın."
  const defaultOgImage = `${SITE_URL}/images/logo.png`

  const title = (seo?.meta_title && seo.meta_title.trim()) ? seo.meta_title : defaultTitle
  const description = (seo?.meta_description && seo.meta_description.trim()) ? seo.meta_description : defaultDescription
  const ogImage = seo?.og_image ? getImageUrl(seo.og_image) : defaultOgImage
  const faviconUrl = (settings.favicon_url && settings.favicon_url.trim()) ? settings.favicon_url : '/favicon.ico'
  console.log('[SEO]', 'anasayfa', 'title:', title)

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: '%s' },
    description,
    keywords: [
      'lazer epilasyon',
      'güzellik merkezi',
      'cilt bakımı',
      'güzellik salonu',
      'bölgesel incelme',
      'nail art',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: SITE_URL },
    openGraph: {
      type: 'website',
      locale: 'tr_TR',
      url: SITE_URL,
      siteName: SITE_NAME,
      title,
      description,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    icons: {
      icon: faviconUrl,
      apple: faviconUrl,
      shortcut: faviconUrl,
    },
    verification: {
      google: settings.google_site_verification?.trim() || undefined,
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${playfair.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  )
}
