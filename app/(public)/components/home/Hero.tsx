'use client';

import { BarChart3, Shield, SparklesIcon, Grid3x3 } from "lucide-react";
import Image from "next/image";
import { RainbowButton } from "../CTAButton";
import {
    TextReveal,
    FadeIn,
    ScaleIn,
    StaggerContainer,
    StaggerItem,
} from "@/components/animations/animations";

const featureCards = [
    {
        icon: BarChart3,
        title: "Unified Analytics",
        description: "All your social media metrics in one dashboard. No more switching between platforms.",
    },
    {
        icon: SparklesIcon,
        title: "AI Insights",
        description: "Get smart recommendations on what works and how to grow your audience.",
    },
    {
        icon: Grid3x3,
        title: "Multi-Platform",
        description: "Connect Instagram, TikTok, YouTube, X, LinkedIn, and 7+ other platforms.",
    },
    {
        icon: Shield,
        title: "Secure & Private",
        description: "Official APIs only. Your data is encrypted and never shared with third parties.",
    },
];

export function Hero() {
    return (
        <>
        <main>
                <section className="overflow-hidden">
                    <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">
                                <TextReveal>
                                    Weave Your Social Success Together
                                </TextReveal>
                            </h1>
                            <FadeIn direction="up" delay={0.4}>
                                <p className="mx-auto my-8 max-w-2xl text-xl">
                                    One dashboard for Instagram, TikTok, YouTube, X, and more. Track performance, discover insights, and make data-driven decisions—all in one place                                </p>
                            </FadeIn>

                            <ScaleIn delay={0.6}>
                                <RainbowButton href="#waitlist" className="mt-4 text-2xl font-bold">Join The Waitlist</RainbowButton>
                            </ScaleIn>
                        </div>
                    </div>

                    <FadeIn direction="up" delay={0.3} duration={0.7}>
                        <div className="mx-auto -mt-16 max-w-7xl mask-[linear-gradient(to_bottom,black_50%,transparent_100%)]">
                            <div className="perspective-distant mask-[linear-gradient(to_right,black_50%,transparent_100%)] -mr-16 pl-16 lg:-mr-56 lg:pl-56">
                                <div className="[transform:rotateX(20deg);]">
                                    <div className="lg:h-176 relative skew-x-[.36rad]">
                                        <Image
                                            className="rounded-[--radius] z-2 relative border dark:hidden"
                                            src="https://tailark.com/_next/image?url=%2Fcard.png&w=3840&q=75"
                                            alt="Tailark hero section"
                                            width={2880}
                                            height={2074}
                                            priority
                                            unoptimized
                                        />
                                        <Image
                                            className="rounded-[--radius] z-2 relative hidden border dark:block"
                                            src="https://tailark.com/_next/image?url=%2Fdark-card.webp&w=3840&q=75"
                                            alt="Tailark hero section"
                                            width={2880}
                                            height={2074}
                                            priority
                                            unoptimized
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    <StaggerContainer
                        className="relative mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl"
                        staggerDelay={0.12}
                    >
                        {featureCards.map((card, index) => (
                            <StaggerItem key={card.title} index={index}>
                                <div className="group space-y-3 rounded-lg border bg-card/50 p-6 transition-all hover:border-primary/50 hover:shadow-md h-full">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded-full bg-primary/10 p-2">
                                            <card.icon className="size-5 text-primary" />
                                        </div>
                                        <h3 className="font-semibold">{card.title}</h3>
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </section>

        </main>
        </>
    );
}