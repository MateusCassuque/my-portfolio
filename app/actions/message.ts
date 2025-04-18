'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function markMessageAsRead(id: number) {
  'use server'
  await prisma.message.update({
    where: { id },
    data: { read: true }
  })
  revalidatePath('/admin/dashboard')
}

export async function markMessageAsNotRead(id: number) {
  'use server'
  await prisma.message.update({
    where: { id },
    data: { read: false }
  })
  revalidatePath('/admin/dashboard')
}

export async function deleteMessage(id: number) {
  'use server'
  await prisma.message.delete({
    where: { id }
  })
  revalidatePath('/admin/dashboard')
}
