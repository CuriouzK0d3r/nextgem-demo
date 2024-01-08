import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextGEM Demo',
  description: 'Created for NextGEM project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <header>
    <nav className="bg-gray-200 bg-opacity-90 border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-[100rem]">
        <a href="" className="flex items-center">
        <img
        className="mr-3 h-18"
                src="https://www.nextgem.eu/wp-content/uploads/2022/07/cropped-NextGEM_final_transparent.png"
                alt="logo-img"
                id="logo-img"
            />
          {/* <!-- <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Search</span> --> */}
        </a>
        {/* <a href="/upload.html" className="mt-2" style="text-decoration: underline;">Upload</a> */}

      </div>
    </nav>
  </header>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
