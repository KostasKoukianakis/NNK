import Image from "next/image";
import Link from "next/link";

const ARTICLES = [
  {
    href: "/announcements",
    image: "/images/news-1.avif",
    alt: "Νυχτερινή θέα αστικού τοπίου",
    category: "Ανακοίνωση",
    date: "1.9.26",
    title: "Ωράριο γραμματείας εξωτερικών ιατρείων στη Σούδα",
  },
  {
    href: "/contribution",
    image: "/images/news-2.avif",
    alt: "Σημαίες στον ορίζοντα",
    category: "Προσφορά",
    date: "15.8.26",
    title: "Κοινωνική προσφορά στη Σούδα και την Κρήτη",
  },
  {
    href: "/departments/ypervariki",
    image: "/images/news-3.avif",
    alt: "Κτίριο με ψηφιακή σύνθεση",
    category: "Ενημέρωση",
    date: "20.7.26",
    title: "Υπερβαρική κάλυψη του νότιου ελλαδικού χώρου",
  },
] as const;

export function HomeNewsroom() {
  return (
    <section id="newsroom" className="newsroom bg-white text-[var(--blue)]">
      <div className="newsroom-wrap px-[1.75rem] pb-[13.25em] pt-[7em]">
        <div className="newsroom-heading">
          <h2 className="newsroom-h2 font-medium text-[var(--blue)]">Ανακοινώσεις</h2>
        </div>

        <div className="cms-newsroom mt-[2em]">
          <div className="articles-grid">
            {ARTICLES.map((article) => (
              <article key={article.title} className="article-item overflow-hidden rounded-[0.25em]">
                <Link
                  href={article.href}
                  aria-label={article.title}
                  className="article-link block h-full w-full no-underline transition-[background-color] duration-[450ms]"
                >
                  <div className="image-article relative w-full overflow-hidden rounded-[0.25em]">
                    <Image
                      src={article.image}
                      alt={article.alt}
                      fill
                      sizes="(max-width: 991px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="content-article mt-[0.875em]">
                    <div className="tags-highlight mb-[0.75em] flex items-center justify-start gap-x-[0.25em]">
                      <span className="news-tag">{article.category}</span>
                      <span className="news-tag">{article.date}</span>
                    </div>
                    <div className="title-articles">
                      <h3 className="article-title font-medium text-[var(--blue)]">{article.title}</h3>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
