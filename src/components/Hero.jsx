import { useState, useEffect, useCallback } from "react";
import "./Hero.css";

const SLIDES = [
  {
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80",
    subheading: "100% Organic & Natural",
    heading: "Growing A Greener Tomorrow, Together",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1600&q=80",
    subheading: "Sustainable Agriculture",
    heading: "Fresh Harvest From Farm To Your Table",
  },
  {
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1600&q=80",
    subheading: "Trusted Since 1998",
    heading: "Modern Farming For A Healthier Planet",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance the slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const handleCtaClick = (e) => {
    e.preventDefault();
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      {SLIDES.map((slide, index) => (
        <div
          key={slide.image}
          className={`hero__slide ${index === current ? "hero__slide--active" : ""}`}
          style={{ backgroundImage: `url(${slide.image})` }}
          aria-hidden={index !== current}
        />
      ))}

      <div className="hero__overlay" />

      <div className="hero__content container">
        <p className="hero__eyebrow">{SLIDES[current].subheading}</p>
        <h1 className="hero__heading">{SLIDES[current].heading}</h1>
        <p className="hero__text">
          We cultivate organic produce with sustainable methods that protect the
          soil, the water, and the communities who depend on them.
        </p>
        <div className="hero__actions">
          <a href="#about" className="btn btn--primary" onClick={handleCtaClick}>
            Discover More
          </a>
          <a href="#contact" className="btn btn--outline-light">
            Contact Us
          </a>
        </div>
      </div>

      <div className="hero__controls">
        <button className="hero__arrow" onClick={prev} aria-label="Previous slide">
          ‹
        </button>
        <div className="hero__dots">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.image}
              className={`hero__dot ${index === current ? "hero__dot--active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button className="hero__arrow" onClick={next} aria-label="Next slide">
          ›
        </button>
      </div>
    </section>
  );
};

export default Hero;