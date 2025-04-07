'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

export default function SchedulePage() {
  const [iframeLoaded, setIframeLoaded] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Cabeçalho (mantido igual) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Agende sua <span className="text-primary">Reunião Inicial</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecione um horário conveniente para discutirmos seu projeto em detalhes.
          </p>
        </motion.div>

        {/* Container principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {/* Informações de contato */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card p-6 rounded-xl border border-border/50 shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Informações Adicionais
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Duração
                </h3>
                <p className="text-muted-foreground text-sm">45 minutos - 1 hora</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Outras Formas de Contato
                </h3>
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline" className="justify-start gap-2">
                    <Link href="mailto:mateusAbril4@gmail.com">
                      <Mail className="h-4 w-4" />
                      Enviar Email
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start gap-2">
                    <Link href="tel:+244935044500">
                      <Phone className="h-4 w-4" />
                      Ligar Agora
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Precisa de um horário diferente? Entre em contato diretamente.
                </p>
              </div>
            </div>
          </motion.div>


          {/* Container do iframe com skeleton */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 relative"
          >
            {/* Skeleton Loading */}
            {!iframeLoaded && (
              <div className="bg-card rounded-xl border border-border/50 shadow-lg overflow-hidden h-[700px]">
                <div className="animate-pulse h-full flex flex-col">
                  <div className="h-16 bg-muted/50 rounded-t-xl"></div>
                  <div className="flex-1 p-4 space-y-4">
                    <div className="h-10 bg-muted/30 rounded-md"></div>
                    <div className="grid grid-cols-7 gap-2">
                      {[...Array(7)].map((_, i) => (
                        <div key={i} className="h-8 bg-muted/20 rounded"></div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2 mt-4">
                      {[...Array(42)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-muted/10 rounded-md"
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Iframe do Cal.com */}
            <div className={`bg-card rounded-xl border border-border/50 shadow-lg overflow-hidden ${!iframeLoaded ? 'absolute inset-0 invisible' : 'block'}`}>
              <iframe
                src="https://cal.com/mateus-cassuque/meeting-de-ebertura-de-projecto?embed=true"
                width="100%"
                height="700"
                className="cal-embed"
                style={{
                  border: 'none',
                  background: 'transparent'
                }}
                onLoad={() => setIframeLoaded(true)}
                loading="eager"
              ></iframe>
            </div>
          </motion.div>
        </motion.div>

        {/* Rodapé com CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 border-t border-border/20 pt-8"
        >
          <h3 className="text-lg font-medium mb-4">Não encontrou um horário adequado?</h3>
          <Button asChild size="lg" className="gap-2">
            <Link href="/contact">
              <Mail className="h-4 w-4" />
              Envie uma mensagem direta
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}