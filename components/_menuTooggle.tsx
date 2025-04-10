'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer'
import { Menu } from "lucide-react"
import { menuList } from "./list/links"

export const TooggleMenu: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)


  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }
  return (
    <div className="md:hidden">
      {/* Botão do Menu Mobile */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="w-6 h-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-2 p-4">
            {menuList.map(item => (
              <Button variant="ghost" asChild>
                <Link href={`${item.link}`}>{item.texto}</Link>
              </Button>
            ))}
          </div>
          <DrawerFooter>
            <Button variant="outline" onClick={closeDrawer}>
              Fechar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}