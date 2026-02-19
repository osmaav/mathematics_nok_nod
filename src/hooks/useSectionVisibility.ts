import { useEffect } from 'react';
import { useActiveSection } from '@/contexts/ActiveSectionContext';

interface UseSectionVisibilityProps {
  sectionId: string;
}

export function useSectionVisibility({ sectionId }: UseSectionVisibilityProps) {
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(sectionId as any);
          }
        });
      },
      {
        root: null,
        rootMargin: '-40% 0px -55% 0px', // Активная секция когда видна в средней части экрана
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, setActiveSection]);
}
