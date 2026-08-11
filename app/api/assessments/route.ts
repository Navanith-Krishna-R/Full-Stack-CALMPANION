import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from '@/lib/session';
import { scoreAssessment } from '@/lib/assessment-scoring';

const SubmitAssessmentSchema = z.object({
  quizType: z.string().min(1),
  quizName: z.string().min(1),
  answers: z.record(z.string(), z.string()).refine((a) => Object.keys(a).length > 0, {
    message: 'At least one answer is required',
  }),
});

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'Please log in to save your assessment result' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = SubmitAssessmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    );
  }

  const { quizType, quizName, answers } = parsed.data;
  const { score, summary } = scoreAssessment(quizName, answers);

  const result = await prisma.assessmentResult.create({
    data: { userId: session.sub, quizType, answers, score, summary },
  });

  return NextResponse.json({ result }, { status: 201 });
}

// Lists only the authenticated caller's own past assessment results.
export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'Please log in to view your assessment history' }, { status: 401 });
  }

  const results = await prisma.assessmentResult.findMany({
    where: { userId: session.sub },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ results });
}
