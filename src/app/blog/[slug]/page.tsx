import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/types';
import DownloadCTA from '@/components/DownloadCTA';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Artículo no encontrado' };

  return {
    title: post.title,
    description: post.excerpt || `${post.title} — Blog de StreetWOD`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
      type: 'article',
      publishedTime: post.published_at,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article className="py-10 px-5">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-text-tertiary hover:text-accent transition-colors mb-6"
          >
            ← Volver al blog
          </Link>

          {post.cover_image_url && (
            <div className="rounded-lg overflow-hidden mb-8">
              <Image
                src={post.cover_image_url}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <h1 className="font-oswald text-3xl md:text-4xl font-bold uppercase mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-text-tertiary mb-8 pb-6 border-b border-border">
            <span>{post.author_name}</span>
            <span>·</span>
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>

          <div
            className="prose prose-invert prose-sm max-w-none
              prose-headings:font-oswald prose-headings:tracking-wide prose-headings:uppercase
              prose-p:text-text-secondary prose-p:leading-relaxed
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-strong:text-text-primary
              prose-li:text-text-secondary"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      <DownloadCTA />
    </>
  );
}
