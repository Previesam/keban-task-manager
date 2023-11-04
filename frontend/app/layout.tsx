"use client"

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.scss'
import AuthGuard from '@/middlewares/auth-guard'
import NotificationProvider from '@/context/notification-context'
import Snackbar from '@/components/Snackbar'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//     title: 'Task Effect',
//     description: 'Manage your task in style',
// }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <head>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
            <body className={inter.className}>
                <NotificationProvider>
                    <Snackbar />
                    <AuthGuard>
                        {children}
                    </AuthGuard>
                </NotificationProvider>
            </body>
        </html>
    )
}