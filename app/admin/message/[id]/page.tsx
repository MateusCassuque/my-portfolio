
import { findMessage } from "@/app/actions/findMessage"
import { MessageCard } from "@/components/mensageCard"
import { redirect } from "next/navigation"
import { notFound } from "next/navigation"


export default async function MessagePage({ params }: { params: { id: string } }) {
  const { id } = await params

  const mensagem = await findMessage(Number.parseInt(id))

  if (mensagem instanceof Error) notFound()

  return (
    <div >
      <MessageCard message={mensagem} />
    </div>
  )
}