/** Next.js route-level suspense skeleton while the Work page is streaming. */
export default function WorkLoading() {
  return (
    <section className="site-container pb-24 pt-16 sm:pt-28" aria-label="Loading work portfolio" aria-busy="true">
      <div className="work-skeleton mb-6 h-4 w-40 rounded" />
      <div className="work-skeleton mb-4 h-20 w-full max-w-2xl rounded-lg sm:h-24" />
      <div className="work-skeleton mb-12 h-20 w-4/5 max-w-xl rounded-lg sm:h-24" />
      <div className="mb-12 flex flex-wrap gap-3">
        {Array.from({ length: 7 }, (_, i) => <div key={i} className="work-skeleton h-11 w-24 rounded-full" />)}
      </div>
      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i}>
            <div className={`work-skeleton rounded-card ${i % 3 === 1 ? "aspect-[4/5]" : "aspect-[16/11]"}`} />
            <div className="work-skeleton mt-5 h-5 w-3/5 rounded" />
            <div className="work-skeleton mt-3 h-4 w-5/6 rounded" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading portfolio project cards…</span>
    </section>
  );
}
