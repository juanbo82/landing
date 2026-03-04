import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const exerciseId = searchParams.get('exercise') || 'back_squat';
  const country = searchParams.get('country') || 'all';
  const gender = searchParams.get('gender') || 'all';

  let query = supabase
    .from('leaderboard_view')
    .select(
      'rm_id, user_id, username, weight, country, gender, avatar_url, video_url, is_verified, likes, fakes',
    )
    .eq('exercise_id', exerciseId)
    .eq('is_verified', true)
    .order('weight', { ascending: false })
    .limit(50);

  if (country !== 'all') query = query.eq('country', country);
  if (gender !== 'all') query = query.eq('gender', gender);

  const { data } = await query;
  if (!data) return NextResponse.json([]);

  let position = 0;
  const result = data
    .map((entry) => {
      const likes = entry.likes || 0;
      const fakes = entry.fakes || 0;
      const isValid = fakes < likes + 5;
      if (isValid) position++;
      return { ...entry, likes, fakes, is_valid: isValid, position: isValid ? position : undefined };
    })
    .filter((e) => e.is_valid);

  return NextResponse.json(result);
}
