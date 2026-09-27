import type { DataPart } from '@/ai/messages/data-parts'
import { BoxIcon, CheckIcon, XIcon } from 'lucide-react'
import { Spinner } from './spinner'
import { ToolHeader } from '../tool-header'
import { ToolMessage } from '../tool-message'

interface Props {
  message: DataPart['create-sandbox']
}

export function CreateSandbox({ message }: Props) {
  return (
    <ToolMessage>
      <ToolHeader>
        <BoxIcon className="w-3.5 h-3.5" />
        تجهيز بيئة التشغيل
      </ToolHeader>
      <div className="relative ps-6 min-h-5">
        <Spinner
          className="absolute start-0 top-0"
          loading={message.status === 'loading'}
        >
          {message.status === 'error' ? (
            <XIcon className="w-4 h-4 text-red-700" />
          ) : (
            <CheckIcon className="w-4 h-4" />
          )}
        </Spinner>
        <span>
          {message.status === 'done' && 'تم تجهيز بيئة التشغيل'}
          {message.status === 'loading' && 'جارٍ تجهيز بيئة التشغيل'}
          {message.status === 'error' && 'تعذّر تجهيز بيئة التشغيل'}
        </span>
      </div>
    </ToolMessage>
  )
}
