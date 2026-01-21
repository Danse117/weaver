import { Hero } from '@/app/(public)/components/home/Hero';
import { Features } from './components/home/Features';
import { FaqsSection } from './components/home/FAQSection';
import { UnsureSection } from './components/home/Unsure';
import { TeamsSection } from './components/home/Teams';
import { WaitlistSection } from './components/home/Waitlist';
import { AnimatedBackground } from './components/home/AnimatedBackground';

export default function Home() {
	return (
		<>
			<AnimatedBackground />
			<Hero />
			<Features />
      		<TeamsSection />
      		<WaitlistSection />
      		<UnsureSection />
      		<FaqsSection />
		</>
	);
}
