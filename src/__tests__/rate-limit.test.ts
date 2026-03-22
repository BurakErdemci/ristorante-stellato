import { describe, it, expect, beforeEach, vi } from "vitest";
import { rateLimit } from "@/lib/rate-limit";

describe("Rate Limiting", () => {
  beforeEach(() => {
    // Her testten önce zamanı sıfırla
    vi.useFakeTimers();
  });

  it("ilk isteği kabul etmeli", () => {
    const result = rateLimit("test-ip-1");
    expect(result.success).toBe(true);
  });

  it("limit altındaki istekleri kabul etmeli", () => {
    const ip = "test-ip-2";
    for (let i = 0; i < 10; i++) {
      const result = rateLimit(ip);
      expect(result.success).toBe(true);
    }
  });

  it("limiti aşan istekleri reddetmeli", () => {
    const ip = "test-ip-3";
    for (let i = 0; i < 10; i++) {
      rateLimit(ip);
    }
    const result = rateLimit(ip);
    expect(result.success).toBe(false);
  });

  it("süre dolduktan sonra tekrar kabul etmeli", () => {
    const ip = "test-ip-4";
    for (let i = 0; i < 10; i++) {
      rateLimit(ip);
    }
    expect(rateLimit(ip).success).toBe(false);

    // 61 saniye ileri sar
    vi.advanceTimersByTime(61_000);

    expect(rateLimit(ip).success).toBe(true);
  });

  it("farklı IP'ler bağımsız olmalı", () => {
    const ip1 = "test-ip-5a";
    const ip2 = "test-ip-5b";

    for (let i = 0; i < 10; i++) {
      rateLimit(ip1);
    }

    expect(rateLimit(ip1).success).toBe(false);
    expect(rateLimit(ip2).success).toBe(true);
  });
});
