export const SITE_NAME = 'Güzellik Merkezi'
export const SITE_TAGLINE = 'Lazer Epilasyon, Cilt Bakımı & Bölgesel İncelme'
export const SITE_DOMAIN = 'guzellikyazilim.vercel.app'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : `https://${SITE_DOMAIN}`)

export const SUPABASE_IMG_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/img`

export function getImageUrl(path: string | null | undefined, fallback?: string): string {
  if (!path) {
    return fallback || 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=1200&q=80'
  }
  if (path.startsWith('http')) return path
  return `${SUPABASE_IMG_URL}/${path}`
}

export const COMPANY = {
  name: 'Güzellik Merkezi',
  legalName: 'Güzellik Merkezi',
  city: '',
  district: '',
  address: 'Örnek Mah. Güzellik Cad. No: 1',
  phone: '0555 555 55 55',
  phoneE164: '+905555555555',
  whatsapp: '905555555555',
  email: 'info@ornek.com',
  workingHours: 'Pzt-Cmt: 10:00 - 20:00',
  googleReviewLink: '',
  rating: 4.8,
  reviewCount: 91,
}

export const NAV_LINKS = [
  { label: 'Anasayfa', href: '/' },
  { label: 'Hakkımızda', href: '/hakkimizda' },
  { label: 'Hizmetler', href: '/hizmetler' },
  { label: 'Uzmanlar', href: '/uzmanlar' },
  { label: 'Galeri', href: '/galeri' },
  { label: 'Blog', href: '/blog' },
  { label: 'İletişim', href: '/iletisim' },
] as const

export const ICON_OPTIONS = [
  'sparkles', 'flower', 'heart', 'star', 'eye', 'sun', 'moon', 'gem',
  'crown', 'wand-2', 'palette', 'scissors', 'spray-can', 'leaf', 'feather',
  'droplets', 'flame', 'zap'
]

// Panelden girilen telefonu tel: linkine çevirir (0555 555 55 55 → +905555555555)
export function telHref(phone: string | null | undefined): string {
  const d = (phone || COMPANY.phone).replace(/\D/g, '')
  if (d.startsWith('90')) return `tel:+${d}`
  if (d.startsWith('0')) return `tel:+9${d}`
  return `tel:+90${d}`
}
