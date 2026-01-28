import { Hero } from '@/app/(public)/components/home/Hero';
import { Features } from './components/home/Features';
import { FaqsSection } from './components/home/FAQSection';
import { UnsureSection } from './components/home/Unsure';
import { TeamsSection } from './components/home/Teams';
import { WaitlistSection } from './components/home/Waitlist';
import { AnimatedBackground } from './components/home/AnimatedBackground';
import { Roadmap } from './components/home/Roadmap';
import { TeamSectionDemo } from './components/home/MeetTheTeam';

export default function Home() {
	return (
		<>
			{/* <AnimatedBackground /> */}
			<Hero />
			<Features />
      		<TeamsSection />
			<TeamSectionDemo />
      		<Roadmap />
      		<WaitlistSection />
      		<UnsureSection />
      		<FaqsSection />
		</>
	);
}
