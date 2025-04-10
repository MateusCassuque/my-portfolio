'use server'

import { z } from 'zod'
import  prisma  from '@/lib/db'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  message: z.string().min(10)
})

export async function sendMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Por favor, corrija os erros no formulário',
      errors: validatedFields.error.flatten().fieldErrors
    }
  }

  try {
    await prisma.message.create({
      data: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        content: validatedFields.data.message // Usando o campo correto do schema
      }
    })

    revalidatePath('/admin/dashboard')
    return { 
      success: true, 
      message: 'Mensagem enviada com sucesso!' 
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    return {
      success: false,
      message: 'Ocorreu um erro ao enviar sua mensagem'
    }
  }
}

interface FormState {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}