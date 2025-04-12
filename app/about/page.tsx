'use client'

import { motion, useInView } from 'framer-motion'
import { Code, Cpu, Database, Layers, Rocket, Briefcase, Award, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRef } from 'react'

export default function AboutPage() {
  const titleRef = useRef(null)
  const LeftRef = useRef(null)
  const RightRef = useRef(null)

  // Verifica se os elementos estão visíveis
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" })
  const isLeftInView = useInView(LeftRef, { once: true, margin: "-100px" })
  const isRightInView = useInView(RightRef, { once: true, margin: "-100px" })

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Cabeçalho com animação */}
        <motion.div
          ref={titleRef}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Sobre <span className="text-primary">Mim</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Minha jornada, habilidades e abordagem para criar soluções digitais excepcionais.
          </p>
        </motion.div>

        {/* Conteúdo principal */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Seção de texto e experiência */}
          <motion.div
            ref={LeftRef}
            animate={isLeftInView ? { opacity: 1, x: 0 } : {}}
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Introdução */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Minha Trajetória
              </h2>
              <p className="text-muted-foreground">
                Como desenvolvedor Full Stack com mais de X anos de experiência, tenho ajudado empresas a transformar suas ideias em produtos digitais robustos e escaláveis.
              </p>
            </div>

            {/* Experiência */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Experiência Profissional
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Desenvolvedor Full Stack",
                    company: "GOTA D' SOL, (SU) LDA.",
                    period: "2025 - Presente",
                    description: "Desenvolvimento de aplicações web completas com Next.js, Node.js e bancos de dados relacionais."
                  },
                  {
                    title: "Especialista em Front-end",
                    company: "DEV-CUTE",
                    period: "2021 - 2024",
                    description: "Criação de interfaces de usuário performáticas e acessíveis com React e TypeScript."
                  }
                ].map((item, index) => (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="border-l-2 border-primary pl-4 py-2"
                  >
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.company} • {item.period}</p>
                    <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Abordagem */}
            <div className="space-y-4 pt-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Rocket className="h-5 w-5 text-primary" />
                Minha Abordagem
              </h2>
              <p className="text-muted-foreground">
                Acredito em soluções que combinam design intuitivo com arquitetura sólida, sempre focando nas necessidades reais do usuário final.
              </p>
            </div>
          </motion.div>

          {/* Seção técnica com animação */}
          <motion.div
            ref={RightRef}
            initial={{ opacity: 0, x: 20 }}
            animate={isRightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="bg-card p-8 rounded-xl border border-border/50 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-6">Stack Técnica</h2>

            {/* Habilidades principais */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Code className="h-4 w-4 text-primary" />
                  Linguagens & Frameworks
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['TypeScript', 'Next.js', 'Node.js', 'React', 'Express', 'Adonis.Js'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <div className="px-4 py-2 bg-muted/50 rounded-md text-sm">
                        {tech}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Database className="h-4 w-4 text-primary" />
                  Bancos de Dados
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['PostgreSQL', 'MongoDB', 'Firebase'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <div className="px-4 py-2 bg-muted/50 rounded-md text-sm">
                        {tech}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  Ferramentas & Plataformas
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Docker', 'AWS', 'Git', 'Vercel'].map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <div className="px-4 py-2 bg-muted/50 rounded-md text-sm">
                        {tech}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 pt-6 border-t border-border/20"
            >
              <Button asChild size="lg" className="w-full gap-2">
                <Link href="/schedule">
                  <Calendar className="h-4 w-4" />
                  Agendar Consulta
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}