"use client"

import { cn } from '@/lib/utils/clsx'
import React, { useEffect, useState } from 'react'
import { ReactNode } from 'react'

interface LayoutWrapperProptype {
    readonly children: ReactNode
}


const LayoutWrapper = ({ children }: LayoutWrapperProptype) => {

    useEffect(() => {
        // 🔹 Surgical fix for mobile keyboard viewport offset bug.
        // When an input in a fixed-height container is focused, mobile browsers often 
        // scroll the window itself. We must reset this scroll on blur and mount. 

        const handleResetScroll = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            setTimeout(() => handleResetScroll(), 100);
        };

        document.addEventListener('focusout', handleResetScroll);
        document.addEventListener('blur', handleResetScroll);
        document.addEventListener('scroll', handleResetScroll);
        document.addEventListener('resize', handleResetScroll);
        document.addEventListener('touchstart', handleResetScroll);

        return () => {
            document.removeEventListener('focusout', handleResetScroll);
            document.removeEventListener('blur', handleResetScroll);
            document.removeEventListener('scroll', handleResetScroll);
            document.removeEventListener('resize', handleResetScroll);
            document.removeEventListener('touchstart', handleResetScroll);
        }
    }, []);

    return (
        <div className={cn('w-dvh h-dvh overflow-hidden flex')}>
            <div className='flex flex-col flex-1 overflow-y-auto scrollbar-content'>
                {children}
            </div>
        </div>
    )
}

export default LayoutWrapper