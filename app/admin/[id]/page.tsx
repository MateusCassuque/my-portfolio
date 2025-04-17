
import { findMessage } from "@/app/actions/findMessage"
import { MessageCard } from "@/components/mensageCard"
import { redirect } from "next/navigation"


export default async function Component({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const mensagem = await findMessage(id)

  if (mensagem instanceof Error) return redirect('/not-found')

  return (
    <MessageCard message={mensagem} />
  )
}