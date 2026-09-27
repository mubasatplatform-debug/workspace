import type { DataPart } from '@/ai/messages/data-parts'
import { CheckIcon, SquareChevronRightIcon, XIcon } from 'lucide-react'
import { Spinner } from './spinner'
import { ToolHeader } from '../tool-header'
import { ToolMessage } from '../tool-message'
import { Streamdown } from 'streamdown'

export function RunCommand({ message }: { message: DataPart['run-command'] }) {
  return (
    <ToolMessage>
      <ToolHeader>
        <SquareChevronRightIcon className="w-3.5 h-3.5" />
        {message.status === 'executing' && 'جارٍ التنفيذ'}
        {message.status === 'waiting' && 'بالانتظار'}
        {message.status === 'running' && 'يعمل في الخلفية'}
        {message.status === 'done' && message.exitCode !== 1 && 'اكتمل'}
        {message.status === 'done' && message.exitCode === 1 && 'فشل'}
        {message.status === 'error' && 'فشل'}
      </ToolHeader>
      <div className="relative ps-6">
        <Spinner
          className="absolute start-0 top-0"
          loading={['executing', 'waiting'].includes(message.status)}
        >
          {(message.exitCode && message.exitCode > 0) ||
          message.status === 'error' ? (
            <XIcon className="w-4 h-4 text-red-700" />
          ) : (
            <CheckIcon className="w-4 h-4" />
          )}
        </Spinner>
        <div dir="ltr">
          <Streamdown>{`\`${message.command} ${message.args.join(
            ' '
          )}\``}</Streamdown>
        </div>
      </div>
    </ToolMessage>
  )
}
