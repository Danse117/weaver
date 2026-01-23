"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  icons?: React.ReactNode[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  iconFramerProps?: HTMLMotionProps<"div">;
  className?: string;
  iconClassName?: string;
}

export function WordRotate({
  words,
  icons,
  duration = 1500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  iconFramerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  iconClassName,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={words[index]}
          className=" inline-block items-center justify-center gap-3"
        >
          {icons && icons[index] && (
            <motion.div
              className={cn("inline-flex", iconClassName)}
              {...iconFramerProps}
            >
              {icons[index]}
            </motion.div>
          )}
          <motion.h1
            className={cn("inline-block ", className)}
            {...framerProps}
          >
            {words[index]}
          </motion.h1>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
