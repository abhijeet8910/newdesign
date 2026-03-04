import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Bell, Search, UserCircle, Menu } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';

export const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen font-['Outfit',_sans-serif] transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="lg:pl-64 flex flex-col min-h-screen">
                <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 px-4 sm:px-6 lg:px-8 shadow-sm backdrop-blur-md transition-colors duration-300"
                    style={{
                        backgroundColor: 'var(--color-header-bg)',
                        borderBottom: '1px solid var(--color-border-subtle)',
                    }}>

                    <div className="flex flex-1 items-center gap-x-4">
                        <button
                            type="button"
                            className="lg:hidden -m-2.5 p-2.5 transition-colors"
                            style={{ color: 'var(--color-text-primary)' }}
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>

                        <div className="relative w-full max-w-md hidden sm:block">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5" style={{ color: 'var(--color-text-secondary)' }} />
                            </span>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="block w-full rounded-2xl py-2.5 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 transition-colors duration-200"
                                style={{
                                    backgroundColor: 'var(--color-input-bg)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-x-3 lg:gap-x-5">
                        <ThemeToggle />

                        <button type="button" className="p-2 rounded-xl transition-colors hover:opacity-80"
                            style={{ color: 'var(--color-text-primary)' }}>
                            <span className="sr-only">View notifications</span>
                            <Bell className="h-5 w-5" aria-hidden="true" />
                        </button>

                        <div className="hidden lg:block lg:h-6 lg:w-px" style={{ backgroundColor: 'var(--color-border)' }} aria-hidden="true" />

                        <button className="flex items-center p-1.5 rounded-xl transition-colors hover:opacity-80"
                            style={{ color: 'var(--color-text-primary)' }}>
                            <UserCircle className="h-8 w-8" />
                            <span className="hidden lg:flex lg:items-center ml-2 text-sm font-semibold">
                                Profile
                            </span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </main>

                <footer className="py-4 px-6 text-center text-xs font-medium transition-colors"
                    style={{ color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border-subtle)' }}>
                    © {new Date().getFullYear()} ASWAMITHRA Platform
                </footer>
            </div>
        </div>
    );
};
