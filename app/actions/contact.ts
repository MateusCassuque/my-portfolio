// app/actions/contact.ts
'use server'

import { z } from 'zod'
import  prisma  from '@/lib/db'
import { revalidatePath } from 'next/cache'

// Esquema de validação
const schema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Por favor, insira um email válido'),
  message: z.string().min(10, 'A mensagem deve ter pelo menos 10 caracteres'),
})

export async function sendMessage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Por favor, corrija os erros no formulário',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    await prisma.message.create({
      data: validatedFields.data,
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
      message: 'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.',
    }
  }
}

// Definindo o tipo FormState para a action
interface FormState {
  success: boolean
  message: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}