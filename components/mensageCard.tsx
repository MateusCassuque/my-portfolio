'use client'

import { IMessage } from "@/types/message"
import { motion } from "framer-motion"
import { Check, Code, Eye, EyeClosed, Trash, User } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { deleteMessage, markMessageAsNotRead, markMessageAsRead } from "@/app/actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface IMessageProps {
  message: IMessage
}
export const MessageCard: React.FC<IMessageProps> = ({ message }) => {
  const router = useRouter()

  const handleRead = async (id: number) => {
    try {
      await markMessageAsRead(id)
      toast.success('Mensagem marcada como lida')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao marcar mensagem')
    }
  }

  const handleNotRead = async (id: number) => {
    try {
      await markMessageAsNotRead(id)
      toast.success('Mensagem marcada como não lida')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao marcar mensagem')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteMessage(id)
      toast.success('Mensagem excluída')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao excluir mensagem')
    }
  }


  return (
    <div className="w-full flex justify-center items-center h-[450px] sm:h-[650px]">
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 * 0.1 }}
        whileHover={{ y: -5 }}
        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow w-fit m-1"
      >
        <div className="p-6  h-full flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <User className="h-12 w-12 text-primary" />
              {message.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {message.content || 'Sem descrição'}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-border/20">
            <div className="flex flex-wrap gap-4 items-center justify-between my-2">
              <Badge variant="outline" className={`flex items-center gap-1 ${message.read ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <p className={`px-2 py-1 rounded-full text-xs flex`}>
                  {message.read ? (
                    <span className="flex">Lidas <Check className="h-4 w-4 mx-2" /></span>
                  ) : (<span className="flex">Não lida <EyeClosed className="h-4 w-4 mx-2" /></span>)}
                </p>
              </Badge>
            </div>

            <div className="flex gap-2">
              {!message.read ? (
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.preventDefault()
                  handleRead(message.id)
                }}>
                  <Eye className="h-4 w-4 mr-2" />
                  Marcar Lida
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.preventDefault()
                  handleNotRead(message.id)
                }}>
                  <EyeClosed className="h-4 w-4 mr-2" />
                  Marcar Não Lida
                </Button>
              )}

              <Button size="sm" onClick={(e) => {
                e.preventDefault()
                handleDelete(message.id)
              }}>
                <Trash className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}