export function SiteRow({ site, index, rowRef }) {
  function handleOpen() {
    window.open(site.url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div ref={rowRef} className="site-row" style={{ opacity: 0 }}>
      <span className="site-row-num" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="site-row-info">
        <span className="site-row-name">{site.name}</span>
        <span className="site-row-desc">{site.desc}</span>
      </div>

      <span className="site-row-badge">{site.badge}</span>

      <button
        className="site-row-open"
        onClick={handleOpen}
        aria-label={`Open ${site.name}`}
      >
        Open ↗
      </button>
    </div>
  );
}
