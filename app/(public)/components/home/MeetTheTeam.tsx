'use client';

import {
  Twitter,
  Linkedin,
} from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/animations";

const teamMembers = [
  {
    name: "Adam",
    designation: "Co-Founder",
    imageSrc:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socialLinks: [
      { icon: Twitter, href: "#" },
      { icon: Linkedin, href: "#" },
    ],
  },
  {
    name: "Daoud",
    designation: "Co-Founder",
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    socialLinks: [
      { icon: Linkedin, href: "#" },
      { icon: Twitter, href: "#" },
    ],
  },
];

export function TeamSectionDemo() {
  return (
    <section id="team" className="py-8 md:py-32">
      <FadeIn direction="up" className="mx-auto max-w-3xl lg:max-w-5xl px-6 mb-12 text-center">
        <h2 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
          Meet The Team
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          We're a passionate group of creators, engineers, and analysts on a mission to help content creators and brands make data-driven decisions
        </p>
      </FadeIn>
      
      <div className="flex justify-center items-center px-4 md:px-6">
        <StaggerContainer 
          className="grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
          staggerDelay={0.15}
        >
          {teamMembers.map((member, index) => (
            <StaggerItem key={index} index={index} direction="up">
              <div
                className="group relative flex flex-col items-center outline-8 outline-border justify-end overflow-hidden rounded-xl bg-card p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl h-full"
                style={{
                  backgroundColor:
                    index === 0
                      ? "hsl(var(--destructive)/0.1)"
                      : "hsl(var(--muted))",
                  color: "hsl(var(--foreground))",
                }}
              >
                {/* Background wave animation */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-gradient-to-t from-primary/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                  style={{ transitionDelay: `${index * 50}ms` }}
                />

                {/* Member Image with mask and border animation */}
                <div
                  className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-transparent bg-background/20 transition-all duration-500 ease-out group-hover:border-primary group-hover:scale-105"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={member.imageSrc}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                </div>

                <h3 className="relative z-10 mt-4 text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="relative z-10 text-md">
                  {member.designation}
                </p>

                {/* Social Links for individual members */}
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="relative z-10 mt-4 flex gap-3 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                    {member.socialLinks.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <link.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}