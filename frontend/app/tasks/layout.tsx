import type { Metadata } from 'next'
import SideNav from '@/components/SideNav'
import TopBar from '@/components/TopBar'
import Loading from '@/components/Loading'

export const metadata: Metadata = {
  title: 'Task Effect | Tasks',
  description: 'Manage your task with ease',
}

export default function TaskLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-nowrap w-full h-screen overflow-y-auto">
      <SideNav />
      <div className='w-full h-screen overflow-y-auto bg-white dark:bg-gray-800 flex flex-col'>
        <TopBar />
        <div className='w-full px-[16px] py-[28px] bg-white'>
          {children}
          <Loading />
        </div>
      </div>
    </div>
  )
}