import { ThemeProvider } from "@/app/components/theme"
import "../../../../styles/globals.css"

export default function TributeLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
