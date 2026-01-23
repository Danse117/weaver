/**
 * Weaver Loader Components
 *
 * Custom loader using the Weaver icon with various animation effects.
 */

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Animation keyframes
const animationKeyframes = `
  @keyframes weaver-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.95); }
  }
  
  @keyframes weaver-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes weaver-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10%); }
  }
  
  @keyframes weaver-shimmer {
    0% { opacity: 0.5; filter: brightness(0.8); }
    50% { opacity: 1; filter: brightness(1.2); }
    100% { opacity: 0.5; filter: brightness(0.8); }
  }
`;

export type WeaverLoaderAnimation = "pulse" | "spin" | "bounce" | "shimmer";

export interface WeaverLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The size of the loader in pixels.
   * @default 48
   */
  size?: number;
  /**
   * Animation type for the loader.
   * @default "pulse"
   */
  animation?: WeaverLoaderAnimation;
  /**
   * Animation duration in seconds.
   * @default 1.5
   */
  duration?: number;
  /**
   * Additional class names for custom styling.
   */
  className?: string;
}

const WeaverLoader = React.forwardRef<HTMLDivElement, WeaverLoaderProps>(
  (
    { className, size = 48, animation = "pulse", duration = 1.5, ...props },
    ref
  ) => {
    const animationStyle = React.useMemo(() => {
      const animationName = `weaver-${animation}`;
      return {
        animation: `${animationName} ${duration}s ease-in-out infinite`,
      };
    }, [animation, duration]);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn("flex items-center justify-center", className)}
        {...props}
      >
        <style>{animationKeyframes}</style>
        <div style={animationStyle}>
          <Image
            src="/assets/logos/weaver_icon.svg"
            alt=""
            width={size}
            height={size}
            priority
            aria-hidden="true"
          />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
WeaverLoader.displayName = "WeaverLoader";

/**
 * Weaver Loader with loading text
 */
export interface WeaverLoaderWithTextProps extends WeaverLoaderProps {
  /**
   * Loading text to display.
   * @default "Loading..."
   */
  text?: string;
  /**
   * Position of the text relative to the icon.
   * @default "bottom"
   */
  textPosition?: "bottom" | "right";
}

const WeaverLoaderWithText = React.forwardRef<
  HTMLDivElement,
  WeaverLoaderWithTextProps
>(
  (
    {
      className,
      size = 48,
      animation = "pulse",
      duration = 1.5,
      text = "Loading...",
      textPosition = "bottom",
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center justify-center gap-3",
          textPosition === "bottom" ? "flex-col" : "flex-row",
          className
        )}
        {...props}
      >
        <WeaverLoader size={size} animation={animation} duration={duration} />
        <span className="text-sm text-muted-foreground animate-pulse">
          {text}
        </span>
      </div>
    );
  }
);
WeaverLoaderWithText.displayName = "WeaverLoaderWithText";

export { WeaverLoader, WeaverLoaderWithText };