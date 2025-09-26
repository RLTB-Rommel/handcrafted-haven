export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
      <p>© {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
    </footer>
  );
}