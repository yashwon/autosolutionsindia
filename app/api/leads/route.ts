import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      business_type,
      message,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin.from("leads").insert([
      {
        name,
        email,
        phone,
        business_type: business_type || null,
        message: message || null,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ lead: data?.[0] ?? null }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to save lead.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
