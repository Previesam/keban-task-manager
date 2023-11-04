import Loading from '@/components/Loading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Task Effect | Register',
  description: 'Get started with task effect',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
      <Loading />
    </div>
  )
}
