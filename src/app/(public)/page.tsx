import { createClient } from '@/lib/server';
import Contact from "@/components/contact";
import Hero from "@/components/hero";
import Identity from "@/components/identity";
import Leadership from "@/components/leadership";
import Philosophy from "@/components/philosophy";
import Services from "@/components/services";
import NewsGrid from "@/components/newsSection";
import Partners from '@/components/partners';

export default async function Home() {
  const supabase = await createClient();

  // Fetch the latest 3 published articles
  const { data: articles } = await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3);

  return (
    <>
      <Hero />
      <Identity />
      <Services />
      <Philosophy />
      <Leadership />
      <section style={{
        backgroundColor: '#0F172A',
        padding: '6rem 0',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div className="container">
          <NewsGrid articles={articles || []} variant="home" />
        </div>
      </section>
      <Partners />
      <Contact />
    </>
  );
}