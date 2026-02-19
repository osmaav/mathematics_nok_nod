export interface FactorizationResult {
  number: number;
  factors: number[];
  factorization: string;
}

export interface CalculationStep {
  description: string;
  formula?: string;
  result?: string;
}

export interface CalculationResult {
  type: 'nod' | 'nok';
  numbers: number[];
  result: number;
  factorizations: FactorizationResult[];
  steps: CalculationStep[];
}

export interface PracticeTask {
  id: number;
  type: 'nod' | 'nok';
  difficulty: 'easy' | 'medium' | 'hard';
  numbers: number[];
  answer: number;
  hint: string;
  solution: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface NavItem {
  label: string;
  href: string;
}
