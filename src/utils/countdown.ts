export interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isClosingSoon: boolean; // Less than 7 days
  formattedString: string;
}

export const calculateCountdown = (targetIsoDate: string): CountdownResult => {
  const target = new Date(targetIsoDate).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
      isClosingSoon: false,
      formattedString: 'Applications Closed'
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const isClosingSoon = days < 7;

  let formattedString = '';
  if (days > 0) {
    formattedString = `${days}d ${hours}h ${minutes}m left`;
  } else if (hours > 0) {
    formattedString = `${hours}h ${minutes}m ${seconds}s left`;
  } else {
    formattedString = `${minutes}m ${seconds}s left`;
  }

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    isClosingSoon,
    formattedString
  };
};

export const formatDisplayDate = (isoString: string): string => {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-ZA', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return isoString;
  }
};
