import { Hero } from '@/app/(public)/components/home/Hero';
import { Features } from './components/home/Features';
import { FaqsSection } from './components/home/FAQSection';
import { UnsureSection } from './components/home/Unsure';
import { TeamsSection } from './components/home/Teams';
import { WaitlistSection } from './components/home/Waitlist';

export default function Home() {
	return (
		<>
			<Hero />
			<Features />
      <TeamsSection />
      <WaitlistSection />
      <UnsureSection />
      <FaqsSection />
		</>
	);
}
