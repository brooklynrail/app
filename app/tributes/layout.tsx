import { ThemeProvider } from "@/components/theme"

export default function TributesLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
