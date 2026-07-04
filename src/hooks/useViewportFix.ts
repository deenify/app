"use client"

import { RefObject, useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 🔹 Surgical fix for mobile keyboard viewport offset bug.
 * When an input in a fixed-height container is focused, mobile browsers often 
 * scroll the window itself. This hook resets this scroll on various events.
 */
export const useViewportFix = () => {
    useEffect(() => {
        const handleResetScroll = () => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            // Note: This setTimeout creates a recurring reset. 
            // Keeping it as per the original implementation in LayoutWrapper.
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
        };
    }, []);
};


// Reset scroll when route changes
export const useScrollReset = (scrollRef?: RefObject<HTMLElement | null>) => {
    const pathname = usePathname()

    useLayoutEffect(() => {
        const resetScroll = () => {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" })
            if (scrollRef?.current) scrollRef.current.scrollTo({ top: 0, left: 0, behavior: "instant" })
        }

        resetScroll()

    }, [pathname, scrollRef]);
};