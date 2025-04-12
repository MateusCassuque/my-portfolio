'use client'

import { Button } from '@/components/ui/button'
// import { Newspaper } from 'lucide-react'
import Link from 'next/link'

// import { useEffect } from "react"
// import { Progress } from '@/components/ui/progress'
import { menuList } from './list/links'
import { DropMenu } from './_dropMenu'
import { TooggleMenu } from './_menuTooggle'
import { useSession } from 'next-auth/react'
// import NotificationBell from './notificacao'

export default function Header() {
  const session = useSession()

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex">
          {/* Botão do Menu Mobile */}
          <TooggleMenu />

          {/* Logo */}
          <Link href="/" className="flex mx-2 items-center gap-2">
            {/* <Newspaper className="w-6 h-6 text-primary" /> */}
            <p className="font-bold text-primary shadow-lg px-4 rounded-md">
              <span className="">M</span>ateus
              &nbsp;
              <span className="">C</span>assuque
            </p>
          </Link>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center gap-4">
          {session.data?.user?.id && menuList.map(item => (
            <Button variant="ghost" asChild>
              <Link href={`${item.link}`}>{item.texto}</Link>
            </Button>
          ))}
        </nav>

        {/* Avatar Dropdown */}
        <div className="flex">
          <div className="mx-2 flex">
            {/* {currentUser?.id && (
              <NotificationBell userId={currentUser?.id || ''} />
            )} */}

            <DropMenu />
          </div>
        </div>

      </div>
      {/* {loading && (
        <Progress className='animate-pulse' />
      )} */}
    </header>
  )
}