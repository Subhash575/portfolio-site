import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/data";
import { enforceContactRateLimit } from "@/lib/contactRateLimiter";
import { reportServerError } from "@/lib/serverTelemetry";

interface ContactRequestBody {
  name?: string;
  email?: string;
  message?: string;
  website?: string;
  formStartedAt?: number;
}

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(request: Request) {
  const requestHeaders = request.headers;
  const forwardedFor = requestHeaders.get("x-forwarded-for") || "";
  const ipAddress = forwardedFor.split(",")[0]?.trim() || requestHeaders.get("x-real-ip") || "unknown";
  const userAgent = requestHeaders.get("user-agent") || "unknown";

  const rateLimit = enforceContactRateLimit(ipAddress);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        message: "Too many requests. Please wait before sending another message.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  try {
    if (!resend) {
      const eventId = await reportServerError({
        area: "contact-api",
        message: "Missing RESEND_API_KEY",
        meta: { ipAddress, userAgent },
      });

      return NextResponse.json(
        {
          message: "Server email is not configured. Please add RESEND_API_KEY.",
          eventId,
        },
        { status: 500 },
      );
    }

    const body = (await request.json()) as ContactRequestBody;
    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const message = body.message?.trim() || "";
    const website = body.website?.trim() || "";
    const formStartedAt = Number(body.formStartedAt || 0);

    // Honeypot field should stay empty for real users.
    if (website) {
      return NextResponse.json({ message: "Message blocked." }, { status: 400 });
    }

    const formAgeMs = Date.now() - formStartedAt;
    if (!Number.isFinite(formStartedAt) || formAgeMs < 1500 || formAgeMs > 2 * 60 * 60 * 1000) {
      return NextResponse.json(
        { message: "Please complete the form and try again." },
        { status: 400 },
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Please fill out name, email, and message." },
        { status: 400 },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { message: "Message should be at least 10 characters long." },
        { status: 400 },
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    try {
      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `New portfolio message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
            <h2 style="margin: 0 0 12px;">New Contact Form Submission</h2>
            <p style="margin: 0 0 6px;"><strong>Name:</strong> ${safeName}</p>
            <p style="margin: 0 0 6px;"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin: 16px 0 6px;"><strong>Message:</strong></p>
            <p style="margin: 0; white-space: normal;">${safeMessage}</p>
          </div>
        `,
      });
    } catch (error) {
      const eventId = await reportServerError({
        area: "contact-email-send",
        message: "Failed to send message through Resend",
        meta: {
          ipAddress,
          userAgent,
          senderEmail: email,
          reason: error instanceof Error ? error.message : "unknown",
        },
      });

      return NextResponse.json(
        {
          message: "Unable to send your message right now. Please try again later.",
          eventId,
        },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 },
    );
  } catch (error) {
    const eventId = await reportServerError({
      area: "contact-api",
      message: "Unexpected contact API error",
      meta: {
        ipAddress,
        userAgent,
        reason: error instanceof Error ? error.message : "unknown",
      },
    });

    return NextResponse.json(
      {
        message: "Something went wrong while sending your message.",
        eventId,
      },
      { status: 500 },
    );
  }
}
