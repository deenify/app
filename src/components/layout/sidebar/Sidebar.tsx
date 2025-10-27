"use client"
import { Button } from '@/components/ui/button';
import { MenuLinks } from '@/config/links';
import { cn } from '@/lib/utils';
import { BookOpen, ChevronLeft, Moon, Sun, X } from 'lucide-react';

interface SidebarProptype {
    isSidbarExpanded: boolean
    setIsSidbarExpanded: (v: boolean) => void;
    className?: string;
    currentPage: string
}

const Sidebar: React.FC<SidebarProptype> = ({ isSidbarExpanded, setIsSidbarExpanded, className, currentPage }) => {

    return (
        <>
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transform transition-all duration-300 ease-in-out w-[250px]",
                // mobile-version-condition ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
                className
            )}>
                <div className="flex flex-col h-full relative">
                    <main className='relative flex items-center h-[70px] px-6 border-b border-gray-200'>
                        <button
                            onClick={() => setIsSidbarExpanded(!isSidbarExpanded)}
                            className="hidden lg:flex absolute right-0 bottom-0 w-6 h-6 border rounded-full items-center hover:scale-110 ease duration-200
                            justify-center bg-white hover:bg-emerald-50 hover:border-emerald-300 z-10 shadow-sm translate-y-1/2 translate-x-1/2"
                            aria-label={isSidbarExpanded ? "Expand sidebar" : "Collapse sidebar"}
                        >
                            <ChevronLeft className={cn(
                                "h-4 w-4 text-gray-600 transition-transform duration-300",
                                isSidbarExpanded && "rotate-180"
                            )} />
                        </button>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-emerald-900 text-base font-heading">Deenify App</h2>
                                <p className="text-xs text-gray-500 font-heading">Stay Connected</p>
                            </div>
                        </div>
                    </main>

                    <header className='py-4 px-3 flex-1 overflow-y-auto scrollbar-thin'>
                        <nav className='w-full h-max'>
                            <ul className="flex flex-col gap-2">
                                {MenuLinks.map((item, i) => {
                                    const Icon = item.icon;
                                    const isActive = currentPage === item.href;
                                    return (
                                        <li key={i} className={cn(
                                            'w-full h-max rounded-lg  overflow-hidden border border-transparent ease duration-300',
                                            isActive && "border-primary-300"
                                        )}>
                                            <Button
                                                href={item.href}
                                                variant='faded'
                                                className={cn(
                                                    "w-full justify-start items-center transition-colors",
                                                    isActive
                                                        ? "bg-primary-50 hover:bg-primary-50 text-primary-900"
                                                        : "text-gray-700 hover:bg-gray-100 bg-transparent"
                                                )}
                                                rippleClassName='bg-primary-200'
                                                rippleGoesFast
                                            >
                                                <Icon size={18} className={cn("leading-none", isActive ? "text-emerald-600" : "text-gray-500")} />
                                                <span className='font-heading text-xs font-normal leading-none'>{item.label}</span>
                                            </Button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </header>

                    <main className='py-4 px-3 border-t border-gray-200 flex flex-col gap-3'>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                        >
                            {true ? (
                                <>
                                    <Moon className="h-4 w-4" />
                                    <span>Dark Mode</span>
                                </>
                            ) : (
                                <>
                                    <Sun className="h-4 w-4" />
                                    <span>Light Mode</span>
                                </>
                            )}
                        </Button>

                        <div className="p-3 bg-emerald-50 rounded-lg">
                            <p className="text-xs text-emerald-800 text-center">
                                "Verily, in the remembrance of Allah do hearts find rest."
                            </p>
                            <p className="text-xs text-emerald-600 text-center mt-1">- Quran 13:28</p>
                        </div>
                    </main>
                </div>
            </aside >
            {/* {isSidbarExpanded && (<div className="fixed inset-0 bg-black/50 z-40 lg:hidden" />)} */}
        </>
    )
}


export default Sidebar