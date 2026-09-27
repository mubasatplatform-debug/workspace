'use client'

import { Loader2Icon } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'
import { useAvailableModels } from './use-available-models'
import { useModelId } from './use-settings'

export function ModelSelector({ className }: { className?: string }) {
  const [modelId, setModelId] = useModelId()
  const { models: available, isLoading, error } = useAvailableModels()
  const models = useMemo(
    () => available?.sort((a, b) => a.label.localeCompare(b.label)) || [],
    [available]
  )

  return (
    <Select
      value={modelId}
      onValueChange={setModelId}
      disabled={isLoading || !!error || !models?.length}
    >
      <SelectTrigger className={cn('bg-background', className)}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2Icon className="h-4 w-4 animate-spin" />
          </div>
        ) : error ? (
          <span className="text-red-500">خطأ</span>
        ) : !models?.length ? (
          <span>لا توجد نماذج</span>
        ) : (
          <SelectValue placeholder="اختر النموذج" />
        )}
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>النماذج</SelectLabel>
          {models.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
