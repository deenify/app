"use client"
import React, { ReactNode, useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import Footer from './footer/Footer'
import { usePathname } from 'next/navigation'
import Header from './header/Header'

interface LayoutWrapperProptype { readonly children: ReactNode }

const LayoutWrapper = ({ children }: LayoutWrapperProptype) => {
    const [isSidbarExpanded, setIsSidbarExpanded] = useState(false)
    const pathName = usePathname()

    return (
        <div className='flex w-dvh h-dvh'>
            <Sidebar
                isSidbarExpanded={isSidbarExpanded}
                setIsSidbarExpanded={setIsSidbarExpanded}
                currentPage={pathName}
            />
            <div className='flex-1 overflow-x-hidden overflow-y-auto scrollbar-thin pl-[250px]'>
                <Header />
                <div className='pt-[70px]'>
                    <>{children}</>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default LayoutWrapper