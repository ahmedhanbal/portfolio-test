import { NextResponse } from 'next/server';
import { db } from '@/lib/db/schema';
import { blogPosts } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.published_at));
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content } = body;

    const post = await db.insert(blogPosts).values({
      title,
      slug,
      excerpt,
      content,
    }).returning();

    return NextResponse.json({ post: post[0] });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 