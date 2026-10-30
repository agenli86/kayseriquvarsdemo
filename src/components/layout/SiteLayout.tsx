export default function SiteLayout({ children: _children }: { children: React.ReactNode }) {
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
      <div style={{ maxWidth: 560 }}>
        <div
          style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 700,
            letterSpacing: '0.15em',
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #c084fc, #f0abfc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          SUSPENDED
        </div>
        <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: 1.6, margin: 0 }}>
          Bu site şu anda askıya alınmıştır.
        </p>
        <p style={{ fontSize: '0.95rem', opacity: 0.6, marginTop: '0.75rem' }}>
          This site is currently suspended.
        </p>
      </div>
    </main>
  )
}
