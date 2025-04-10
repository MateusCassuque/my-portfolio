'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function markMessageAsRead(id: number) {
  await prisma.message.update({
    where: { id },
    data: { read: true }
  })
  revalidatePath('/admin/dashboard')
}

export async function deleteMessage(id: number) {
  await prisma.message.delete({
    where: { id }
  })
  revalidatePath('/admin/dashboard')
}