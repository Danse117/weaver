'use client';

import {
  Timeline,
  TimelineContent,
  TimelineDot,
  TimelineHeading,
  TimelineItem,
  TimelineLine,
} from "@/components/ui/timeline";
import { FadeIn, SlideIn, ScaleIn } from "@/components/animations/animations";

const roadmapItems = [
  {
    phase: "Phase 1: Foundation",
    status: "done" as const,
    dotStatus: "done" as const,
    side: "left",
    hasLine: true,
    lineDone: true,
    content: "Launch core platform with TikTok integration. Users can connect their TikTok accounts, view unified analytics, track follower growth, and analyze content performance with AI-powered insights.",
  },
  {
    phase: "Phase 2: Platform Expansion",
    status: "done" as const,
    dotStatus: "current" as const,
    side: "right",
    hasLine: true,
    lineDone: false,
    content: "Add support for Instagram, YouTube, and X (Twitter). Enable cross-platform analytics comparison, unified dashboard views, and enhanced AI insights that identify trends across multiple platforms.",
  },
  {
    phase: "Phase 3: Professional Tools",
    status: undefined,
    dotStatus: undefined,
    side: "left",
    hasLine: true,
    lineDone: false,
    content: "Introduce LinkedIn, Facebook, and Threads integrations. Launch content scheduling, team collaboration features, automated reporting, and advanced audience demographic analysis.",
  },
  {
    phase: "Phase 4: Creator Economy",
    status: undefined,
    dotStatus: undefined,
    side: "right",
    hasLine: true,
    lineDone: false,
    content: "Add Twitch, Kick, and OnlyFans support. Implement monetization tracking, revenue analytics, ad performance monitoring, and sponsorship ROI calculations to help creators maximize earnings.",
  },
  {
    phase: "Phase 5: Community & Engagement",
    status: undefined,
    dotStatus: undefined,
    side: "left",
    hasLine: true,
    lineDone: false,
    content: "Complete platform coverage with Snapchat and Tumblr. Launch unified community management, comment aggregation, sentiment analysis, and automated engagement tools to help you connect with your audience.",
  },
  {
    phase: "Phase 6: Enterprise & Scale",
    status: undefined,
    dotStatus: undefined,
    side: "right",
    hasLine: false,
    lineDone: false,
    content: "White-label solutions, API access for agencies, advanced team permissions, custom integrations, and enterprise-grade security features for large organizations and agencies.",
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-16 md:py-32">
      <div className="mx-auto max-w-3xl lg:max-w-5xl px-6">
        <FadeIn direction="up" className="mb-12 text-center">
          <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
            Product Roadmap
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our journey to becoming the ultimate social media analytics platform
          </p>
        </FadeIn>
        <Timeline>
          {roadmapItems.map((item, index) => (
            <SlideIn
              key={item.phase}
              direction={item.side === "left" ? "left" : "right"}
              delay={index * 0.12}
              distance={40}
            >
              <TimelineItem status={item.status}>
                <TimelineHeading side={item.side === "right" ? "right" : undefined}>
                  {item.phase}
                </TimelineHeading>
                <ScaleIn delay={index * 0.12 + 0.1}>
                  <TimelineDot status={item.dotStatus} />
                </ScaleIn>
                {item.hasLine && <TimelineLine done={item.lineDone} />}
                <TimelineContent>
                  {item.content}
                </TimelineContent>
              </TimelineItem>
            </SlideIn>
          ))}
        </Timeline>
      </div>
    </section>
  );
}
