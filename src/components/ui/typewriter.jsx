"use client";

import { useState, useEffect } from "react";

export default function Typewriter({ text, speed = 30, className = "" }) {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);

  const cleanText = text?.replace(/\*\*/g, "") || "";

  useEffect(() => {
    setDisplayText("");
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < cleanText.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + cleanText[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, cleanText, speed]);

  return (
    <div className={className}>
      <div className="whitespace-pre-line">{displayText}</div>
      {index < cleanText.length && <span className="animate-pulse">|</span>}
    </div>
  );
}
