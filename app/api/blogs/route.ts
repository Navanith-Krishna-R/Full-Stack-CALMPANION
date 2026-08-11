import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { getServerSession } from '@/lib/session';

const CreateBlogSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least 3 characters').max(200),
  content: z.string().trim().min(20, 'Content must be at least 20 characters').max(20000),
  category: z.string().trim().min(1, 'Category is required'),
});

// Public: list published posts, optionally filtered by category.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const posts = await prisma.blogPost.findMany({
    where: { published: true, ...(category ? { category } : {}) },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json({ posts });
}

// Requires a session — the author is the logged-in user, never client-supplied.
export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: 'Please log in to publish a post' }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = CreateBlogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    );
  }

  const post = await prisma.blogPost.create({
    data: { ...parsed.data, authorId: session.sub, published: true },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json({ message: 'Post published', post }, { status: 201 });
}
