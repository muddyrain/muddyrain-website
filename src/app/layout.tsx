export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log('layout')
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
