import Header from '@/components/layout/header/Header'
import React from 'react'

interface AuthLayoutShellProps {
    children: React.ReactNode
}

const AuthLayoutShell = ({ children }: AuthLayoutShellProps) => {
    return (
        <div className='w-full h-dvh overflow-hidden flex flex-col'>
            <Header />
            <div className='flex flex-col flex-1 overflow-y-auto scrollbar-content'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayoutShell