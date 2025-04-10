'use client'

import { Message } from '@prisma/client'
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/react-table'
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Check, Mail, Search, Trash2, Filter, ChevronDown } from 'lucide-react'
import { Button } from './ui/button'
import { markMessageAsRead, deleteMessage } from '@/app/actions/message'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DateRange } from 'react-day-picker'
import { Calendar } from './ui/calendar'
import { useState } from 'react'
import { Badge } from './ui/badge'
import DataTable from './ui/data-table'

type MessageColumnFilter = {
  id: 'search' | 'read'
  value: string | boolean
}

const columns: ColumnDef<Message>[] = [
  {
    accessorKey: 'name',
    header: 'Remetente',
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Mail className="h-4 w-4 text-muted-foreground" />
        <span>{row.getValue('name')}</span>
      </div>
    )
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
    cell: ({ row }) => (
      <a
        href={`mailto:${row.getValue('email')}`}
        className="text-primary hover:underline"
      >
        {row.getValue('email')}
      </a>
    )
  },
  {
    accessorKey: 'content',
    header: 'Mensagem',
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-[300px]">
        {row.getValue('content')}
      </div>
    )
  },
  {
    accessorKey: 'createdAt',
    header: 'Data',
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {format(new Date(row.getValue('createdAt')), 'PPp', { locale: ptBR })}
      </span>
    )
  },
  {
    accessorKey: 'read',
    header: 'Status',
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-full text-xs ${row.getValue('read') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
        {row.getValue('read') ? 'Lida' : 'Não lida'}
      </span>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const message = row.original
      const router = useRouter()

      const handleRead = async () => {
        try {
          await markMessageAsRead(message.id)
          toast.success('Mensagem marcada como lida')
          router.refresh()
        } catch (error) {
          toast.error('Erro ao marcar mensagem')
        }
      }

      const handleDelete = async () => {
        try {
          await deleteMessage(message.id)
          toast.success('Mensagem excluída')
          router.refresh()
        } catch (error) {
          toast.error('Erro ao excluir mensagem')
        }
      }

      return (
        <div className="flex gap-2">
          {!message.read && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRead}
              title="Marcar como lida"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            title="Excluir mensagem"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      )
    }
  }
]

interface MessageTableProps {
  messages: Message[]
}

export default function MessageTable({ messages }: MessageTableProps) {
  const router = useRouter()
  const [columnFilters, setColumnFilters] = useState<MessageColumnFilter[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 7),
    to: new Date(),
  })

  const handleStatusFilter = (value: string) => {
    setColumnFilters(prev => 
      prev.filter(f => f.id !== 'read').concat(
        value === 'all' ? [] : { id: 'read', value: value === 'read' }
      )
    )
  }

  const handleSearch = (term: string) => {
    setColumnFilters(prev =>
      prev.filter(f => f.id !== 'search').concat(
        term ? { id: 'search', value: term } : []
      )
    )
  }

  const filteredMessages = messages.filter(message => {
    // Filtro por status
    const statusFilter = columnFilters.find(f => f.id === 'read')
    if (statusFilter && message.read !== statusFilter.value) {
      return false
    }

    // Filtro por período
    if (dateRange?.from || dateRange?.to) {
      const messageDate = new Date(message.createdAt)
      if (dateRange.from && messageDate < dateRange.from) return false
      if (dateRange.to && messageDate > dateRange.to) return false
    }

    // Filtro por pesquisa
    const searchFilter = columnFilters.find(f => f.id === 'search')
    if (searchFilter && typeof searchFilter.value === 'string') {
      const term = searchFilter.value.toLowerCase()
      if (
        !message.name.toLowerCase().includes(term) &&
        !message.email.toLowerCase().includes(term) &&
        !message.content.toLowerCase().includes(term)
      ) {
        return false
      }
    }

    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar mensagens..."
            className="pl-10 w-full md:w-[300px]"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                Período
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
                defaultMonth={dateRange?.from}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>

          <Select onValueChange={handleStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {/* Alteração importante aqui - adicione value="all" para o item "Todos" */}
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="read">Lidas</SelectItem>
              <SelectItem value="unread">Não lidas</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {dateRange?.from && (
          <Badge variant="outline" className="flex items-center gap-1">
            Período: {format(dateRange.from, 'dd/MM/yyyy')}
            {dateRange.to && ` - ${format(dateRange.to, 'dd/MM/yyyy')}`}
          </Badge>
        )}

        {columnFilters.find(f => f.id === 'read')?.value === true && (
          <Badge variant="outline" className="flex items-center gap-1">
            Status: Lidas
          </Badge>
        )}

        {columnFilters.find(f => f.id === 'read')?.value === false && (
          <Badge variant="outline" className="flex items-center gap-1">
            Status: Não lidas
          </Badge>
        )}

        {columnFilters.some(f => f.id === 'search') && (
          <Badge variant="outline" className="flex items-center gap-1">
            Pesquisa: {(columnFilters.find(f => f.id === 'search')?.value as string) || ''}
          </Badge>
        )}
      </div>

      <DataTable
        columns={columns}
        data={filteredMessages}
        emptyMessage="Nenhuma mensagem encontrada"
        className="border rounded-lg overflow-hidden"
        sorting={sorting}
        onSortingChange={setSorting}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />

      <div className="text-sm text-muted-foreground text-center">
        Mostrando {filteredMessages.length} de {messages.length} mensagens
      </div>
    </div>
  )
}