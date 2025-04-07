'use client'

import { Github, Linkedin, Mail, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Badge } from '@/components/ui/badge'
import { Code, Cpu, Database, Layers } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        {/* Nome com efeito de digitação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-2">
            Olá, eu sou{' '}
            <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  'Seu Nome',
                  1000,
                  'Seu Nome 👋',
                  1000
                ]}
                wrapper="span"
                speed={10}
                repeat={Infinity}
              />
            </span>
          </h1>

          {/* Título profissional */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground font-medium"
          >
            Full Stack Developer
          </motion.p>
        </motion.div>

        {/* Stack tecnológica */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap gap-2 items-center"
        >
          <Badge variant="outline" className="flex items-center gap-1">
            <Code className="h-3 w-3 text-primary" />
            TypeScript
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Cpu className="h-3 w-3 text-primary" />
            Node.js
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Layers className="h-3 w-3 text-primary" />
            Next.js
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Database className="h-3 w-3 text-primary" />
            PostgreSQL
          </Badge>
        </motion.div>

        {/* Botões de ação */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="flex flex-wrap gap-4 pt-4"
        >
          <Button asChild size="lg" className="gap-2">
            <Link href="/contact">
              <Mail size={18} />
              Vamos conversar
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <Link href="https://cal.com/seu-link" target="_blank">
              <Calendar size={18} />
              Agendar reunião
            </Link>
          </Button>
        </motion.div> */}
        
        <div className="space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Transformando Ideias em <span className="text-primary">Realidade Digital</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Desenvolvedor web especializado em criar experiências digitais intuitivas e de alto desempenho
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                <Mail size={18} />
                Vamos conversar
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="#" onClick={() => window.open('https://cal.com/your-link', '_blank')}>
                <Calendar size={18} />
                Agendar reunião
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>


        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative aspect-square rounded-full overflow-hidden border-8 border-primary/10"
        >
          <Image
            src="/images/profile.jpg"
            alt="Profile photo"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </section>

      <footer className="mt-32 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Mateus Cassuque. Todos os direitos reservados.
        </p>

        <div className="flex gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com" target="_blank">
              <Github />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin />
            </Link>
          </Button>
        </div>
      </footer>
    </main>
  )
}