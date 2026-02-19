// Prime factorization of a number
export function primeFactorization(n: number): number[] {
  const factors: number[] = [];
  let num = Math.abs(n);
  
  for (let i = 2; i <= Math.sqrt(num); i++) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }
  
  if (num > 1) {
    factors.push(num);
  }
  
  return factors;
}

// Format factorization as string (e.g., "2² × 3")
export function formatFactorization(factors: number[]): string {
  if (factors.length === 0) return '1';
  
  const counts: Record<number, number> = {};
  factors.forEach(f => {
    counts[f] = (counts[f] || 0) + 1;
  });
  
  return Object.entries(counts)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([prime, count]) => count === 1 ? prime : `${prime}^${count}`)
    .join(' × ');
}

// Calculate GCD (НОД) using prime factorization
export function calculateNOD(a: number, b: number): number {
  const factorsA = primeFactorization(a);
  const factorsB = primeFactorization(b);
  
  const countsA: Record<number, number> = {};
  const countsB: Record<number, number> = {};
  
  factorsA.forEach(f => countsA[f] = (countsA[f] || 0) + 1);
  factorsB.forEach(f => countsB[f] = (countsB[f] || 0) + 1);
  
  let nod = 1;
  const commonPrimes = new Set([...Object.keys(countsA), ...Object.keys(countsB)].map(Number));
  
  commonPrimes.forEach(prime => {
    if (countsA[prime] && countsB[prime]) {
      const minCount = Math.min(countsA[prime], countsB[prime]);
      nod *= Math.pow(prime, minCount);
    }
  });
  
  return nod;
}

// Calculate LCM (НОК) using prime factorization
export function calculateNOK(a: number, b: number): number {
  const factorsA = primeFactorization(a);
  const factorsB = primeFactorization(b);
  
  const countsA: Record<number, number> = {};
  const countsB: Record<number, number> = {};
  
  factorsA.forEach(f => countsA[f] = (countsA[f] || 0) + 1);
  factorsB.forEach(f => countsB[f] = (countsB[f] || 0) + 1);
  
  let nok = 1;
  const allPrimes = new Set([...Object.keys(countsA), ...Object.keys(countsB)].map(Number));
  
  allPrimes.forEach(prime => {
    const maxCount = Math.max(countsA[prime] || 0, countsB[prime] || 0);
    nok *= Math.pow(prime, maxCount);
  });
  
  return nok;
}

// Calculate GCD for multiple numbers
export function calculateNODMultiple(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return numbers[0];
  
  return numbers.reduce((acc, num) => calculateNOD(acc, num));
}

// Calculate LCM for multiple numbers
export function calculateNOKMultiple(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  if (numbers.length === 1) return numbers[0];
  
  return numbers.reduce((acc, num) => calculateNOK(acc, num));
}

// Euclidean algorithm for GCD (with steps)
export function euclideanAlgorithm(a: number, b: number): { result: number; steps: { a: number; b: number; q: number; r: number }[] } {
  const steps: { a: number; b: number; q: number; r: number }[] = [];
  let x = Math.abs(a);
  let y = Math.abs(b);
  
  while (y !== 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    steps.push({ a: x, b: y, q, r });
    x = y;
    y = r;
  }
  
  return { result: x, steps };
}

// Get all divisors of a number
export function getDivisors(n: number): number[] {
  const divisors: number[] = [];
  const num = Math.abs(n);
  
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      divisors.push(i);
      if (i !== num / i) {
        divisors.push(num / i);
      }
    }
  }
  
  return divisors.sort((a, b) => a - b);
}

// Get common divisors of two numbers
export function getCommonDivisors(a: number, b: number): number[] {
  const divisorsA = getDivisors(a);
  const divisorsB = getDivisors(b);
  return divisorsA.filter(d => divisorsB.includes(d));
}

// Get multiples of a number up to a limit
export function getMultiples(n: number, limit: number = 100): number[] {
  const multiples: number[] = [];
  const num = Math.abs(n);
  
  for (let i = 1; i * num <= limit; i++) {
    multiples.push(i * num);
  }
  
  return multiples;
}

// Get common multiples of two numbers up to a limit
export function getCommonMultiples(a: number, b: number, limit: number = 200): number[] {
  const multiplesA = getMultiples(a, limit);
  const multiplesB = getMultiples(b, limit);
  return multiplesA.filter(m => multiplesB.includes(m));
}

// Generate practice tasks
export function generatePracticeTasks(): import('@/types').PracticeTask[] {
  return [
    { id: 1, type: 'nod', difficulty: 'easy', numbers: [12, 18], answer: 6, hint: 'Разложите числа на простые множители: 12 = 2² × 3, 18 = 2 × 3²', solution: 'НОД(12, 18) = 2 × 3 = 6' },
    { id: 2, type: 'nod', difficulty: 'easy', numbers: [24, 36], answer: 12, hint: 'Разложите числа на простые множители: 24 = 2³ × 3, 36 = 2² × 3²', solution: 'НОД(24, 36) = 2² × 3 = 12' },
    { id: 3, type: 'nod', difficulty: 'easy', numbers: [15, 25], answer: 5, hint: 'Разложите числа на простые множители: 15 = 3 × 5, 25 = 5²', solution: 'НОД(15, 25) = 5' },
    { id: 4, type: 'nok', difficulty: 'easy', numbers: [4, 6], answer: 12, hint: 'Кратные 4: 4, 8, 12, 16... Кратные 6: 6, 12, 18...', solution: 'НОК(4, 6) = 12' },
    { id: 5, type: 'nok', difficulty: 'easy', numbers: [8, 12], answer: 24, hint: 'Разложите числа: 8 = 2³, 12 = 2² × 3. Возьмите максимальные степени.', solution: 'НОК(8, 12) = 2³ × 3 = 24' },
    { id: 6, type: 'nok', difficulty: 'easy', numbers: [9, 15], answer: 45, hint: 'Разложите числа: 9 = 3², 15 = 3 × 5', solution: 'НОК(9, 15) = 3² × 5 = 45' },
    { id: 7, type: 'nod', difficulty: 'medium', numbers: [48, 72], answer: 24, hint: '48 = 2⁴ × 3, 72 = 2³ × 3²', solution: 'НОД(48, 72) = 2³ × 3 = 24' },
    { id: 8, type: 'nok', difficulty: 'medium', numbers: [16, 24], answer: 48, hint: '16 = 2⁴, 24 = 2³ × 3', solution: 'НОК(16, 24) = 2⁴ × 3 = 48' },
    { id: 9, type: 'nod', difficulty: 'hard', numbers: [120, 180, 240], answer: 60, hint: '120 = 2³ × 3 × 5, 180 = 2² × 3² × 5, 240 = 2⁴ × 3 × 5', solution: 'НОД(120, 180, 240) = 2² × 3 × 5 = 60' },
    { id: 10, type: 'nok', difficulty: 'hard', numbers: [6, 8, 12], answer: 24, hint: '6 = 2 × 3, 8 = 2³, 12 = 2² × 3', solution: 'НОК(6, 8, 12) = 2³ × 3 = 24' },
  ];
}

// Generate quiz questions
export function generateQuizQuestions(): import('@/types').QuizQuestion[] {
  return [
    {
      id: 1,
      question: 'Что такое НОД двух чисел?',
      options: [
        'Наибольшее число, которое делит оба числа без остатка',
        'Наименьшее число, которое делится на оба числа',
        'Сумма двух чисел',
        'Произведение двух чисел'
      ],
      correctAnswer: 0,
      explanation: 'НОД (наибольший общий делитель) — это наибольшее число, которое делит оба числа без остатка.'
    },
    {
      id: 2,
      question: 'Что такое НОК двух чисел?',
      options: [
        'Наибольшее число, которое делит оба числа',
        'Наименьшее число, которое делится на оба числа без остатка',
        'Разность двух чисел',
        'Частное двух чисел'
      ],
      correctAnswer: 1,
      explanation: 'НОК (наименьшее общее кратное) — это наименьшее число, которое делится на оба числа без остатка.'
    },
    {
      id: 3,
      question: 'Найдите НОД(12, 18)',
      options: ['2', '3', '6', '12'],
      correctAnswer: 2,
      explanation: '12 = 2² × 3, 18 = 2 × 3². Общие множители: 2 × 3 = 6.'
    },
    {
      id: 4,
      question: 'Найдите НОК(4, 6)',
      options: ['12', '24', '2', '8'],
      correctAnswer: 0,
      explanation: 'Кратные 4: 4, 8, 12, 16... Кратные 6: 6, 12, 18... Наименьшее общее кратное — 12.'
    },
    {
      id: 5,
      question: 'Какие числа называются взаимно простыми?',
      options: [
        'Числа, у которых НОД = 1',
        'Числа, у которых НОК = 1',
        'Два простых числа',
        'Числа, которые равны'
      ],
      correctAnswer: 0,
      explanation: 'Взаимно простые числа — это числа, у которых наибольший общий делитель равен 1.'
    },
    {
      id: 6,
      question: 'Найдите НОД(15, 25)',
      options: ['1', '3', '5', '15'],
      correctAnswer: 2,
      explanation: '15 = 3 × 5, 25 = 5². Общий множитель: 5.'
    },
    {
      id: 7,
      question: 'Найдите НОК(8, 12)',
      options: ['4', '24', '48', '96'],
      correctAnswer: 1,
      explanation: '8 = 2³, 12 = 2² × 3. НОК = 2³ × 3 = 24.'
    },
    {
      id: 8,
      question: 'Как связаны НОД и НОК двух чисел?',
      options: [
        'НОД × НОК = произведению чисел',
        'НОД + НОК = сумме чисел',
        'НОД = НОК',
        'НОД и НОК не связаны'
      ],
      correctAnswer: 0,
      explanation: 'Для двух чисел a и b: НОД(a, b) × НОК(a, b) = a × b.'
    },
    {
      id: 9,
      question: 'Найдите НОД(7, 11)',
      options: ['1', '7', '11', '77'],
      correctAnswer: 0,
      explanation: '7 и 11 — простые числа, у них нет общих делителей кроме 1. Значит, НОД = 1.'
    },
    {
      id: 10,
      question: 'Найдите НОК(5, 10)',
      options: ['5', '10', '50', '25'],
      correctAnswer: 1,
      explanation: '10 делится на 5, значит НОК(5, 10) = 10.'
    }
  ];
}
