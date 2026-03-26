"use client";

import React, { useState, useEffect } from "react";

interface MatrixTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function MatrixText({ text, className = "", delay = 50 }: MatrixTextProps) {
  const [displayText, setDisplayText] = useState("");
  const chars = "01$#!%&@*?><";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}
