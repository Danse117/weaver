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
import { WordRotate } from "@/components/ui/word-rotate";

// Social Media Icons
const socialIcons = [
    // Facebook
    <svg key="facebook" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>,
    // Instagram
    <svg key="instagram" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>,
    // YouTube
    <svg key="youtube" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>,
    // TikTok
    <svg key="tiktok" className="h-10 w-10" viewBox="0 0 24 24" fill="none">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" fill="currentColor"/>
    </svg>,
    // X (Twitter)
    <svg key="x" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>,
    // LinkedIn
    <svg key="linkedin" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>,
    // Twitch
    <svg key="twitch" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
    </svg>,
    // Kick
    <svg key="kick" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M5 1C2.79086 1 1 2.79086 1 5v14c0 2.2091 1.79086 4 4 4h14c2.2091 0 4 -1.7909 4 -4V5c0 -2.20914 -1.7909 -4 -4 -4H5Zm5.3696 3.5H5.47827v15h4.89133v-3.2609H12v1.6305h1.6304V19.5h4.8913v-4.8913h-1.6304v-1.6304h-1.6304v-1.9566h1.6304V9.3913h1.6304V4.5h-4.8913v1.63043H12v1.63044h-1.6304V4.5Z" strokeWidth="1"/>
    </svg>,
    // OnlyFans
    <svg key="onlyfans" className="h-10 w-10" viewBox="0 0 32 32" fill="currentColor">
        <path d="M10.667,5.333C4.776,5.333,0,10.109,0,16s4.776,10.667,10.667,10.667,10.667-4.776,10.667-10.667S16.558,5.333,10.667,5.333Zm0,13.867c-1.767,0-3.2-1.433-3.2-3.2s1.433-3.2,3.2-3.2,3.2,1.433,3.2,3.2c.002,1.765-1.427,3.198-3.191,3.2-.003,0-.006,0-.009,0Z" opacity=".8"/>
        <path d="M22.656,13.333c2.71,.78,5.909,0,5.909,0-.928,4.053-3.872,6.592-8.118,6.901-1.683,3.906-5.528,6.435-9.781,6.432l3.2-10.171c3.29-10.454,4.976-11.162,12.777-11.162h5.356c-.896,3.947-3.984,6.961-9.344,8Z"/>
    </svg>,
    // Snapchat
    <svg key="snapchat" className="h-10 w-10 font-white" viewBox="0 0 32 32" fill="currentColor">
        <path fill="" d="M30.893,22.837c-.208-.567-.606-.871-1.058-1.122-.085-.05-.163-.09-.23-.12-.135-.07-.273-.137-.41-.208-1.41-.747-2.51-1.69-3.274-2.808-.217-.315-.405-.648-.562-.996-.065-.186-.062-.292-.015-.389,.046-.074,.108-.138,.18-.188,.242-.16,.492-.323,.661-.432,.302-.195,.541-.35,.695-.46,.579-.405,.983-.835,1.236-1.315,.357-.672,.404-1.466,.13-2.175-.383-1.009-1.336-1.635-2.49-1.635-.243,0-.486,.025-.724,.077-.064,.014-.127,.028-.189,.044,.011-.69-.005-1.418-.066-2.135-.218-2.519-1.1-3.84-2.02-4.893-.589-.66-1.283-1.218-2.053-1.653-1.396-.797-2.979-1.202-4.704-1.202s-3.301,.405-4.698,1.202c-.773,.434-1.468,.994-2.057,1.656-.92,1.053-1.802,2.376-2.02,4.893-.061,.717-.077,1.449-.067,2.135-.062-.016-.125-.031-.189-.044-.238-.051-.481-.077-.724-.077-1.155,0-2.109,.626-2.491,1.635-.276,.71-.23,1.505,.126,2.178,.254,.481,.658,.911,1.237,1.315,.153,.107,.393,.262,.695,.46,.163,.106,.402,.261,.635,.415,.082,.053,.151,.123,.204,.205,.049,.1,.051,.208-.022,.408-.155,.341-.34,.668-.553,.976-.747,1.092-1.815,2.018-3.179,2.759-.723,.383-1.474,.639-1.791,1.502-.239,.651-.083,1.391,.525,2.015h0c.223,.233,.482,.429,.766,.58,.592,.326,1.222,.578,1.876,.75,.135,.035,.263,.092,.379,.169,.222,.194,.19,.486,.485,.914,.148,.221,.336,.412,.555,.564,.619,.428,1.315,.455,2.053,.483,.666,.025,1.421,.054,2.283,.339,.357,.118,.728,.346,1.158,.613,1.032,.635,2.446,1.503,4.811,1.503s3.789-.873,4.829-1.51c.427-.262,.796-.488,1.143-.603,.862-.285,1.617-.313,2.283-.339,.737-.028,1.433-.055,2.053-.483,.259-.181,.475-.416,.632-.69,.212-.361,.207-.613,.406-.789,.109-.074,.229-.129,.356-.162,.662-.173,1.301-.428,1.901-.757,.302-.162,.575-.375,.805-.63l.008-.009c.57-.61,.714-1.329,.48-1.964Zm-2.102,1.13c-1.282,.708-2.135,.632-2.798,1.059-.563,.363-.23,1.144-.639,1.426-.503,.347-1.989-.025-3.909,.609-1.584,.524-2.594,2.029-5.442,2.029s-3.835-1.502-5.444-2.033c-1.916-.634-3.406-.262-3.909-.609-.409-.282-.077-1.064-.639-1.426-.664-.427-1.516-.351-2.798-1.055-.816-.451-.353-.73-.081-.862,4.645-2.249,5.386-5.721,5.419-5.979,.04-.312,.084-.557-.259-.875-.332-.307-1.804-1.218-2.213-1.503-.676-.472-.973-.944-.754-1.523,.153-.401,.527-.552,.92-.552,.124,0,.248,.014,.369,.041,.742,.161,1.462,.533,1.879,.633,.05,.013,.102,.02,.153,.021,.222,0,.3-.112,.285-.366-.048-.812-.162-2.394-.034-3.872,.176-2.034,.831-3.042,1.61-3.934,.374-.428,2.132-2.286,5.493-2.286s5.123,1.85,5.497,2.276c.78,.891,1.436,1.899,1.61,3.934,.128,1.479,.018,3.061-.034,3.872-.018,.268,.063,.366,.285,.366,.052,0,.103-.008,.153-.021,.417-.1,1.137-.472,1.879-.633,.121-.027,.245-.041,.369-.041,.395,0,.766,.153,.92,.552,.219,.579-.077,1.051-.753,1.523-.409,.285-1.881,1.196-2.213,1.503-.344,.317-.299,.563-.259,.875,.033,.261,.773,3.734,5.419,5.979,.274,.137,.737,.416-.079,.871Z"/>
    </svg>,
    // Tumblr
    <svg key="tumblr" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z"/>
    </svg>,
];

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
                        <div className="columns-1 items-center justify-center relative z-10 mx-auto max-w-2xl text-center ">
                            <h1 className="text-balance text-center text-4xl font-semibold md:text-5xl lg:text-6xl">
                                <TextReveal>
                                    Weave Your 
                                </TextReveal>
                                <WordRotate 
                                    className="inline-block font-bold text-black dark:text-white" 
                                    words={["Facebook", "Instagram", "YouTube", "TikTok", "", "LinkedIn", "Twitch", "Kick", "OnlyFans", "Snapchat", "Tumblr"]}
                                    icons={socialIcons}
                                    iconClassName="h-10 w-10"
                                />                     
                                <TextReveal>
                                    Together 
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
                                            src="assets/hero1.jpg"
                                            alt="Weaver Hero Section"
                                            width={2880}
                                            height={2074}
                                            priority
                                            unoptimized
                                        />
                                        <Image
                                            className="rounded-[--radius] z-2 relative hidden border dark:block"
                                            src="assets/hero2.jpg"
                                            alt="Weaver hero section"
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
                    
                    {/* Feature Cards */}
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