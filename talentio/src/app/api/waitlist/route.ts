import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, role } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email non valida." }, { status: 400 });
    }

    const validRoles = ["freelance", "pmi", "agency"];
    if (!role || !validRoles.includes(role)) {
      return NextResponse.json({ error: "Ruolo non valido." }, { status: 400 });
    }

    const { error } = await supabase
      .from("waitlist")
      .insert({ email: email.toLowerCase().trim(), role });

    if (error) {
      if (error.code === "23505") {
        // duplicate email — treat as success (don't reveal if email exists)
        return NextResponse.json({ success: true });
      }
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Errore del server. Riprova." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return NextResponse.json({ error: "Errore interno." }, { status: 500 });
  }
}
