import { ToggleWelcome } from '@/components/modals/welcome'
import { SparklesIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export async function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center gap-2 ms-1 md:ms-2.5">
        <SparklesIcon className="w-5 h-5" />
        <span className="text-base font-bold tracking-tight">مبسّط</span>
        <span className="hidden md:inline text-sm text-muted-foreground">
          ابنِ تطبيقك بالكلام
        </span>
      </div>
      <div className="flex items-center ms-auto gap-1.5">
        <ToggleWelcome />
      </div>
    </header>
  )
}
