"use client"
import React, { ReactNode, useState } from 'react'
import { Sidebar } from './sidebar/Sidebar'
import Footer from './footer/Footer'
import Header from './header/Header'
import { cn } from '@/lib/utils'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface LayoutWrapperProptype { readonly children: ReactNode }

const LayoutWrapper = ({ children }: LayoutWrapperProptype) => { 
    const [sidebarExpanded, setSidebarExpanded] = useState(false)
    const [isLocked, setIsLocked] = useState(false)

    const isMobile = useBreakpoint('lg', 'down')

    return (
        <div className='flex w-dvh h-dvh'>
            <Sidebar 
                isMobile={isMobile}
                isLocked={isLocked}
                setIsLocked={setIsLocked}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
            />

            <div
                className={cn("flex flex-col flex-1 overflow-hidden ease duration-300",
                    !isMobile ? !isLocked ? "pl-[76px]" : "pl-[280px]" : null,
                    isMobile && "pl-[76px]",
                )}
            >
                <Header
                    onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)}
                />
                <div className='flex-1 overflow-y-auto scrollbar-content'>
                    <div className='h-[2000px]'>
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default LayoutWrapper