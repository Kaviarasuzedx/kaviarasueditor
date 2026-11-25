export default function MarketingLoading() {
  return (
    <div className="site-container min-h-[55svh] py-24" aria-label="Loading page" role="status">
      <div className="work-skeleton h-4 w-32 rounded-full" aria-hidden="true" />
      <div className="work-skeleton mt-8 h-16 max-w-[680px] rounded-xl sm:h-24" aria-hidden="true" />
      <div className="work-skeleton mt-5 h-5 max-w-[470px] rounded-full" aria-hidden="true" />
      <span className="sr-only">Loading content…</span>
    </div>
  );
}
