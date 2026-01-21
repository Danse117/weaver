import { Button } from "@/components/ui/button";
import { Cpu, LockIcon, SparklesIcon, Zap, ZapIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { RainbowButton } from "../CTAButton";

export function Hero() {
    return (
        <>
        <main>
                <section className="overflow-hidden">
                    <div className="relative mx-auto max-w-5xl px-6 py-28 lg:py-24">
                        <div className="relative z-10 mx-auto max-w-2xl text-center">
                            <h1 className="text-balance text-4xl font-semibold md:text-5xl lg:text-6xl">Modern Software testing reimagined</h1>
                            <p className="mx-auto my-8 max-w-2xl text-xl">Officiis laudantium excepturi ducimus rerum dignissimos, and tempora nam vitae, excepturi ducimus iste provident dolores.</p>

                            <RainbowButton href="#waitlist" className="w-fit mt-4">Join Waitlist</RainbowButton>
                        </div>
                    </div>

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
                    <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4 max-w-5xl">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <ZapIcon className="size-4" />
                            <h3 className="text-sm font-medium">Faaast</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">It supports an entire helping developers and innovate.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Cpu className="size-4" />
                            <h3 className="text-sm font-medium">Powerful</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">It supports an entire helping developers and businesses.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <LockIcon className="size-4" />
                            <h3 className="text-sm font-medium">Security</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">It supports an helping developers businesses innovate.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <SparklesIcon className="size-4" />

                            <h3 className="text-sm font-medium">AI Powered</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">It supports an helping developers businesses innovate.</p>
                    </div>
                </div>
                </section>

        </main>
        </>
    );
}