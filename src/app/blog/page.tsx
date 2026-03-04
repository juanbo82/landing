import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { BlogPost } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Blog — Artículos sobre CrossFit y Fitness',
  description:
    'Artículos, guías y noticias sobre CrossFit, entrenamiento funcional, nutrición y la comunidad StreetWOD.',
};

export const revalidate = 600;

async function getBlogPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, cover_image_url, author_name, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(20);
  return (data || []) as BlogPost[];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section className="py-10 px-5">
      <div className="max-w-4xl mx-auto">
        <span className="inline-block font-oswald text-[10px] font-semibold tracking-[0.2em] text-accent bg-accent-15 px-2.5 py-1 rounded mb-4">
          BLOG
        </span>
        <h1 className="font-oswald text-3xl md:text-5xl font-bold uppercase mb-2">
          Blog
        </h1>
        <p className="text-text-secondary mb-10 max-w-xl">
          Artículos, guías y noticias sobre CrossFit y la comunidad StreetWOD.
        </p>

        {posts.length === 0 ? (
          <div className="bg-surface border border-border rounded-lg p-8 text-center text-text-tertiary">
            No hay artículos publicados aún. ¡Vuelve pronto!
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row gap-5 bg-surface border border-border rounded-lg p-5 hover:border-accent-30 transition-colors"
              >
                {post.cover_image_url && (
                  <div className="sm:w-48 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={post.cover_image_url}
                      alt={post.title}
                      width={192}
                      height={128}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="font-oswald text-lg font-semibold tracking-wide group-hover:text-accent transition-colors mb-1">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-text-tertiary">
                    <span>{post.author_name}</span>
                    <span>·</span>
                    <span>
                      {new Date(post.published_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
