import { useState } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Contact.css";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const CONTACT_INFO = [
  {
    icon: "📍",
    label: "Our Address",
    value: "1420 Meadowbrook Road, Greenfield, CA 93012",
  },
  {
    icon: "📞",
    label: "Phone Number",
    value: "+1 (555) 234-7890",
  },
  {
    icon: "✉️",
    label: "Email Address",
    value: "hello@agrios-farms.com",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [ref, visible] = useScrollReveal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Please enter a subject.";
    if (!formData.message.trim()) newErrors.message = "Please enter a message.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No backend wired up yet — this is where an API call would go.
      setSubmitted(true);
      setFormData(INITIAL_FORM);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div
          ref={ref}
          className={`section__head reveal reveal--up ${visible ? "reveal--visible" : ""}`}
        >
          <p className="section__eyebrow">Get In Touch</p>
          <h2 className="section__heading">Contact Us</h2>
          <p className="section__subtext">
            Have a question about our produce or want to partner with us? Send
            a message and our team will get back to you shortly.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            {CONTACT_INFO.map((item) => (
              <div className="contact__info-card" key={item.label}>
                <span className="contact__info-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <span className="contact__info-label">{item.label}</span>
                  <span className="contact__info-value">{item.value}</span>
                </div>
              </div>
            ))}

            <div className="contact__map" role="img" aria-label="Map showing farm location placeholder">
              <span>Map Placeholder — embed Google Maps here</span>
            </div>
          </div>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__form-row">
              <div className="contact__field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <span className="contact__error" id="name-error">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="contact__field">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <span className="contact__error" id="email-error">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            <div className="contact__field">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? "subject-error" : undefined}
              />
              {errors.subject && (
                <span className="contact__error" id="subject-error">
                  {errors.subject}
                </span>
              )}
            </div>

            <div className="contact__field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
              />
              {errors.message && (
                <span className="contact__error" id="message-error">
                  {errors.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn--primary contact__submit">
              Send Message
            </button>

            {submitted && (
              <p className="contact__success" role="status">
                Thanks! Your message has been sent — we'll be in touch soon.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;