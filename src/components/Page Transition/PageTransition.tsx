import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransition.css'; // Make sure this contains your CSS

import { ReactNode } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);
  const overlayPathRef = useRef(null);

  
  const paths = {
    step1: {
      unfilled: 'M 0 0 h 0 c 0 50 0 50 0 100 H 0 V 0 Z',
      inBetween: 'M 0 0 h 43 c -60 55 140 65 0 100 H 0 V 0 Z',
      filled: 'M 0 0 h 100 c 0 50 0 50 0 100 H 0 V 0 Z',
    },
    step2: {
      filled: 'M 100 0 H 0 c 0 50 0 50 0 100 h 100 V 50 Z',
      inBetween: 'M 100 0 H 50 c 28 43 4 81 0 100 h 50 V 0 Z',
      unfilled: 'M 100 0 H 100 c 0 50 0 50 0 100 h 0 V 0 Z',
    }
  };


  interface PageSwitchTimeline {
    (onComplete: () => void): gsap.core.Timeline;
  }

  const pageSwitchTimeline: PageSwitchTimeline = useCallback((onComplete) => {
    const tl = gsap.timeline({ paused: true, onComplete });
    tl.set(overlayPathRef.current, { attr: { d: paths.step1.unfilled } })
      .to(overlayPathRef.current, { duration: 0.8, ease: 'power3.in', attr: { d: paths.step1.inBetween } }, 0)
      .to(overlayPathRef.current, { duration: 0.2, ease: 'power1', attr: { d: paths.step1.filled }, onComplete: () => setAnimating(false) })
      .set(overlayPathRef.current, { attr: { d: paths.step2.filled } })
      .to(overlayPathRef.current, { duration: 0.15, ease: 'sine.in', attr: { d: paths.step2.inBetween } })
      .to(overlayPathRef.current, { duration: 1, ease: 'power4', attr: { d: paths.step2.unfilled } });

    return tl;
  }, [paths.step1.filled, paths.step1.inBetween, paths.step1.unfilled, paths.step2.filled, paths.step2.inBetween, paths.step2.unfilled]);

  useEffect(() => {
    if (animating) return;

    setAnimating(true);
    pageSwitchTimeline(() => setAnimating(false)).play();
  }, [location.pathname, animating, pageSwitchTimeline]);

  return (
    <div className="wrapper">
      <main>
        <div className="view view--1">
          {children}
        </div>
        <svg className="overlay" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path className="overlay__path" ref={overlayPathRef} vectorEffect="non-scaling-stroke" />
        </svg>
      </main>
    </div>
  );
};

export default PageTransition;
