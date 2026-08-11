import Link from 'next/link';
import {
  ArrowRight, Shield, HeartHandshake, Sparkles, Stethoscope, Calendar,
  ClipboardList, BookOpen, Users, Lock, ArrowUpRight,
} from 'lucide-react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import HeroScene from '@/components/hero/HeroScene';
import Reveal from '@/components/motion/Reveal';
import { prisma } from '@/lib/prisma';

// Renders per-request rather than being statically prerendered at build
// time — the homepage shows live blog posts, and we don't want `next build`
// itself to depend on a reachable database.
export const dynamic = 'force-dynamic';

async function getLatestPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: { author: { select: { name: true } } },
    });
  } catch {
    return [];
  }
}

export default async function Home() {
  const posts = await getLatestPosts();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* ---------------- Hero ---------------- */}
        <section className="relative overflow-hidden pt-36 pb-20 px-6 bg-organic-gradient">
          {/* min-w-0 on every grid item below: grid/flex children default to a
              min-width equal to their content's natural size, which can silently
              force a track wider than the viewport — the overflow then gets
              clipped by this section's overflow-hidden instead of wrapping,
              which is what was cutting off text and the 3D scene on narrow
              screens. min-w-0 lets them shrink and wrap normally instead. */}
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-sm font-medium text-primary mb-6 animate-fade-in">
                <Sparkles className="w-3.5 h-3.5" /> A calmer kind of care
              </span>
              <h1 className="text-5xl md:text-6xl font-display font-medium text-foreground mb-6 leading-[1.08] text-balance animate-fade-up">
                A calmer space for your mental wellbeing.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed animate-fade-up [animation-delay:100ms]">
                CALMPANION brings self-assessments, licensed professionals, and thoughtful resources
                into one gentle, private place — so taking care of your mind feels a little easier.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-up [animation-delay:200ms]">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-semibold hover:bg-sage-800 transition shadow-sm"
                >
                  Begin Your Journey <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center gap-2 border border-border px-7 py-3.5 rounded-full font-semibold text-foreground hover:border-primary hover:text-primary transition"
                >
                  Explore Resources
                </Link>
              </div>
            </div>

            {/* Signature 3D moment — sized per breakpoint so the scene reshapes
                cleanly on small screens instead of just clipping. */}
            <div className="relative min-w-0 w-full h-[16rem] sm:h-[20rem] md:h-[24rem] lg:h-[28rem]">
              <HeroScene />
            </div>
          </div>
        </section>

        {/* ---------------- What CALMPANION provides ---------------- */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal className="max-w-2xl mb-14">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Everything you need, held in one calm place
              </h2>
              <p className="text-muted-foreground text-lg">
                No clutter, no clinical coldness — just the tools that actually help, presented gently.
              </p>
            </Reveal>

            <div className="grid md:grid-cols-6 gap-6">
              <Reveal className="min-w-0 md:col-span-4 md:row-span-2" delay={0}>
                <Link
                  href="/survey"
                  className="group relative h-full min-h-[20rem] rounded-3xl bg-sage-800 text-white p-10 flex flex-col justify-between overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/5" />
                  <div className="absolute -right-4 top-24 w-32 h-32 rounded-full bg-white/5" />
                  <ClipboardList className="w-10 h-10 relative" />
                  <div className="relative">
                    <h3 className="text-2xl font-display font-medium mb-2">Self-Assessment</h3>
                    <p className="text-white/75 max-w-sm mb-4">
                      Confidential, informational screeners that help you understand what you&apos;re feeling —
                      with clear, judgment-free next steps.
                    </p>
                    <span className="inline-flex items-center gap-1 font-semibold group-hover:gap-2 transition-all">
                      Take an assessment <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>

              <Reveal className="min-w-0 md:col-span-2" delay={80}>
                <Link
                  href="/book-appointment"
                  className="glow-card group h-full rounded-3xl bg-card border border-border p-8 flex flex-col justify-between"
                >
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Book Appointments</h3>
                    <p className="text-sm text-muted-foreground">Schedule time with a licensed professional in minutes.</p>
                  </div>
                </Link>
              </Reveal>

              <Reveal className="min-w-0 md:col-span-2" delay={140}>
                <Link
                  href="/write-blog"
                  className="glow-card group h-full rounded-3xl bg-card border border-border p-8 flex flex-col justify-between"
                >
                  <BookOpen className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">Share &amp; Read Stories</h3>
                    <p className="text-sm text-muted-foreground">A supportive blog written by the community, for the community.</p>
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- Core services (circular icons, refined) ---------------- */}
        <section className="py-24 px-6 bg-mist/60 dark:bg-secondary/30">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
            {[
              { icon: BookOpen, title: 'Expert Resources', desc: 'Professionally written guides and articles to support your wellness journey.' },
              { icon: Stethoscope, title: 'Professional Care', desc: 'Connect with licensed therapists and mental health professionals.' },
              { icon: Calendar, title: 'Easy Scheduling', desc: 'Book sessions at your convenience with a simple, guided flow.' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100} className="text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-background border border-border flex items-center justify-center mb-6 shadow-sm">
                  <item.icon className="w-9 h-9 text-primary" />
                </div>
                <h3 className="text-xl font-display font-medium mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Professional support (editorial split) ---------------- */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <Reveal className="min-w-0">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">Professional Support</span>
              <h2 className="text-3xl md:text-4xl font-display font-medium mt-3 mb-5 text-balance">
                Real professionals, not just a chatbot
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                When you&apos;re ready for more than self-guided tools, CALMPANION connects you with licensed
                therapists and counselors — and lets you book time with them directly.
              </p>
              <Link
                href="/meet-doctors"
                className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
              >
                Meet our professionals <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
            <Reveal delay={100} className="min-w-0 grid grid-cols-2 gap-4 items-start">
              <div className="rounded-3xl bg-sky-100 dark:bg-sky-900/50 p-6 h-36 flex flex-col justify-end gap-2">
                <HeartHandshake className="w-7 h-7 text-sage-700 dark:text-sky-200" />
                <span className="font-medium text-foreground">Compassionate Care</span>
              </div>
              <div className="rounded-3xl bg-lavender-100 dark:bg-lavender-900/50 p-6 h-36 flex flex-col justify-end gap-2">
                <Users className="w-7 h-7 text-sage-700 dark:text-lavender-200" />
                <span className="font-medium text-foreground">Community Support</span>
              </div>
              <div className="rounded-3xl bg-sage-100 dark:bg-sage-900/50 p-6 h-36 flex flex-col justify-end gap-2 col-span-2">
                <Shield className="w-7 h-7 text-sage-700 dark:text-sage-200" />
                <span className="font-medium text-foreground">Licensed &amp; Verified Professionals</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Resources / Blog (real data) ---------------- */}
        <section className="py-24 px-6 bg-mist/60 dark:bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">From the Blog</span>
                <h2 className="text-3xl md:text-4xl font-display font-medium mt-3">Stories &amp; insights</h2>
              </div>
              <Link href="/blogs" className="inline-flex items-center gap-1 font-semibold text-primary hover:gap-2 transition-all">
                View all posts <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>

            {posts.length === 0 ? (
              <p className="text-muted-foreground">
                No posts yet —{' '}
                <Link href="/write-blog" className="text-primary font-semibold">be the first to write one</Link>.
              </p>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post, i) => (
                  <Reveal key={post.id} delay={i * 80}>
                    <Link href={`/blogs/${post.id}`} className="group block bg-card rounded-2xl border border-border p-6 h-full hover:shadow-md hover:border-primary/40 transition">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wide">{post.category}</span>
                      <h3 className="text-lg font-semibold mt-3 mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.content}</p>
                      <span className="text-sm text-muted-foreground">by {post.author.name}</span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ---------------- Trust & safety ---------------- */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <Reveal className="max-w-2xl mb-14">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">Trust &amp; Safety</span>
              <h2 className="text-3xl md:text-4xl font-display font-medium mt-3">Your privacy, protected by design</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Lock, title: 'Private by default', desc: 'Your account, appointments, and assessment results are visible only to you.' },
                { icon: Shield, title: 'Securely stored', desc: 'Passwords are hashed, sessions are signed, and secrets never live in client code.' },
                { icon: HeartHandshake, title: 'No fake claims', desc: 'Assessments are informational only — never presented as a medical diagnosis.' },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 100} className="p-6 rounded-2xl border border-border">
                  <item.icon className="w-7 h-7 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Final CTA ---------------- */}
        <section className="py-24 px-6">
          <Reveal className="max-w-7xl mx-auto rounded-[2.5rem] bg-sage-800 px-8 py-16 md:py-20 text-center text-white relative overflow-hidden">
            <div className="absolute -left-16 -top-16 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -right-10 -bottom-20 w-72 h-72 rounded-full bg-white/5" />
            <h2 className="relative text-3xl md:text-4xl font-display font-medium mb-4 text-balance">
              Start your journey today
            </h2>
            <p className="relative text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Take the first step toward better mental wellbeing. CALMPANION is ready when you are.
            </p>
            <Link
              href="/register"
              className="relative inline-flex items-center gap-2 bg-white text-sage-800 px-8 py-3.5 rounded-full font-semibold hover:bg-sage-50 transition"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </section>
      </main>

      <Footer />
    </div>
  );
}
