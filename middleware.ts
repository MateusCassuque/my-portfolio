// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import prisma from '@/lib/db'

// Configuração para matcher (opcional)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (rotas de autenticação NextAuth)
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico (ícone do site)
     * - images/ (pasta de imagens)
     * - public/ (arquivos públicos)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|images|public).*)',
  ],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  // const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const session = process.env.NODE_ENV === 'production' ? request.cookies.get('__Secure-next-auth.session-token') : request.cookies.get('next-auth.session-token')

  // Bloqueia acesso à página de registro em produção
  if (process.env.NODE_ENV === 'production' && pathname === '/auth/register') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protege todas as rotas admin/*
  if (pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Verificação adicional para garantir que é um admin
    // const isAdmin = await verifyAdmin(session.)
    // console.log(session.sub)
    // if (!isAdmin) {
    //   return NextResponse.redirect(new URL('/unauthorized', request.url))
    // }
  }

  // Protege a rota de login admin
  if (pathname === '/auth/login' && session) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

// Função auxiliar para verificar se o usuário é admin
async function verifyAdmin(userId: string | undefined) {
  if (!userId) return false

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(userId) }
    })
    return !!admin
  } catch (error) {
    console.error('Error verifying admin:', error)
    return false
  }
}