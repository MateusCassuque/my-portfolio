'use client'
// app/portfolio/page.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Plataforma completa de e-commerce com carrinho, checkout e painel administrativo.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    github: "#",
    live: "#",
  },
  // Adicione mais projetos aqui
];

export default function PortfolioPage() {
  return (
    <div className="min-h-screen p-8 md:p-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Portfólio</h1>
        <p className="text-muted-foreground mb-12">Alguns dos meus projetos mais recentes</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs bg-secondary px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <div className="p-6 pt-0 flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      Código
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={project.live} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver projeto
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}