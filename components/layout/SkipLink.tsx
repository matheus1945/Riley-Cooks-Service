export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-(--radius-btn) bg-blue-500 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    >
      Skip to content
    </a>
  );
}
