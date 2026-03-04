import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col w-full transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <Navbar />

            <main className="flex-grow">
                <HeroSection />
                <AboutSection />

                <section id="features" className="py-24 text-center rounded-[40px] -mt-6 relative z-10 transition-colors"
                    style={{
                        backgroundColor: 'var(--color-bg-card)',
                        borderTop: '1px solid var(--color-border-subtle)',
                        boxShadow: 'var(--shadow-card)',
                    }}>
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl font-black mb-6 tracking-wide" style={{ color: 'var(--color-accent)' }}>More Features Coming Soon</h2>
                        <p className="text-lg font-medium" style={{ color: 'var(--color-text-secondary)' }}>We are continuously building out our module set to support Farm Management, Analytics, and integrated Logistics tracking.</p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};
