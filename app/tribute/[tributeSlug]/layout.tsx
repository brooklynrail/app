import { ThemeProvider } from "@/components/theme"

export default function TributeLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
