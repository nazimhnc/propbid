import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isUrgent: boolean;
  isCritical: boolean;
  totalSeconds: number;
  display: string;
}

export function useCountdown(targetDate: Date): CountdownResult {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = targetDate.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diff / 1000));

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const isExpired = totalSeconds <= 0;
  const isUrgent = totalSeconds < 3600 && totalSeconds > 300; // < 1h
  const isCritical = totalSeconds <= 300 && totalSeconds > 0; // < 5min

  let display: string;
  if (isExpired) {
    display = 'ENDED';
  } else if (days > 0) {
    display = `${days}d ${hours}h ${minutes}m`;
  } else if (hours > 0) {
    display = `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    display = `${minutes}m ${seconds}s`;
  } else {
    display = `${seconds}s`;
  }

  return { days, hours, minutes, seconds, isExpired, isUrgent, isCritical, totalSeconds, display };
}
