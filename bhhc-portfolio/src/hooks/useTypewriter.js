import { useEffect, useRef, useState } from 'react';

/**
 * Custom typewriter hook.
 * @param {string[]} strings - Array of strings to cycle through
 * @param {number} typeSpeed - ms per character (typing)
 * @param {number} deleteSpeed - ms per character (deleting)
 * @param {number} pauseAfter - ms to hold after fully typed
 */
export function useTypewriter(strings = [], typeSpeed = 80, deleteSpeed = 40, pauseAfter = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [strIdx, setStrIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const current = strings[strIdx] || '';

    if (!deleting && charIdx === current.length) {
      // Finished typing — pause then start deleting
      timeoutRef.current = setTimeout(() => setDeleting(true), pauseAfter);
      return;
    }

    if (deleting && charIdx === 0) {
      // Finished deleting — move to next string
      setDeleting(false);
      setStrIdx(prev => (prev + 1) % strings.length);
      return;
    }

    const speed = deleting ? deleteSpeed : typeSpeed;
    timeoutRef.current = setTimeout(() => {
      setCharIdx(prev => (deleting ? prev - 1 : prev + 1));
      setDisplayed(current.slice(0, deleting ? charIdx - 1 : charIdx + 1));
    }, speed);

    return () => clearTimeout(timeoutRef.current);
  }, [charIdx, deleting, strIdx, strings]);

  return displayed;
}

/**
 * useInView hook — triggers when element enters the viewport.
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
