import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const OBJECT_ID_RE = /^[a-f\d]{24}$/i;

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!OBJECT_ID_RE.test(params.id)) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  const post = await prisma.blogPost.findFirst({
    where: { id: params.id, published: true },
    include: { author: { select: { name: true } } },
  });

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }

  return NextResponse.json({ post });
}
