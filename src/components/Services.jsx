import useScrollReveal from "../hooks/useScrollReveal";
import "./Services.css";

const SERVICES = [
  {
    icon: "🌱",
    title: "Organic Farming",
    description:
      "Chemical-free cultivation methods that keep soil, crops, and communities healthy.",
  },
  {
    icon: "🚜",
    title: "Modern Equipment",
    description:
      "Precision machinery and smart irrigation to boost yield while saving resources.",
  },
  {
    icon: "🌾",
    title: "Harvest & Storage",
    description:
      "Careful harvesting and climate-controlled storage to preserve freshness and quality.",
  },
  {
    icon: "📦",
    title: "Farm To Market",
    description:
      "A direct distribution network that gets produce from our fields to your table fast.",
  },
  {
    icon: "💧",
    title: "Water Management",
    description:
      "Drip irrigation and rainwater harvesting systems that conserve every drop.",
  },
  {
    icon: "🐝",
    title: "Livestock & Pollination",
    description:
      "Ethical livestock care and bee-friendly practices that support a balanced ecosystem.",
  },
];

const ServiceCard = ({ service, index }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`service-card reveal reveal--up ${visible ? "reveal--visible" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="service-card__icon" aria-hidden="true">
        {service.icon}
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <a href="#contact" className="service-card__link">
        Learn More <span aria-hidden="true">→</span>
      </a>
    </div>
  );
};

const Services = () => {
  const [headRef, headVisible] = useScrollReveal();

  return (
    <section id="services" className="services section section--tint">
      <div className="container">
        <div
          ref={headRef}
          className={`section__head reveal reveal--up ${
            headVisible ? "reveal--visible" : ""
          }`}
        >
          <p className="section__eyebrow">What We Do</p>
          <h2 className="section__heading">Our Farming Services</h2>
          <p className="section__subtext">
            From soil to shelf, we offer end-to-end agricultural services built
            on sustainable, organic principles.
          </p>
        </div>

        <div className="services__grid">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;