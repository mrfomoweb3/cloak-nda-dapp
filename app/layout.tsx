import type React from "react"
import type { Metadata } from "next"
import "../src/index.css"

export const metadata: Metadata = {
  title: "CloakNDA - Confidential NDA Management",
  description: "Production-grade dApp for confidential NDA management using Zama fhEVM",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
