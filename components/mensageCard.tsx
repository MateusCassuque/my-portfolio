'use client'

import { IMessage } from "@/types/message"
import { motion } from "framer-motion"
import { Check, Code, Eye, EyeClosed, Trash } from "lucide-react"
import { Button } from "./ui/button"

interface IMessageProps {
  message: IMessage
}
export const MessageCard: React.FC<IMessageProps> = ({ message }) => {
  return (
    <div>
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 1 * 0.1 }}
        whileHover={{ y: -5 }}
        className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="p-6  h-full flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              {message.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {message.content || 'Sem descrição'}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-border/20">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-muted rounded-md">
                  {message.read || 'Vários'}
                </span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  {message.read ? <Check className="h-4 w-4" /> : <EyeClosed className="h-4 w-4" />}
                </div>
                {/* <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <GitFork className="h-4 w-4" />
            </div> */}
              </div>
              <div className="flex gap-2">
                {!message.read && (
                  <Button variant="outline" size="sm" asChild>
                    <Eye className="h-4 w-4 mr-2" />
                    Marcar Como Lida
                  </Button>
                )}
                <Button size="sm" asChild>
                  <Trash className="h-4 w-4 mr-2" />
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}