'use client';

import { motion } from 'motion/react';

// Breathing animation for radial gradient backgrounds
export const createBreathingAnimation = (delay: number = 0) => ({
	scale: [1, 1.1, 1],
	opacity: [0.4, 0.6, 0.4],
	transition: {
		duration: 8,
		repeat: Infinity,
		delay,
	},
});

// Sidebar animations
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

// Component for animated radial gradient background
export const AnimatedGradientBackground = motion.div;
