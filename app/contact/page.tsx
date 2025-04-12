'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Backpack, ArrowBigLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import ContactForm from '@/components/contact-form'

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <section className="container py-16 md:py-24 mx-1">
        {/* Cabeçalho com animação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Vamos Conversar</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem um projeto em mente ou quer saber mais sobre meus serviços? Preencha o formulário ou entre em contato diretamente.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulário com animação */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 rounded-xl shadow-lg border border-border/50"
          >
            <h2 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h2>
            <ContactForm />
          </motion.div>

          {/* Informações de contato com animação */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Informações de Contato</h2>
              <p className="text-muted-foreground">
                Estou disponível para responder suas dúvidas e discutir oportunidades de colaboração.
              </p>
            </div>

            <div className="space-y-6">
              {/* Item de contato 1 */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <a
                    href="mailto:contato@exemplo.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    mateusabril4@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Item de contato 2 */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Telefone</h3>
                  <a
                    href="tel:+5511999999999"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +244 935 044 500
                  </a>
                </div>
              </motion.div>

              {/* Item de contato 3 */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-start gap-4"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Localização</h3>
                  <p className="text-muted-foreground">
                    Luanda, Ngola-Kiluange, Edf. do Banco BIC, 2º Andar, Angola
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Botão de agendamento */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-wrap gap-4 pt-6"
            >
                <Button asChild size="lg" className="w-full sm:w-fit">
                  <Link
                    href="/schedule"
                    className="gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Agendar Chamada
                  </Link>
                </Button>

                <Button asChild size="lg" variant={'outline'} className="w-full sm:w-fit">
                  <Link
                    href="/"
                    className="gap-2"
                  >
                    <ArrowBigLeft className="h-4 w-4" />
                    Voltar
                  </Link>
                </Button>

            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mapa animado */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="container pb-16"
      >
        <div className="rounded-xl overflow-hidden border border-border/50 shadow-lg aspect-video bg-muted/30">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.9652042326293!2d13.284301963754256!3d-8.789339252134193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f18c0b3024d3%3A0x9ff1d742bf2a2900!2sGota%20D&#39;%20Sol%20Lda!5e0!3m2!1spt-PT!2sao!4v1744051173324!5m2!1spt-PT!2sao"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </motion.div>
    </div>
  )
}