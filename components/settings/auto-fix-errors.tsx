import { useFixErrors } from '@/components/settings/use-settings'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export function AutoFixErrors() {
  const [fixErrors, setFixErrors] = useFixErrors()
  return (
    <div
      className="flex items-center justify-between cursor-pointer hover:bg-accent/50 rounded p-2 -m-2"
      onClick={() => setFixErrors(!fixErrors)}
    >
      <div className="space-y-1 flex-1 pointer-events-none">
        <Label className="text-sm text-foreground" htmlFor="auto-fix">
          إصلاح الأخطاء تلقائيًا
        </Label>
        <p className="text-sm text-muted-foreground leading-relaxed">
          يكتشف الأخطاء في الكود الناتج ويصلحها تلقائيًا.
        </p>
      </div>
      <Checkbox
        id="auto-fix"
        className="ms-3 pointer-events-none"
        checked={fixErrors}
        onCheckedChange={(checked) =>
          setFixErrors(checked === 'indeterminate' ? false : checked)
        }
      />
    </div>
  )
}
