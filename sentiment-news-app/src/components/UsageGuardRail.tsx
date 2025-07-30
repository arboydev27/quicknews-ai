// usageGuardRail.tsx
export function checkDailyUsageLimit(limit: number = 10) {
  if (typeof window === "undefined") {
    return { allowed: true, currentCount: 0 }; // SSR-safe fallback
  }

  const usageDataRaw = localStorage.getItem("quicknews-usage");
  const today = new Date().toDateString();

  let usageData = usageDataRaw
    ? JSON.parse(usageDataRaw)
    : { date: today, count: 0 };

  // Reset if it's a new day
  if (usageData.date !== today) {
    usageData = { date: today, count: 0 };
    localStorage.setItem("quicknews-usage", JSON.stringify(usageData));
  }

  return {
    allowed: usageData.count < limit,
    currentCount: usageData.count,
  };
}

export function incrementUsageCount() {
  if (typeof window === "undefined") return;

  const usageDataRaw = localStorage.getItem("quicknews-usage");
  const today = new Date().toDateString();

  let usageData = usageDataRaw
    ? JSON.parse(usageDataRaw)
    : { date: today, count: 0 };

  // Reset if new day
  if (usageData.date !== today) {
    usageData = { date: today, count: 0 };
  }

  usageData.count += 1;
  localStorage.setItem("quicknews-usage", JSON.stringify(usageData));
}
