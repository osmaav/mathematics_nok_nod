import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type SectionName = 'hero' | 'theory-intro' | 'nod' | 'nok' | 'calculator' | 'practice' | 'quiz';

interface ActiveSectionContextType {
  activeSection: SectionName;
  setActiveSection: (section: SectionName) => void;
}

const ActiveSectionContext = createContext<ActiveSectionContextType | undefined>(undefined);

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionName>('hero');

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  const context = useContext(ActiveSectionContext);
  if (context === undefined) {
    throw new Error('useActiveSection must be used within an ActiveSectionProvider');
  }
  return context;
}
