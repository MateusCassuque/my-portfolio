// app/(admin)/login/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import Link from 'next/link'
import { ArrowLeft, Link2, Loader2, Lock, LockOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

const formSchema = z.object({
  username: z.string().min(3, 'Nome de usuário muito curto'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const result = await signIn('credentials', {
        redirect: false,
        username: values.username,
        password: values.password
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      setLoading(false)
      toast.success('Login realizado com sucesso!')
      router.push('/admin/dashboard')
    } catch (error) {
      setLoading(false)
      toast.error(error instanceof Error ? error.message : 'Erro ao fazer login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className=""
        >
          {/* <Image
            src="/images/logo1.png"
            alt="Profile photo"
            fill
            className="object-cover"
            priority
            sizes="(width: 268px), 100vw"
          /> */}

          <div className="text-center mx-5 my-10">
            <h1 className="text-3xl font-bold">Acesso Admin</h1>
            <p className="text-muted-foreground mt-2">
              Entre com suas credenciais para acessar o painel
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className='flex items-center justify-between my-5'>
              <Link href={"/auth/register"} className='flex text-primary'><Lock className='h-5 w-5' /> &nbsp; Não tenho Conta</Link>
              <Link href={"/"} className='flex text-primary'><ArrowLeft className='h-5 w-5' /> &nbsp; Voltar</Link>
            </motion.div>
          </Form>

        </motion.div>

      </div>
    </div>
  )
}