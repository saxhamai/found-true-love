export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="stage">
        <p className="site-footer__disclaimer">
          This is a fun relationship quiz and is not a scientifically validated
          psychological assessment.
        </p>
        <nav className="site-footer__links" aria-label="Footer">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/contact">Contact</a>
        </nav>
        <p className="site-footer__copyright">© 2026 Found True Love</p>
      </div>
    </footer>
  );
}
