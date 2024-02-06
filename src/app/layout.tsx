import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'NIKH HUB Web App',
    description: 'Created for NextGEM project',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <head>
                <title>NIKH HUB Web App</title>
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
