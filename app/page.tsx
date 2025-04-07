'use client'

import { ArrowRight, Github, Linkedin, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold"
          >
            Transformando ideias em <span className="text-primary">realidade digital</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Desenvolvedor web especializado em criar experiências digitais intuitivas e de alto desempenho. Combinando design elegante com funcionalidades robustas.
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
  );
}