import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { CONTACT_RETENTION_PERIOD, type ContactFormValues, validateContact } from "@/lib/contact";

export const runtime = "nodejs";

const RATE_LIMIT_MS = 60_000;
const MAX_BODY_BYTES = 32_000;
const recentSubmissions = new Map<string, number>();

function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  const normalized = value.normalize("NFKC").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/[<>]/g, "").trim().slice(0, max);
  return /^[=+@-]/.test(normalized) ? `'${normalized}` : normalized;
}

function getValues(body: Record<string, unknown>): ContactFormValues {
  return {
    service: clean(body.service, 60),
    name: clean(body.name, 80),
    organization: clean(body.organization, 120),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160),
    title: clean(body.title, 120),
    content: clean(body.content, 2000),
    method: clean(body.method, 40),
    contactTime: clean(body.contactTime, 40),
    referenceUrl: clean(body.referenceUrl, 500),
    additionalNotes: clean(body.additionalNotes, 500),
    privacyConsent: body.privacyConsent === true,
    website: clean(body.website, 120),
    submissionId: clean(body.submissionId, 100),
    sourcePage: clean(body.sourcePage, 500),
    pageUrl: clean(body.pageUrl, 500),
  };
}

function error(message: string, status: number, fields?: ReturnType<typeof validateContact>) {
  return NextResponse.json({ success: false, message, fields }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return error("입력 내용이 너무 깁니다.", 413);
  let body: Record<string, unknown>;
  try { body = await request.json(); }
  catch { return error("입력 내용을 확인해 주세요.", 400); }

  const values = getValues(body);
  if (values.website) return NextResponse.json({ success: true, receiptId: "" }, { status: 200 });
  const fields = validateContact(values);
  if (Object.keys(fields).length) return error("입력 항목을 다시 확인해 주세요.", 422, fields);

  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const agent = request.headers.get("user-agent") || "unknown";
  const fingerprint = createHash("sha256").update(`${forwarded}|${agent}`).digest("hex");
  const now = Date.now();
  for (const [key, timestamp] of recentSubmissions) if (now - timestamp > RATE_LIMIT_MS) recentSubmissions.delete(key);
  if (recentSubmissions.has(fingerprint)) return error("잠시 후 다시 시도해 주세요.", 429);
  recentSubmissions.set(fingerprint, now);

  const endpoint = process.env.CONTACT_FORM_ENDPOINT;
  if (!endpoint) {
    recentSubmissions.delete(fingerprint);
    return error("현재 온라인 접수 저장 설정이 완료되지 않았습니다. 관리자에게 저장 API 설정을 요청해 주세요.", 503);
  }

  const receiptId = `KT-${randomUUID().replace(/-/g, "").slice(0, 10).toUpperCase()}`;
  const payload = {
    receivedAt: new Date().toISOString(),
    receiptId,
    sourcePage: values.sourcePage,
    service: values.service,
    name: values.name,
    organization: values.organization,
    phone: values.phone,
    email: values.email,
    title: values.title,
    content: values.content,
    method: values.method,
    contactTime: values.contactTime,
    referenceUrl: values.referenceUrl,
    additionalNotes: values.additionalNotes,
    privacyConsent: values.privacyConsent,
    retentionPeriod: CONTACT_RETENTION_PERIOD,
    status: "신규 접수",
    userAgent: agent.slice(0, 500),
    pageUrl: values.pageUrl,
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.CONTACT_FORM_SECRET ? { "X-Contact-Secret": process.env.CONTACT_FORM_SECRET } : {}) },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const result = await response.json().catch(() => null) as { success?: boolean } | null;
    if (!response.ok || result?.success !== true) throw new Error("upstream rejected");
    return NextResponse.json({ success: true, receiptId }, { status: 201, headers: { "Cache-Control": "no-store" } });
  } catch {
    recentSubmissions.delete(fingerprint);
    return error("접수 내용을 저장하지 못했습니다. 입력 내용은 유지되므로 잠시 후 다시 시도해 주세요.", 502);
  }
}
