import { useState, useMemo } from "react";
import useScrollReveal from "../hooks/useScrollReveal";
import "./Projects.css";

const CATEGORIES = ["All", "Organic Farms", "Irrigation", "Livestock"];

const PROJECTS = [
  {
    id: 1,
    title: "Green Valley Organic Farm",
    category: "Organic Farms",
    image:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Sunrise Drip Irrigation",
    category: "Irrigation",
    image:
      "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Meadowbrook Dairy Farm",
    category: "Livestock",
    image:
      "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Heritage Grain Fields",
    category: "Organic Farms",
    image:
      "https://images.unsplash.com/photo-1470162656305-1e7ca38f8f9d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Rainwater Harvest System",
    category: "Irrigation",
    image:
      "https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Free-Range Poultry Farm",
    category: "Livestock",
    image:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=800&q=80",
  },
];

const ProjectCard = ({ project, index }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <figure
      ref={ref}
      className={`project-card reveal reveal--up ${visible ? "reveal--visible" : ""}`}
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <img src={project.image} alt={project.title} loading="lazy" />
      <figcaption className="project-card__overlay">
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__title">{project.title}</span>
      </figcaption>
    </figure>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [headRef, headVisible] = useScrollReveal();

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="projects section">
      <div className="container">
        <div
          ref={headRef}
          className={`section__head reveal reveal--up ${
            headVisible ? "reveal--visible" : ""
          }`}
        >
          <p className="section__eyebrow">Our Work</p>
          <h2 className="section__heading">Recent Projects</h2>
          <p className="section__subtext">
            A look at the farms and systems we've helped design, plant, and
            grow across the region.
          </p>
        </div>

        <div className="projects__filters" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              className={`projects__filter ${
                activeCategory === category ? "projects__filter--active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;