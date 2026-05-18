import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Poppins } from 'next/font/google'
import './globals.css'
import { getSettings } from '@/lib/settings'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

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
  // Panelden yansımayan sorunlu kısmı devre dışı bırakıp doğrudan senin canavar gibi SEO bilgilerini çaktık abi
  const title = "Kayseri Güzellik Merkezi & Lazer Epilasyon Salonu | Quvars"
  const description = "Kayseri Quvars Güzellik Merkezi'nde son teknoloji lazer, profesyonel cilt bakımı ve estetik çözümler. Güvenilir hizmet için hemen randevu alın."
  const ogImage = "https://www.quvarsguzellikmerkezi.com.tr/images/logo.png"

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description,
    keywords: [
      'kayseri lazer epilasyon',
      'kayseri güzellik merkezi',
      'kayseri cilt bakımı',
      'kocasinan güzellik salonu',
      'bölgesel incelme kayseri',
      'nail art kayseri',
      'quvars beauty studio',
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    alternates: { canonical: "https://www.quvarsguzellikmerkezi.com.tr" },
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
      icon: '/favicon.ico',
      apple: '/favicon.ico',
    },
    verification: {
      google: "xiYobAiOOv3Cj3jL_pg9QECbwQ9gBlc0y_BG4_Wiy00", // METUnic'e eklediğin o canavar gibi doğrulama kodu burada abi
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
