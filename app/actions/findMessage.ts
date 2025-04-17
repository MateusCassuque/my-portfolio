'use server'

import { IMessage } from "@/types/message"
import prisma from '@/lib/db'


export async function findMessage(id: number): Promise<IMessage | Error> {
  'use server'
  try{
    const mensagem = await prisma.message.findFirst({
      where: { id }
    })
  
    if(!mensagem) return new Error('Mensagem Não encontrada')
    
    return mensagem
  
  }catch(error){
    return new Error((error as { message: string }).message || 'Erro ao buscar Mensagem')

  }
}