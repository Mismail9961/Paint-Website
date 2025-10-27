// app/api/clerk/[...path]/route.js
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const url = `https://clerk.qualitypaintpalace.store/${params.path.join("/")}`;
  const res = await fetch(url, {
    headers: req.headers,
  });
  const data = await res.text();
  return new NextResponse(data, { status: res.status });
}

export async function POST(req, { params }) {
  const url = `https://clerk.qualitypaintpalace.store/${params.path.join("/")}`;
  const body = await req.text();
  const res = await fetch(url, {
    method: "POST",
    headers: req.headers,
    body,
  });
  const data = await res.text();
  return new NextResponse(data, { status: res.status });
}
