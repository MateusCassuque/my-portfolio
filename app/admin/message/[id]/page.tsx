
import { findMessage } from "@/app/actions/findMessage"
import { MessageCard } from "@/components/mensageCard"
import { notFound } from "next/navigation"


export default async function MessagePage({ params }: any) {
  const { id } = await params

  const idNumber = Number.parseInt(id)

  if (isNaN(idNumber)) notFound()
  const mensagem = await findMessage(Number.parseInt(id))

  if (mensagem instanceof Error) notFound()

  return (
    <div >
      <MessageCard message={mensagem} />
    </div>
  )
}