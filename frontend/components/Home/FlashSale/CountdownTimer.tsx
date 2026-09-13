"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  className?: string;
}

export default function CountdownTimer({
  initialHours = 4,
  initialMinutes = 32,
  initialSeconds = 18,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatUnit = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2 text-white shadow-md shadow-red-600/20 ${className}`}
      role="timer"
      aria-live="polite"
    >
      <Clock className="h-4 w-4 text-white animate-pulse" />
      <span className="text-xs font-semibold text-red-100 uppercase tracking-wider">
        Ends in:
      </span>
      <div className="flex items-center gap-1 font-mono text-sm sm:text-base font-black">
        <span className="rounded-lg bg-black/30 px-2 py-0.5 backdrop-blur-xs">
          {formatUnit(timeLeft.hours)}
        </span>
        <span className="text-red-200">:</span>
        <span className="rounded-lg bg-black/30 px-2 py-0.5 backdrop-blur-xs">
          {formatUnit(timeLeft.minutes)}
        </span>
        <span className="text-red-200">:</span>
        <span className="rounded-lg bg-black/30 px-2 py-0.5 backdrop-blur-xs">
          {formatUnit(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
}
