'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils/clsx';
import { sidebarSections } from './content';
import Logo from '@/components/shared/Logo';

interface SidebarPropTypes {
    isLocked: boolean;
    sidebarExpanded: boolean,
    setSidebarExpanded: (v: boolean) => void
    setIsLocked: (v: boolean) => void;
    isMobile: boolean;
}

const Sidebar = (
    {
        sidebarExpanded,
        setSidebarExpanded,
        isLocked,
        setIsLocked,
        isMobile,
    }: SidebarPropTypes
) => {
    const pathname = usePathname();
    const [showScrollbar, setShowScrollbar] = useState(false);

    // Show scrollbar after expansion transition
    useEffect(() => {
        if (sidebarExpanded) {
            const timer = setTimeout(() => setShowScrollbar(true), 180);
            return () => clearTimeout(timer);
        } else {
            setShowScrollbar(false);
        }
    }, [sidebarExpanded]);


    return (
        <>
            <aside
                onMouseEnter={() => {
                    if (!isLocked && !isMobile) setSidebarExpanded(true);
                }}
                onMouseLeave={() => {
                    if (!isLocked && !isMobile) setSidebarExpanded(false);
                }}
                className={cn(
                    "bg-white border-r border-layout-separator flex flex-col fixed left-0 top-0 h-full min-h-dvh z-[51]",
                    isMobile
                        ? "w-[280px] transition-transform duration-300 ease-in-out will-change-transform hidden"
                        : "transition-[width] duration-300 ease-in-out will-change-[width]",
                    isMobile
                        ? sidebarExpanded
                            ? "translate-x-0"
                            : "-translate-x-[calc(100%+20px)]"
                        : sidebarExpanded
                            ? "2xl:w-[280px] w-[250px]"
                            : "w-[76px]",
                )}>

                {/* Header - Logo */}
                <header className="border-b border-layout-separator flex items-center px-4 h-[73px] w-full justify-center relative">
                    {/* Logo and Title */}
                    <Logo
                        title='Deenify'
                        subtitle='Islamic Companion'
                        href='/'
                        isContentAncored={true}
                        className='w-full h-full'
                    />

                    {/* Collapse/Expand Toggler */}
                    <button
                        onClick={() => {
                            if (!isLocked) {
                                setIsLocked(true);
                                setSidebarExpanded(true);
                            } else {
                                setIsLocked(false);
                                setSidebarExpanded(false);
                            }
                        }}
                        className="absolute right-0 bottom-0 w-6 h-6 bg-white border border-layout-separator rounded-full flex items-center 
                        justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 z-[60] shadow-md cursor-pointer 
                        translate-x-1/2 translate-y-1/2"
                        aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        <ChevronLeft className={cn(
                            "h-4 w-4 text-gray-600 transition-transform duration-300 rotate-180",
                            isLocked && !isMobile && "rotate-0",
                            isMobile && sidebarExpanded && "rotate-0"
                        )} />
                    </button>
                </header>

                {/* Navigation container */}
                <main className='w-full overflow-hidden flex flex-col flex-1'>
                    {/* Navigation */}
                    <nav className="flex-1 overflow-hidden flex py-4">
                        <div className={cn(
                            'overflow-y-auto flex-1 pl-3 pr-0',
                            sidebarExpanded && showScrollbar
                                ? "scrollbar-thin"
                                : "scrollbar-hide"
                        )}>
                            {sidebarSections.map((section, idx) => (
                                <div key={idx} className={cn(
                                    idx !== sidebarSections.length - 1 && "mb-8"
                                )}>
                                    {/* Section Title */}
                                    <div className={cn(
                                        "overflow-hidden whitespace-nowrap mb-3 px-3 transition-opacity duration-300",
                                        sidebarExpanded ? "opacity-100" : "opacity-0"
                                    )}>
                                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                            {section.title}
                                        </h3>
                                    </div>

                                    {/* Section Links */}
                                    <div className="space-y-0.5 pr-3">
                                        {section.items.map((item, idxx) => {
                                            const Icon = item.icon;
                                            const isActive =
                                                item.href === "/"
                                                    ? pathname === "/"
                                                    : pathname.startsWith(item.href);

                                            return (
                                                <Link
                                                    key={idxx}
                                                    href={item.href}
                                                    className={cn(
                                                        "w-full flex items-center rounded-lg transition-colors duration-150 group relative truncate",
                                                        "px-[15px] py-3 font-medium border border-transparent",
                                                        isActive
                                                            ? sidebarExpanded
                                                                ? "bg-emerald-50 text-emerald-900 justify-start border-emerald-200"
                                                                : "bg-emerald-50 text-emerald-600 border-transparent"
                                                            : "text-gray-700 hover:bg-gray-50"
                                                    )}
                                                    onClick={() => {
                                                        if (isMobile) {
                                                            setSidebarExpanded(false);
                                                        }
                                                    }}
                                                >
                                                    <Icon className={cn(
                                                        "flex-shrink-0 h-5 w-5",
                                                        isActive
                                                            ? "text-emerald-600"
                                                            : "text-gray-500 group-hover:text-emerald-600",
                                                    )} />
                                                    <span className={cn(
                                                        "whitespace-nowrap text-sm overflow-hidden truncate pl-3",
                                                    )}>
                                                        {item.label}
                                                    </span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </nav>

                    {/* Footer */}
                    <div className={cn(
                        "border-t border-layout-separator flex-shrink-0 h-[120px]",
                        sidebarExpanded ? "p-4" : "px-2 py-4"
                    )}>
                        {sidebarExpanded ? (
                            <div className="bg-emerald-50 rounded-lg border border-emerald-100 w-full h-full p-3 flex flex-col justify-center">
                                <p className="text-xs text-emerald-800 text-center leading-relaxed line-clamp-2">
                                    "Verily, in the remembrance of Allah do hearts find rest."
                                </p>
                                <p className="text-xs text-emerald-600 text-center mt-1.5">- Quran 13:28</p>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col justify-center items-center gap-3">
                                <div className="w-12 h-12 bg-emerald-50 rounded-lg border border-emerald-100 flex items-center justify-center group cursor-pointer transition-all duration-200 hover:bg-emerald-100 hover:border-emerald-200 hover:scale-105" title="Quran 13:28">
                                    <BookOpen className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div className="flex flex-col items-center gap-1 opacity-60">
                                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                                    <div className="w-1 h-1 rounded-full bg-emerald-300" />
                                    <div className="w-1 h-1 rounded-full bg-emerald-200" />
                                </div>
                            </div>
                        )}
                    </div>
                </main>

            </aside>
        </>
    )
}

export default Sidebar;