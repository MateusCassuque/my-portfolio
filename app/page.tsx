'use client'

import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { ArrowRight, Github, Linkedin, Mail, Calendar, Code, Cpu, Layers, Database, Facebook, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import PortfolioPage from '@/components/portifolio'

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 bg-gradient-to-b from-background to-muted/10">
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Seção de texto - Versão refinada */}
        <div className="space-y-8">
          {/* Cabeçalho com animação combinada */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="block text-muted-foreground text-lg mb-2">Olá, eu sou</span>
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                <TypeAnimation
                  sequence={[
                    'Mateus Francisco Licronha Cassuque',
                    1500,
                    'Mateus Cassuque',
                    1500
                  ]}
                  wrapper="span"
                  speed={10}
                  repeat={Infinity}
                />
              </span>
            </h1>

            {/* Subtítulo animado */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-6"
            >
              <TypeAnimation
                sequence={[
                  'Full Stack Developer',
                  2000,
                  'Especialista em Next.js',
                  2000,
                  'Desenvolvedor TypeScript',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.p>
          </motion.div>

          {/* Stack tecnológica - Design unificado */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground">MINHA STACK PRINCIPAL:</p>
            <div className="flex flex-wrap gap-3">
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

              {/* {[
                { name: 'TypeScript', icon: <Code className="h-4 w-4" /> },
                { name: 'Node.js', icon: <Cpu className="h-4 w-4" /> },
                { name: 'Next.js', icon: <Layers className="h-4 w-4" /> },
                { name: 'PostgreSQL', icon: <Database className="h-4 w-4" /> }
              ].map((tech, index) => (

                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-sm">
                    {tech.icon}
                    {tech.name}
                  </div>
                </motion.div>
              ))} */}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* ADIÇÃO: Título "Transformando ideias em realidade digital" */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold leading-tight mt-4"
            >
              Transformando ideias em <span className="text-primary">Realidade digital</span>
            </motion.h2>

            {/* ADIÇÃO: Descrição profissional completa */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-muted-foreground my-2 font-mono"
            >
              Desenvolvedor web especializado em criar experiências digitais intuitivas e de alto desempenho. Combinando design elegante com funcionalidades robustas... &nbsp;
              <a href="/about" className='text-primary'>Saber Mais</a>
            </motion.p>
          </motion.div>

          {/* Botões de ação - Estilo unificado */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-wrap gap-4 pt-6"
          >
            <Button asChild size="lg" className="gap-2 w-full sm:w-fit">
              <Link href="/contact">
                <Mail size={18} />
                Vamos conversar
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="gap-2 w-full sm:w-fit">
              <Link href="/schedule">
                <Calendar size={18} />
                Agendar reunião
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Seção da foto - Animação refinada */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative aspect-square rounded-full overflow-hidden border-8 border-background shadow-xl"
        >
          <Image
            src="/images/profile.jpg"
            alt="Profile photo"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-background/10" />

          {/* Badge flutuante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-13 left-8 sm:bottom-10 sm:left-35 bg-background/90 backdrop-blur px-4 py-2 rounded-full border border-primary/20 shadow-sm"
          >
            <span className="text-sm font-medium">Disponível para novos projetos</span>
          </motion.div>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      // className="absolute bottom-13 left-8 sm:bottom-10 sm:left-35 bg-background/90 backdrop-blur px-4 py-2 rounded-full border border-primary/20 shadow-sm"
      >
        <PortfolioPage />
      </motion.div>

      {/* Rodapé com senso de urgência */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="mt-32 border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mateus Francisco Licronha Cassuque. Todos os direitos reservados.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Vagas limitadas para novos projetos este mês. Entre em contato hoje mesmo.
          </p>
        </div>

        <div className="flex gap-4 text-primary">
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <Link href="https://github.com/MateusCassuque" target="_blank" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <Link href="https://www.linkedin.com/in/mateus-cassuque-729a76345/?trk=opento_sprofile_goalscard" target="_blank" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <Link href="https://www.facebook.com/profile.php?id=61560957432070" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <Link href="mailto:mateusAbril4@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild className="hover:bg-primary/10">
            <Link href="/login" aria-label="Login">
              <LogIn className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </motion.footer>
    </main>
  )
}