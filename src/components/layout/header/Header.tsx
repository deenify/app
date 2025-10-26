import { Button } from '@/components/ui/button';
import { Menu, Bell, Search, Globe, ChevronDown } from 'lucide-react';
// import { Avatar, AvatarFallback } from './ui/avatar';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from './ui/dropdown-menu';

interface HeaderProps {
    userPreferences?: any;
    onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userPreferences, onToggleSidebar }) => {
    const getGreeting = (username?: string) => {
        const hour = new Date().getHours();
        if (hour < 12) return `Good Morning, ${username ?? 'User'}`;
        if (hour < 18) return `Good Afternoon, ${username ?? 'User'}`;
        return `Good Evening, ${username ?? 'User'}`;
    };

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
        { code: 'ur', name: 'اردو', flag: '🇵🇰' },
        { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
        { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
        { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
    ];

    return (
        <header className='relative w-full'>
            <div className='absolute inset-0 w-full h-[70px] border-b border-gray-200'>
                <main className='flex items-center justify-between container-lg w-full h-full'>
                    <div className='h-max min-w-0'>
                        <h1 className="text-gray-900 text-base font-normal">{getGreeting(userPreferences?.name)}</h1>
                        <p className="text-gray-500 text-sm font-normal truncate font-heading">Assalamu Alaikum wa Rahmatullahi wa Barakatuh</p>
                    </div>

                    <div className='bg-red-400'>
                        <Search className=" left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />

                    </div>
                </main>
            </div>
        </header>
    )

    return (
        <header className="bg-white border-b border-gray-200 px-6 h-[70px] flex items-center">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleSidebar}
                        className="lg:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-gray-900">{getGreeting()}, {userPreferences?.name || 'User'}</h1>
                        <p className="text-sm text-gray-500">Assalamu Alaikum wa Rahmatullahi wa Barakatuh</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        {/* <Input
                            placeholder="Search..."
                            className="pl-10 w-64"
                        /> */}
                    </div>

                    {/* Language Selector */}
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Globe className="h-5 w-5 text-gray-600" />
                                <span className="hidden sm:inline text-gray-600">EN</span>
                                <ChevronDown className="h-4 w-4 text-gray-600" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            {languages.map((lang) => (
                                <DropdownMenuItem key={lang.code} className="cursor-pointer">
                                    <span className="mr-2">{lang.flag}</span>
                                    <span>{lang.name}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu> */}

                    <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-5 w-5 text-gray-600" />
                        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    </Button>

                    {/* <Avatar>
                        <AvatarFallback className="bg-emerald-600 text-white">
                            {userPreferences?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar> */}
                </div>
            </div>
        </header>
    );
}

export default Header