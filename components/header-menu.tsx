
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { menuList } from './list/links'
import { DropMenu } from './_dropMenu'

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">Gota D' Sol</span>
          </Link> */}
          <DropMenu />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {menuList.map((item, index) => (
            <motion.div
              key={item.link}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.link}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {item.texto}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-background shadow-lg py-4 px-6"
          >
            <div className="flex flex-col gap-4">
              {menuList.map((item) => (
                <Link
                  key={item.link}
                  href={item.link}
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.texto}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </header>
  )
}