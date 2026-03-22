const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const WINDOW_MS = 60 * 1000; // 1 dakika
const MAX_REQUESTS = 10; // Pencere başına max istek

export function rateLimit(identifier: string): { success: boolean } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now - entry.lastReset > WINDOW_MS) {
    rateLimitMap.set(identifier, { count: 1, lastReset: now });
    return { success: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { success: false };
  }

  entry.count++;
  return { success: true };
}

// Bellek sızıntısını önlemek için eski kayıtları temizle
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (now - entry.lastReset > WINDOW_MS * 2) {
      rateLimitMap.delete(key);
    }
  }
}, WINDOW_MS * 5);
