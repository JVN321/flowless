

import "@/styles/globals.css";




import { Providers } from "./providers";
import "./api/storeSensorData/worker"; // Start background task


export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>{children}</Providers>
      </body>
    </html>
  )
}
