"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TypewriterProps {
  text?: string;
  texts?: string[];
  delay?: number;
  speed?: number;
  pauseBetween?: number;
  className?: string;
}

export function Typewriter({
  text,
  texts,
  delay = 0,
  speed = 50,
  pauseBetween = 2000,
  className = "",
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const textArray = texts || (text ? [text] : []);
  const currentText = textArray[currentTextIndex] || "";

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started || textArray.length === 0) return;

    if (currentIndex < currentText.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === currentText.length && textArray.length > 1) {
      const timer = setTimeout(() => {
        setDisplayText("");
        setCurrentIndex(0);
        setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
      }, pauseBetween);

      return () => clearTimeout(timer);
    }
  }, [
    currentIndex,
    currentText,
    speed,
    started,
    textArray.length,
    pauseBetween,
  ]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="inline-block w-0.5 h-[1em] bg-current ml-1"
      />
    </span>
  );
}
