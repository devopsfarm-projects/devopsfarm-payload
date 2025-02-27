'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between">

      <Link href="/" className="flex items-center space-x-2">
      <Logo className="w-10 md:w-20 h-auto" />
      <h1 className="md:text-2xl text-lg font-bold bg-clip-text text-white">
        DevopsFarm
      </h1>
    </Link>

        {/* <Link href="/">
           <Logo loading="eager" priority="high" className="invert dark:invert-0" /> 
          <Logo 
            
              className="w-10 md:w-20 h-auto"
            />
            <h1 className="md:text-2xl text-lg font-bold bg-clip-text text-white">
              <Link href="/home">DevopsFarm</Link>
            </h1>
        </Link> */}
        <ul className="md:flex  items-center hidden gap-6">
            <li className="transform transition-all duration-200 ease-in-out hover:scale-125 relative flex flex-col items-center justify-center">
              <Link href="/" className="flex flex-col items-center">
                <p className="text-center text-sm mt-1"> <HeaderNav data={data} /></p>
              </Link>
            </li>
        </ul>

        {/* <HeaderNav data={data} /> */}

      </div>
    </header>
  )
}
