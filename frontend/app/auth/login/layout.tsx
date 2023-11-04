import Loading from '@/components/Loading'
import LoginFormProvider from '@/context/login-form'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Task Effect | Login",
  description: "Login to your task effect account",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <LoginFormProvider>
        {children}
      </LoginFormProvider>
      <Loading />
    </div>
  )
}
