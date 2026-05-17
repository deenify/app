"use client"

import React from 'react'
import { ReactNode } from 'react'
import AuthHeader from './header/AuthHeader'

interface AuthLayoutWrapperProps {
    readonly children: ReactNode
}


const AuthLayoutWrapper = ({ children }: AuthLayoutWrapperProps) => {
    return (
        <div className='w-full h-dvh overflow-hidden flex flex-col'>
            <AuthHeader />
            <div className='flex flex-col flex-1 overflow-y-auto scrollbar-content'>
                {children}
            </div>
        </div>
    )
}

export default AuthLayoutWrapper