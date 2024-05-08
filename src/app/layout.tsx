import "../../styles/uswds/styles.scss"

export const metadata = {
  title: "The Brooklyn Rail",
  description:
    "The Brooklyn Rail is a journal committed to providing an independent forum for visual arts, culture, and politics throughout New York City and beyond.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}