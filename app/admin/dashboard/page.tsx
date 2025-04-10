// app/(admin)/dashboard/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import MessageTable from '@/components/message-table'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Mensagens Recebidas</h1>
        <MessageTable messages={messages} />
      </div>
    </div>
  )
}