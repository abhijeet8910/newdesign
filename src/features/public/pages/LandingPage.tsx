import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { ValuePropositionSection } from '../components/ValuePropositionSection';
import { Footer } from '../components/Footer';

export const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col w-full transition-colors duration-300"
            style={{ backgroundColor: 'var(--color-bg-primary)' }}>
            <Navbar />

            <main className="flex-grow">
                <HeroSection />
                <ValuePropositionSection />
                <HowItWorksSection />
                <AboutSection />
            </main>

            <Footer />
        </div>
    );
};
