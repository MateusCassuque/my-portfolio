// app/actions/contact.ts
'use server'

import { z } from 'zod'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10),
})

export async function sendMessage(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Por favor, preencha todos os campos corretamente.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.message.create({
      data: validatedFields.data,
    })

    revalidatePath('/admin/dashboard')
    return { success: true, message: 'Mensagem enviada com sucesso!' }
  } catch (error) {
    return {
      success: false,
      message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
    }
  }
}