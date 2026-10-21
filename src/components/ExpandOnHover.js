// Wraps a lightbox image and shows an "Expand" label in its lower right corner on hover
export default function ExpandOnHover({ children }) {
  return (
    <div className="relative group">
      {children}
      <span className="pointer-events-none absolute bottom-3 right-4 text-base underline underline-offset-4 text-white drop-shadow opacity-0 group-hover:opacity-100 transition-opacity">
        Expand
      </span>
    </div>
  );
}
