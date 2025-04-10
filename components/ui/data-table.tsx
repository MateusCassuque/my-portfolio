'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  getFilteredRowModel,
  ColumnResizeMode,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { Input } from './input'
import { Button } from './button'
import { ArrowUpDown } from 'lucide-react'
import DataTableViewOptions from './data-table-view-options'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  emptyMessage?: string
  className?: string
  sorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  columnVisibility?: VisibilityState
  onColumnVisibilityChange?: (visibility: VisibilityState) => void
  columnFilters?: ColumnFiltersState
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  emptyMessage = 'Nenhum dado encontrado',
  className,
  sorting: initialSorting = [],
  onSortingChange,
  columnVisibility: initialColumnVisibility = {},
  onColumnVisibilityChange,
  columnFilters: initialColumnFilters = [],
  onColumnFiltersChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(initialColumnFilters)
  const [columnResizeMode] = useState<ColumnResizeMode>('onChange')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updater) => {
      const newSorting = typeof updater === 'function' ? updater(sorting) : updater
      setSorting(newSorting)
      onSortingChange?.(newSorting)
    },
    onColumnVisibilityChange: (updater) => {
      const newVisibility = typeof updater === 'function' ? updater(columnVisibility) : updater
      setColumnVisibility(newVisibility)
      onColumnVisibilityChange?.(newVisibility)
    },
    onColumnFiltersChange: (updater) => {
      const newFilters = typeof updater === 'function' ? updater(columnFilters) : updater
      setColumnFilters(newFilters)
      onColumnFiltersChange?.(newFilters)
    },
    state: {
      sorting,
      columnVisibility,
      columnFilters,
    },
    columnResizeMode,
  })

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filtrar..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />,
                            desc: <ArrowUpDown className="ml-2 h-4 w-4" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}