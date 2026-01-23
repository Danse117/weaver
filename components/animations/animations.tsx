'use client';

import { motion, useInView, Variants } from 'motion/react';
import { useRef, ReactNode, createContext, useContext } from 'react';

// ============================================================================
// BREATHING ANIMATION (existing)
// ============================================================================

export const createBreathingAnimation = (delay: number = 0) => ({
	scale: [1, 1.1, 1],
	opacity: [0.4, 0.6, 0.4],
	transition: {
		duration: 8,
		repeat: Infinity,
		delay,
	},
});

// ============================================================================
// SIDEBAR ANIMATIONS (existing)
// ============================================================================

export const sidebarAnimations = {
	slideIn: {
		initial: { x: '-100%', opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: '-100%', opacity: 0 },
		transition: {
			duration: 0.3,
			ease: 'easeInOut',
		},
	},
	fadeIn: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: {
			duration: 0.2,
		},
	},
};

export const AnimatedGradientBackground = motion.div;

// ============================================================================
// SCROLL-TRIGGERED ANIMATION COMPONENTS
// ============================================================================

type Direction = 'up' | 'down' | 'left' | 'right';

interface FadeInProps {
	children: ReactNode;
	direction?: Direction;
	delay?: number;
	duration?: number;
	once?: boolean;
	className?: string;
	amount?: number;
}

const directionOffsets: Record<Direction, { x: number; y: number }> = {
	up: { x: 0, y: 40 },
	down: { x: 0, y: -40 },
	left: { x: 40, y: 0 },
	right: { x: -40, y: 0 },
};

/**
 * FadeIn - Fade in with optional direction
 * Scroll-triggered animation that fades and slides content into view
 */
export function FadeIn({
	children,
	direction,
	delay = 0,
	duration = 0.5,
	once = true,
	className,
	amount = 0.3,
}: FadeInProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once, amount });

	const offset = direction ? directionOffsets[direction] : { x: 0, y: 0 };

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, x: offset.x, y: offset.y }}
			animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
			transition={{
				duration,
				delay,
				ease: [0.25, 0.4, 0.25, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// ============================================================================
// STAGGER CONTAINER + ITEM
// ============================================================================

interface StaggerContextType {
	staggerDelay: number;
	delayChildren: number;
	isInView: boolean;
}

const StaggerContext = createContext<StaggerContextType>({
	staggerDelay: 0.1,
	delayChildren: 0,
	isInView: false,
});

interface StaggerContainerProps {
	children: ReactNode;
	staggerDelay?: number;
	delayChildren?: number;
	once?: boolean;
	className?: string;
	amount?: number;
}

/**
 * StaggerContainer - Wrapper for staggered child animations
 * Use with StaggerItem children for sequential reveal effects
 */
export function StaggerContainer({
	children,
	staggerDelay = 0.1,
	delayChildren = 0,
	once = true,
	className,
	amount = 0.2,
}: StaggerContainerProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once, amount });

	return (
		<StaggerContext.Provider value={{ staggerDelay, delayChildren, isInView }}>
			<div ref={ref} className={className}>
				{children}
			</div>
		</StaggerContext.Provider>
	);
}

interface StaggerItemProps {
	children: ReactNode;
	index?: number;
	direction?: Direction;
	className?: string;
}

/**
 * StaggerItem - Individual item within a StaggerContainer
 * Automatically calculates delay based on index
 */
export function StaggerItem({
	children,
	index = 0,
	direction = 'up',
	className,
}: StaggerItemProps) {
	const { staggerDelay, delayChildren, isInView } = useContext(StaggerContext);
	const offset = directionOffsets[direction];
	const delay = delayChildren + index * staggerDelay;

	return (
		<motion.div
			initial={{ opacity: 0, x: offset.x, y: offset.y }}
			animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
			transition={{
				duration: 0.4,
				delay,
				ease: [0.25, 0.4, 0.25, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// ============================================================================
// SCALE IN
// ============================================================================

interface ScaleInProps {
	children: ReactNode;
	delay?: number;
	duration?: number;
	once?: boolean;
	className?: string;
	amount?: number;
	scale?: number;
}

/**
 * ScaleIn - Scale up with fade and slight bounce
 * Great for CTAs, cards, and attention-grabbing elements
 */
export function ScaleIn({
	children,
	delay = 0,
	duration = 0.4,
	once = true,
	className,
	amount = 0.3,
	scale = 0.9,
}: ScaleInProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once, amount });

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, scale }}
			animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale }}
			transition={{
				duration,
				delay,
				ease: [0.34, 1.56, 0.64, 1], // Slight overshoot/bounce
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}

// ============================================================================
// TEXT REVEAL
// ============================================================================

interface TextRevealProps {
	children: string;
	delay?: number;
	className?: string;
	once?: boolean;
	amount?: number;
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * TextReveal - Word-by-word reveal animation for text
 * Great for headlines and important text
 */
export function TextReveal({
	children,
	delay = 0,
	className,
	once = true,
	amount = 0.5,
	as: Component = 'span',
}: TextRevealProps) {
	const ref = useRef<HTMLElement>(null);
	const isInView = useInView(ref, { once, amount });
	const words = children.split(' ');

	const containerVariants: Variants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.05,
				delayChildren: delay,
			},
		},
	};

	const wordVariants: Variants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.4,
				ease: [0.25, 0.4, 0.25, 1],
			},
		},
	};

	return (
		<motion.span
			ref={ref as React.RefObject<HTMLSpanElement>}
			variants={containerVariants}
			initial="hidden"
			animate={isInView ? 'visible' : 'hidden'}
			className={className}
			style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}
		>
			{words.map((word, i) => (
				<motion.span key={i} variants={wordVariants} style={{ display: 'inline-block' }}>
					{word}
				</motion.span>
			))}
		</motion.span>
	);
}

// ============================================================================
// SLIDE IN
// ============================================================================

interface SlideInProps {
	children: ReactNode;
	direction?: Direction;
	delay?: number;
	duration?: number;
	once?: boolean;
	className?: string;
	amount?: number;
	distance?: number;
}

const slideDistances: Record<Direction, (d: number) => { x: number; y: number }> = {
	up: (d) => ({ x: 0, y: d }),
	down: (d) => ({ x: 0, y: -d }),
	left: (d) => ({ x: d, y: 0 }),
	right: (d) => ({ x: -d, y: 0 }),
};

/**
 * SlideIn - Pure slide animation without fade
 * Good for elements sliding in from off-screen
 */
export function SlideIn({
	children,
	direction = 'up',
	delay = 0,
	duration = 0.5,
	once = true,
	className,
	amount = 0.3,
	distance = 60,
}: SlideInProps) {
	const ref = useRef<HTMLDivElement>(null);
	const isInView = useInView(ref, { once, amount });
	const offset = slideDistances[direction](distance);

	return (
		<motion.div
			ref={ref}
			initial={{ x: offset.x, y: offset.y, opacity: 0 }}
			animate={isInView ? { x: 0, y: 0, opacity: 1 } : { x: offset.x, y: offset.y, opacity: 0 }}
			transition={{
				duration,
				delay,
				ease: [0.25, 0.4, 0.25, 1],
			}}
			className={className}
		>
			{children}
		</motion.div>
	);
}
