import { NextResponse } from "next/server";

const CLERK_FRONTEND_API = "https://clerk.qualitypaintpalace.store";

export async function GET(req, { params }) {
  const url = `${CLERK_FRONTEND_API}/${params.path.join("/")}`;

  const res = await fetch(url, {
    headers: {
      ...Object.fromEntries(req.headers),
      "User-Agent": "Next.js Clerk Proxy",
    },
    cache: "no-store",
  });

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: res.headers,
  });
}

export async function POST(req, { params }) {
  const url = `${CLERK_FRONTEND_API}/${params.path.join("/")}`;
  const body = await req.text();

  const res = await fetch(url, {
    method: "POST",
    headers: {
      ...Object.fromEntries(req.headers),
      "User-Agent": "Next.js Clerk Proxy",
    },
    body,
  });

  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: res.headers,
  });
}
