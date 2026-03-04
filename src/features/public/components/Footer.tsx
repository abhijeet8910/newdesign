import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer id="contact" className="py-16 transition-colors"
            style={{
                backgroundColor: 'var(--color-sidebar-bg)',
                color: 'var(--color-sidebar-text)',
            }}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-sidebar-active)' }}>
                                <span className="font-black text-sm text-white">A</span>
                            </div>
                            <span className="text-xl font-black tracking-tight text-white">ASWAMITHRA</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm font-medium" style={{ opacity: 0.7 }}>
                            Empowering farmers and businesses with a transparent, direct marketplace for agricultural produce.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-black uppercase tracking-wider text-xs mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { label: 'About Us', href: '#aboutus' },
                                { label: 'Features', href: '#features' },
                                { label: 'Login', to: '/login' },
                                { label: 'Register', to: '/register' },
                            ].map(item => (
                                <li key={item.label}>
                                    {item.to ? (
                                        <Link to={item.to} className="text-sm font-semibold hover:text-white transition-colors">{item.label}</Link>
                                    ) : (
                                        <a href={item.href} className="text-sm font-semibold hover:text-white transition-colors">{item.label}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-black uppercase tracking-wider text-xs mb-4 text-white">Contact</h3>
                        <ul className="space-y-3 text-sm font-medium">
                            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 shrink-0" /> Hyderabad, India</li>
                            <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> +91 9876543210</li>
                            <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> hello@aswamithra.com</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 text-center text-xs font-bold" style={{ borderTop: '1px solid var(--color-border-subtle)', opacity: 0.5 }}>
                    © {new Date().getFullYear()} ASWAMITHRA. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
