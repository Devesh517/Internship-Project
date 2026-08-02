import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal
 * Returns a ref to attach to any element and a boolean that becomes
 * true once the element scrolls into view. Used to drive fade-in /
 * slide-up animations without any external animation library.
 */
const useScrollReveal = (options = { threshold: 0.15 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(node);
      }
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isVisible];
};

export default useScrollReveal;
