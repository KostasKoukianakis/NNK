export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-white"
    >
      Μετάβαση στο περιεχόμενο
    </a>
  );
}
