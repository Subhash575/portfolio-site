interface TelemetryPayload {
 area: string;
 message: string;
 meta?: Record<string, unknown>;
}

const webhookUrl = process.env.CONTACT_ERROR_WEBHOOK;

export function createEventId(): string {
 const rand = Math.random().toString(36).slice(2, 8);
 return `${Date.now().toString(36)}-${rand}`;
}

export async function reportServerError(payload: TelemetryPayload): Promise<string> {
 const eventId = createEventId();
 const event = {
 eventId,
 timestamp: new Date().toISOString(),
 ...payload,
 };

 console.error("[contact-telemetry]", JSON.stringify(event));

 if (webhookUrl) {
 try {
 await fetch(webhookUrl, {
 method: "POST",
 headers: {
 "Content-Type": "application/json",
 },
 body: JSON.stringify(event),
 });
 } catch (error) {
 console.error("[contact-telemetry-webhook-failed]", {
 eventId,
 reason: error instanceof Error ? error.message : "unknown",
 });
 }
 }

 return eventId;
}
