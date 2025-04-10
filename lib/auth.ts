// lib/auth.ts
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import  prisma  from "./db"
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Por favor, forneça um nome de usuário e senha')
        }

        const admin = await prisma.admin.findUnique({
          where: { username: credentials.username }
        })

        if (!admin || !(await bcrypt.compare(credentials.password, admin.password))) {
          throw new Error('Credenciais inválidas')
        }

        // Retorne o objeto do usuário com a propriedade id
        return {
          id: admin.id.toString(),
          name: admin.username,
          email: null
        }
      }
    })
  ],

  pages: {
    signIn: '/admin/login',
    error: '/admin/login'
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Agora o TypeScript reconhecerá a propriedade id
      if (session.user) {
        session.user.id = token.id as string
        // Você pode adicionar outras propriedades personalizadas aqui
        // session.user.role = token.role
      }
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development'
}