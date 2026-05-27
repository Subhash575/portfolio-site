interface RateLimitState {
 count: number;
 resetAt: number;
}

const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const maxRequests = Number(process.env.CONTACT_RATE_LIMIT_MAX || 5);

const globalForRateLimit = globalThis as typeof globalThis & {
 __contactRateLimitStore?: Map<string, RateLimitState>;
};

const rateStore =
 globalForRateLimit.__contactRateLimitStore ||
 (globalForRateLimit.__contactRateLimitStore = new Map<string, RateLimitState>());

function cleanup(now: number) {
 for (const [key, value] of rateStore.entries()) {
 if (value.resetAt <= now) {
 rateStore.delete(key);
 }
 }
}

export function enforceContactRateLimit(key: string): {
 allowed: boolean;
 remaining: number;
 retryAfterSeconds: number;
} {
 const now = Date.now();
 cleanup(now);

 const existing = rateStore.get(key);
 if (!existing || existing.resetAt <= now) {
 rateStore.set(key, { count: 1, resetAt: now + windowMs });
 return {
 allowed: true,
 remaining: maxRequests - 1,
 retryAfterSeconds: Math.ceil(windowMs / 1000),
 };
 }

 existing.count += 1;
 rateStore.set(key, existing);

 const remaining = Math.max(0, maxRequests - existing.count);
 const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000));

 return {
 allowed: existing.count <= maxRequests,
 remaining,
 retryAfterSeconds,
 };
}
