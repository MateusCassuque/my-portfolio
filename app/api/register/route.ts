import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Verifique se o usuário já existe
    const existingAdmin = await prisma.admin.findUnique({
      where: { username }
    })

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Nome de usuário já existe' },
        { status: 400 }
      )
    }

    // Criptografe a senha
    const hashedPassword = await bcrypt.hash(password, 12)

    // Crie o novo admin
    const newAdmin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword
      }
    })

    return NextResponse.json(
      { message: 'Admin criado com sucesso' },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao registrar admin' },
      { status: 500 }
    )
  }
}