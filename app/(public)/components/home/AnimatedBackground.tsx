'use client';

import { AnimatedGradientBackground, createBreathingAnimation } from "@/components/animations/animations";

export function AnimatedBackground() {
	return (
		<div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
			{/* Instagram Pink */}
			<AnimatedGradientBackground
				animate={createBreathingAnimation(0)}
				className="absolute top-[5%] left-[10%] w-[700px] h-[700px] rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(225, 48, 108, 0.5) 0%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			
			{/* Twitter Blue */}
			<AnimatedGradientBackground
				animate={createBreathingAnimation(1.5)}
				className="absolute top-[15%] right-[15%] w-[650px] h-[650px] rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(29, 161, 242, 0.5) 0%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			
			{/* Facebook Blue */}
			<AnimatedGradientBackground
				animate={createBreathingAnimation(2.5)}
				className="absolute top-[35%] left-[5%] w-[680px] h-[680px] rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(24, 119, 242, 0.5) 0%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			
			{/* Twitch Purple */}
			<AnimatedGradientBackground
				animate={createBreathingAnimation(3.5)}
				className="absolute top-[30%] right-[20%] w-[620px] h-[620px] rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(145, 70, 255, 0.5) 0%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			
			{/* YouTube Red */}
			<AnimatedGradientBackground
				animate={createBreathingAnimation(4.5)}
				className="absolute top-[55%] left-[15%] w-[660px] h-[660px] rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(255, 0, 0, 0.5) 0%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			
			{/* Kick Green */}
			<AnimatedGradientBackground
				animate={createBreathingAnimation(5.5)}
				className="absolute top-[50%] right-[10%] w-[640px] h-[640px] rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(83, 252, 24, 0.5) 0%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			
			{/* Snapchat Yellow */}
			<AnimatedGradientBackground
				animate={createBreathingAnimation(6.5)}
				className="absolute top-[75%] left-[20%] w-[600px] h-[600px] rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(255, 252, 0, 0.5) 0%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
			
			{/* LinkedIn Blue */}
			<AnimatedGradientBackground
				animate={createBreathingAnimation(7.5)}
				className="absolute top-[70%] right-[25%] w-[580px] h-[580px] rounded-full"
				style={{
					background: 'radial-gradient(circle, rgba(10, 102, 194, 0.5) 0%, transparent 70%)',
					filter: 'blur(80px)',
				}}
			/>
		</div>
	);
}
