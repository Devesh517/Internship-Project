import { useState } from "react";
import "./Footer.css";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: "f" },
  { label: "Twitter", href: "https://twitter.com", icon: "t" },
  { label: "Instagram", href: "https://instagram.com", icon: "ig" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "in" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // No backend wired up yet — this is where a subscribe API call would go.
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer__top">
        <div className="footer__brand">
          <a href="#home" className="footer__logo" onClick={(e) => handleNavClick(e, "#home")}>
            <span aria-hidden="true">🌿</span> Agrios
          </a>
          <p className="footer__tagline">
            Growing organic food with sustainable practices that care for the
            land, the water, and the people who depend on them.
          </p>
          <ul className="footer__social">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__links">
          <h4>Quick Links</h4>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__newsletter">
          <h4>Newsletter</h4>
          <p>Subscribe for seasonal harvest updates and farm news.</p>
          <form onSubmit={handleSubscribe} className="footer__newsletter-form">
            <label htmlFor="newsletter-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn--primary">
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="footer__newsletter-success" role="status">
              You're subscribed — thanks for joining us!
            </p>
          )}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} Agrios. All rights reserved.</p>
          <p>Designed with care for sustainable farming.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;