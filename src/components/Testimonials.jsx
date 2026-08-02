import { useState, useEffect, useCallback, useRef } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Restaurant Owner",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "Agrios has completely changed how we source produce. The quality is unmatched and it's clear every crop is grown with real care for the land.",
  },
  {
    id: 2,
    name: "David Carter",
    role: "Local Grocer",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Reliable, fresh, and always on time. Their farm-to-market pipeline is the smoothest we've worked with in fifteen years of business.",
  },
  {
    id: 3,
    name: "Emily Zhao",
    role: "Nutritionist",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "I recommend Agrios to every client who asks about clean, organic sourcing. Their transparency about farming methods says it all.",
  },
  {
    id: 4,
    name: "James Alvarez",
    role: "Community Co-op Lead",
    photo: "https://randomuser.me/api/portraits/men/76.jpg",
    quote:
      "Partnering with Agrios helped our co-op double the amount of fresh produce we bring to underserved neighborhoods each month.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [headRef, headVisible] = useScrollReveal();
  const touchStartX = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent((index + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance every 7 seconds, pauses are not tracked to keep this simple
  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta > 50) prev();
    if (delta < -50) next();
    touchStartX.current = null;
  };

  return (
    <section id="testimonials" className="testimonials section section--forest">
      <div className="container">
        <div
          ref={headRef}
          className={`section__head section__head--light reveal reveal--up ${
            headVisible ? "reveal--visible" : ""
          }`}
        >
          <p className="section__eyebrow section__eyebrow--light">Testimonials</p>
          <h2 className="section__heading section__heading--light">
            What Our Clients Say
          </h2>
        </div>

        <div
          className="testimonials__carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="testimonials__arrow testimonials__arrow--prev"
            onClick={prev}
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          <div className="testimonials__track">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${
                  index === current ? "testimonial-card--active" : ""
                }`}
                aria-hidden={index !== current}
              >
                <p className="testimonial-card__quote">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="testimonial-card__person">
                  <img src={testimonial.photo} alt={testimonial.name} />
                  <div>
                    <span className="testimonial-card__name">{testimonial.name}</span>
                    <span className="testimonial-card__role">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="testimonials__arrow testimonials__arrow--next"
            onClick={next}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        <div className="testimonials__dots">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.id}
              className={`testimonials__dot ${
                index === current ? "testimonials__dot--active" : ""
              }`}
              onClick={() => goTo(index)}
              aria-label={`Show testimonial from ${testimonial.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;