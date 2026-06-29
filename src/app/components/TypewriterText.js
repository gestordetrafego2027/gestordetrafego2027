'use client';
import { useEffect, useRef, useState } from 'react';

export default function TypewriterText({ text, delay = 0, speed = 32, className = '', tag: Tag = 'span' }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    clearTimeout(timerRef.current);
    clearTimeout(startRef.current);

    startRef.current = setTimeout(() => {
      let i = 0;
      const type = () => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
          if (i <= text.length) timerRef.current = setTimeout(type, speed);
          else setDone(true);
        }
      };
      type();
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
      clearTimeout(startRef.current);
    };
  }, [text, delay, speed]);

  return (
    <Tag className={className}>
      {displayed}
      {!done && <span className="hmzt-cursor">|</span>}
    </Tag>
  );
}
