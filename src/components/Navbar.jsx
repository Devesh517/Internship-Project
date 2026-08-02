import { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle shadow/background change once the page is scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent the page from scrolling behind the mobile nav drawer while it's open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <a
          href="#home"
          className="navbar__logo"
          onClick={(e) => handleNavClick(e, "#home")}
          aria-label="Agrios home"
        >
          <span className="navbar__logo-icon" aria-hidden="true">
            🌿
          </span>
          Agrios
        </a>

        <nav
          className={`navbar__nav ${menuOpen ? "navbar__nav--open" : ""}`}
          aria-label="Primary"
        >
          <ul className="navbar__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="btn btn--primary navbar__cta navbar__cta--mobile"
            onClick={(e) => handleNavClick(e, "#contact")}
          >
            Get A Quote
          </a>
        </nav>

        <a
          href="#contact"
          className="btn btn--primary navbar__cta navbar__cta--desktop"
          onClick={(e) => handleNavClick(e, "#contact")}
        >
          Get A Quote
        </a>

        <button
          className={`navbar__toggle ${menuOpen ? "navbar__toggle--open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;