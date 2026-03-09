import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { username, email, reason } = await request.json();

    if (!username?.trim() || !email?.trim()) {
      return NextResponse.json(
        { error: 'El nombre de usuario y el email son obligatorios.' },
        { status: 400 },
      );
    }

    const { error } = await supabase.from('account_deletion_requests').insert({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      reason: reason?.trim() || null,
      status: 'pending',
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Error al registrar la solicitud. Inténtalo de nuevo más tarde.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Error al procesar la solicitud.' },
      { status: 500 },
    );
  }
}
