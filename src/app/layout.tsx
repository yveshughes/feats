import './globals.css'
import { Shell } from '@/components/layout/Shell'
import { Inter } from 'next/font/google'
import { SessionProvider } from '@/components/providers/SessionProvider'
import Navbar from '@/components/ui/navbar'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FEATS - Formal Elements Art Therapy Scale',
  description: 'A standardized tool for analyzing artwork in therapeutic settings, powered by cutting-edge AI and cloud technologies.',
  keywords: ['art therapy', 'FEATS', 'formal elements', 'AI', 'cloud computing', 'mental health'],
  authors: [{ name: 'FEATS Team' }],
  openGraph: {
    title: 'FEATS - Formal Elements Art Therapy Scale',
    description: 'Revolutionizing art therapy with AI-powered analysis',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'FEATS Open Graph Image' }],
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <Navbar />
            <Shell>{children}</Shell>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

