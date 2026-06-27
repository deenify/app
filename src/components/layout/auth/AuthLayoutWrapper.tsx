"use client"

import React, { useRef } from 'react'
import { ReactNode } from 'react'
import AuthHeader from './header/AuthHeader'
import { ScrollContainerProvider } from '@/context/ScrollContainerContext'

interface AuthLayoutWrapperProps {
    readonly children: ReactNode
}


const AuthLayoutWrapper = ({ children }: AuthLayoutWrapperProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    return (
        <ScrollContainerProvider containerRef={scrollRef} >
            <div
                id='auth-layout-wrapper-scroll-container'
                className='flex-1 overflow-y-auto scrollbar-thin flex flex-col'
                ref={scrollRef}
            >
                <div className='sticky inset-0 bottom-auto z-50'>
                    <AuthHeader />
                </div>
                <main className='flex-1 flex flex-col items-center justify-center'>
                    {children}
                </main>
            </div>
        </ScrollContainerProvider>
    )
}

export default AuthLayoutWrapper