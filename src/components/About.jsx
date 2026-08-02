import useScrollReveal from "../hooks/useScrollReveal";
import "./About.css";

const STATS = [
  { value: "25+", label: "Years Of Experience" },
  { value: "1,200", label: "Acres Cultivated" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "40+", label: "Organic Products" },
];

const HIGHLIGHTS = [
  "Certified organic farming practices",
  "Sustainable irrigation & soil care",
  "Direct farm-to-market distribution",
];

const About = () => {
  const [imgRef, imgVisible] = useScrollReveal();
  const [textRef, textVisible] = useScrollReveal();

  return (
    <section id="about" className="about section">
      <div className="container about__inner">
        <div
          ref={imgRef}
          className={`about__media reveal reveal--left ${
            imgVisible ? "reveal--visible" : ""
          }`}
        >
          <img
            src="https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=900&q=80"
            alt="Farmer inspecting organic crops in a green field"
          />
          <div className="about__media-badge">
            <span className="about__media-badge-value">25+</span>
            <span className="about__media-badge-label">Years of Growth</span>
          </div>
        </div>

        <div
          ref={textRef}
          className={`about__text reveal reveal--right ${
            textVisible ? "reveal--visible" : ""
          }`}
        >
          <p className="section__eyebrow">About Agrios</p>
          <h2 className="section__heading">
            Cultivating Healthy Food With Sustainable Roots
          </h2>
          <p className="about__paragraph">
            For over two decades, Agrios has partnered with local growers to
            produce organic fruits, vegetables, and grains using methods that
            protect the land for future generations. We believe good farming
            starts with healthy soil and ends with a healthier community.
          </p>

          <ul className="about__highlights">
            {HIGHLIGHTS.map((item) => (
              <li key={item}>
                <span className="about__check" aria-hidden="true">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="about__stats">
            {STATS.map((stat) => (
              <div className="about__stat" key={stat.label}>
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          <a href="#services" className="btn btn--primary about__cta">
            Our Services
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;