'use client'
import { Layout } from '@/Layout'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
