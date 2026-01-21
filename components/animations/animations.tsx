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

// Component for animated radial gradient background
export const AnimatedGradientBackground = motion.div;
