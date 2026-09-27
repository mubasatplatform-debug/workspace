import { ACCESS_COOKIE, hasConfiguredCodes, tokenForCode } from '@/lib/access'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SparklesIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ms from 'ms'

async function enter(formData: FormData) {
  'use server'

  const code = String(formData.get('code') ?? '').trim()
  const token = await tokenForCode(code)
  if (!token) {
    redirect('/access?error=1')
  }

  const store = await cookies()
  store.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: new Date(Date.now() + ms('30d')),
    path: '/',
  })
  redirect('/')
}

export default async function AccessPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams
  const configured = hasConfiguredCodes()

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form
        action={enter}
        className="w-full max-w-sm space-y-5 rounded-lg border border-border bg-background p-6 shadow"
      >
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-5 h-5" />
          <h1 className="text-xl font-bold">مبسّط</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          المنصة في مرحلة تجريبية مغلقة. أدخل رمز الدعوة للمتابعة.
        </p>
        {!configured && (
          <p className="text-sm text-red-600">
            لم تُضبط رموز الدعوة بعد. أضف المتغير ACCESS_CODES في إعدادات
            المشروع.
          </p>
        )}
        <div className="space-y-2">
          <Label htmlFor="code">رمز الدعوة</Label>
          <Input
            id="code"
            name="code"
            dir="ltr"
            autoComplete="off"
            required
            aria-invalid={error ? true : undefined}
          />
          {error && (
            <p className="text-sm text-red-600">
              الرمز غير صحيح. تأكد منه وحاول مرة ثانية.
            </p>
          )}
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          دخول
        </Button>
      </form>
    </main>
  )
}
