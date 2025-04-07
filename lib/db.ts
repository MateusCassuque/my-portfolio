import { PrismaClient } from '@prisma/client'

class PrismaClientExtended extends PrismaClient {
  // Métodos personalizados podem ser adicionados aqui
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientExtended | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClientExtended()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export async function connectDB() {
  try {
    await prisma.$connect()
    console.log('✅ Conexão com o banco de dados estabelecida')
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco de dados:', error)
    process.exit(1)
  }
}

export async function disconnectDB() {
  try {
    await prisma.$disconnect()
    console.log('✅ Conexão com o banco de dados encerrada')
  } catch (error) {
    console.error('❌ Erro ao desconectar do banco de dados:', error)
    process.exit(1)
  }
}

export { prisma }