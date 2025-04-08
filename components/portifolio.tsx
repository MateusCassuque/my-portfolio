'use client'

import { useEffect, useState } from 'react'
import { Code, Star, GitFork, Globe, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { motion } from 'framer-motion'

interface GitHubRepo {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  language: string
  stargazers_count: number
  forks_count: number
  updated_at: string
}

export default function PortfolioPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setRepos(data)
      } catch (err) {
        setError('Failed to load projects')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [])

  if (error) {
    return (
      <div className="text-center pt-12">
        <p className="text-red-500">{error}</p>
        <Button variant="outline" className="mt-4" asChild>
          <a href="https://github.com/seu-usuario" target="_blank">
            Ver no GitHub
          </a>
        </Button>
      </div>
    )
  }

  return (
    <div className="pt-24">
      <div className="container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Meus <span className="text-primary">Projetos</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alguns dos meus trabalhos públicos disponíveis no GitHub
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6 h-full flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      {repo.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {repo.description || 'Sem descrição'}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/20">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-muted rounded-md">
                          {repo.language || 'Vários'}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4" />
                          {/* <span>{repo.stargazers_count}</span> */}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <GitFork className="h-4 w-4" />
                          {/* <span>{repo.forks_count}</span> */}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {repo.homepage && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={repo.homepage} target="_blank">
                              <Globe className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                        <Button size="sm" asChild>
                          <a href={repo.html_url} target="_blank">
                            <Code className="h-4 w-4 mr-2" />
                            Código
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}