'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from 'next-themes'
import { Sun, Moon, User, LogIn, UserCheck } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export const DropMenu: React.FC = () => {
  const { theme, setTheme } = useTheme()
  // const { currentUser } = useUserStore()
  const session =useSession()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      {/* Avatar Dropdown */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarImage src={session.data?.user?.image ? session.data?.user.image : "/placeholder.svg"} alt="AvatarLogo" />
                <AvatarFallback> <UserCheck className="w-5 h-5"/> </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">

            <DropdownMenuLabel>Definição do Sistema</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={toggleTheme}>
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  Tema Escuro
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  Tema Claro
                </>
              )}
            </DropdownMenuItem>
            
            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
            {session.data?.user?.id && (
              <>
              <DropdownMenuLabel>Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/auth/dashboard/`}>
                    <div className="flex">
                      <User className="w-4 h-4 mr-2" />
                      {session.data?.user.name ? session.data?.user.name : 'Perfil'}
                    </div>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Link href={`/auth/dashboard/settings`}>Definições de usuário</Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>Sair</DropdownMenuItem>

              </>
            )}

            {/* {!session.data?.user?.id && (
              <Link href={'/user'}>
                <DropdownMenuItem>
                  <LogIn className="w-4 h-4 mr-2" />
                  Entrar
                </DropdownMenuItem>
              </Link>
            )} */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

