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

// Format factorization as string (e.g., "2 × 2 × 3")
export function formatFactorization(factors: number[]): string {
  if (factors.length === 0) return '1';

  const counts: Record<number, number> = {};
  factors.forEach(f => {
    counts[f] = (counts[f] || 0) + 1;
  });

  return Object.entries(counts)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([prime, count]) => {
      // Создаем массив длиной 'count', заполняем его значением 'prime' 
      // и объединяем через '×'
      return Array(Number(count)).fill(prime).join(' × ');
    })
    .join(' × '); // Используем '×' как общий разделитель
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

// Helper function to generate hint for NOD
function generateNODHint(numbers: number[]): string {
  if (numbers.length === 2) {
    const [a, b] = numbers;
    const factorsA = formatFactorization(primeFactorization(a));
    const factorsB = formatFactorization(primeFactorization(b));
    return `Разложите числа на простые множители: ${a} = ${factorsA}, ${b} = ${factorsB}`;
  } else {
    return numbers.map(n => `${n} = ${formatFactorization(primeFactorization(n))}`).join(', ');
  }
}

// Helper function to generate hint for NOK
function generateNOKHint(numbers: number[]): string {
  if (numbers.length === 2) {
    const [a, b] = numbers;
    const factorsA = formatFactorization(primeFactorization(a));
    const factorsB = formatFactorization(primeFactorization(b));
    return `Разложите числа: ${a} = ${factorsA}, ${b} = ${factorsB}. Выберите каждый простой множитель с наибольшим количеством повторений.`;
  } else {
    return numbers.map(n => `${n} = ${formatFactorization(primeFactorization(n))}`).join(', ');
  }
}

// Helper function to generate solution string for NOD
function generateNODSolution(numbers: number[]): string {
  const nod = calculateNODMultiple(numbers);
  const factorsA = primeFactorization(numbers[0]);
  const factorsB = primeFactorization(numbers[1]);
  
  // Find common factors
  const countsA: Record<number, number> = {};
  const countsB: Record<number, number> = {};
  
  factorsA.forEach(f => countsA[f] = (countsA[f] || 0) + 1);
  factorsB.forEach(f => countsB[f] = (countsB[f] || 0) + 1);
  
  const commonFactors: number[] = [];
  const allPrimes = new Set([...Object.keys(countsA), ...Object.keys(countsB)].map(Number));
  
  allPrimes.forEach(prime => {
    if (countsA[prime] && countsB[prime]) {
      const minCount = Math.min(countsA[prime], countsB[prime]);
      for (let i = 0; i < minCount; i++) {
        commonFactors.push(prime);
      }
    }
  });
  
  const commonFactorsStr = commonFactors.length > 0 ? commonFactors.join(' × ') : '1';
  
  if (numbers.length === 2) {
    // Если общий множитель один или НОД = 1, не дублируем его
    if (commonFactors.length <= 1) {
      return `НОД(${numbers.join(', ')}) = ${nod}`;
    }
    return `НОД(${numbers.join(', ')}) = ${commonFactorsStr} = ${nod}`;
  } else {
    return `НОД(${numbers.join(', ')}) = ${nod}`;
  }
}

// Helper function to generate solution string for NOK
function generateNOKSolution(numbers: number[]): string {
  const nok = calculateNOKMultiple(numbers);
  
  if (numbers.length === 2) {
    const factorsA = primeFactorization(numbers[0]);
    const factorsB = primeFactorization(numbers[1]);
    
    const countsA: Record<number, number> = {};
    const countsB: Record<number, number> = {};
    
    factorsA.forEach(f => countsA[f] = (countsA[f] || 0) + 1);
    factorsB.forEach(f => countsB[f] = (countsB[f] || 0) + 1);
    
    const maxFactors: number[] = [];
    const allPrimes = new Set([...Object.keys(countsA), ...Object.keys(countsB)].map(Number));
    
    allPrimes.forEach(prime => {
      const maxCount = Math.max(countsA[prime] || 0, countsB[prime] || 0);
      for (let i = 0; i < maxCount; i++) {
        maxFactors.push(prime);
      }
    });
    
    const maxFactorsStr = maxFactors.join(' × ');
    // Если множитель один, не дублируем его
    if (maxFactors.length <= 1) {
      return `НОК(${numbers.join(', ')}) = ${nok}`;
    }
    return `НОК(${numbers.join(', ')}) = ${maxFactorsStr} = ${nok}`;
  } else {
    return `НОК(${numbers.join(', ')}) = ${nok}`;
  }
}

// Generate random numbers for practice tasks
function generateRandomNumbers(difficulty: 'easy' | 'medium' | 'hard', count: number = 2): number[] {
  const numbers: number[] = [];
  
  switch (difficulty) {
    case 'easy':
      // Numbers from 2 to 20
      while (numbers.length < count) {
        const num = Math.floor(Math.random() * 19) + 2;
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }
      break;
    case 'medium':
      // Numbers from 10 to 50
      while (numbers.length < count) {
        const num = Math.floor(Math.random() * 41) + 10;
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }
      break;
    case 'hard':
      // Numbers from 20 to 100, or 3 numbers
      const numCount = Math.random() > 0.5 ? 3 : 2;
      while (numbers.length < numCount) {
        const num = Math.floor(Math.random() * 81) + 20;
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }
      break;
  }
  
  return numbers.sort((a, b) => a - b);
}

// Generate practice tasks
export function generatePracticeTasks(): import('@/types').PracticeTask[] {
  const tasks: import('@/types').PracticeTask[] = [];
  let id = 1;

  // Helper to check if two numbers are coprime (НОД = 1)
  const areCoprime = (nums: number[]): boolean => calculateNODMultiple(nums) === 1;

  // Easy: 10 NOD + 10 NOK = 20 tasks (max 2 coprime pairs each)
  let nodEasyCoprimeCount = 0;
  let nokEasyCoprimeCount = 0;
  
  for (let i = 0; i < 10; i++) {
    let numbers = generateRandomNumbers('easy', 2);
    // Limit coprime pairs to max 2
    if (nodEasyCoprimeCount >= 2 && areCoprime(numbers)) {
      // Keep generating until we get non-coprime pair
      let attempts = 0;
      while (areCoprime(numbers) && attempts < 50) {
        numbers = generateRandomNumbers('easy', 2);
        attempts++;
      }
    }
    if (areCoprime(numbers)) nodEasyCoprimeCount++;
    
    const answer = calculateNODMultiple(numbers);
    tasks.push({
      id: id++,
      type: 'nod',
      difficulty: 'easy',
      numbers,
      answer,
      hint: generateNODHint(numbers),
      solution: generateNODSolution(numbers)
    });
  }

  for (let i = 0; i < 10; i++) {
    let numbers = generateRandomNumbers('easy', 2);
    // Limit coprime pairs to max 2
    if (nokEasyCoprimeCount >= 2 && areCoprime(numbers)) {
      let attempts = 0;
      while (areCoprime(numbers) && attempts < 50) {
        numbers = generateRandomNumbers('easy', 2);
        attempts++;
      }
    }
    if (areCoprime(numbers)) nokEasyCoprimeCount++;
    
    const answer = calculateNOKMultiple(numbers);
    tasks.push({
      id: id++,
      type: 'nok',
      difficulty: 'easy',
      numbers,
      answer,
      hint: generateNOKHint(numbers),
      solution: generateNOKSolution(numbers)
    });
  }

  // Medium: 10 NOD + 10 NOK = 20 tasks (max 2 coprime pairs each)
  let nodMediumCoprimeCount = 0;
  let nokMediumCoprimeCount = 0;
  
  for (let i = 0; i < 10; i++) {
    let numbers = generateRandomNumbers('medium', 2);
    if (nodMediumCoprimeCount >= 2 && areCoprime(numbers)) {
      let attempts = 0;
      while (areCoprime(numbers) && attempts < 50) {
        numbers = generateRandomNumbers('medium', 2);
        attempts++;
      }
    }
    if (areCoprime(numbers)) nodMediumCoprimeCount++;
    
    const answer = calculateNODMultiple(numbers);
    tasks.push({
      id: id++,
      type: 'nod',
      difficulty: 'medium',
      numbers,
      answer,
      hint: generateNODHint(numbers),
      solution: generateNODSolution(numbers)
    });
  }

  for (let i = 0; i < 10; i++) {
    let numbers = generateRandomNumbers('medium', 2);
    if (nokMediumCoprimeCount >= 2 && areCoprime(numbers)) {
      let attempts = 0;
      while (areCoprime(numbers) && attempts < 50) {
        numbers = generateRandomNumbers('medium', 2);
        attempts++;
      }
    }
    if (areCoprime(numbers)) nokMediumCoprimeCount++;
    
    const answer = calculateNOKMultiple(numbers);
    tasks.push({
      id: id++,
      type: 'nok',
      difficulty: 'medium',
      numbers,
      answer,
      hint: generateNOKHint(numbers),
      solution: generateNOKSolution(numbers)
    });
  }

  // Hard: 10 NOD + 10 NOK = 20 tasks (max 2 coprime pairs each)
  let nodHardCoprimeCount = 0;
  let nokHardCoprimeCount = 0;
  
  for (let i = 0; i < 10; i++) {
    let numbers = generateRandomNumbers('hard', Math.random() > 0.5 ? 3 : 2);
    if (nodHardCoprimeCount >= 2 && areCoprime(numbers)) {
      let attempts = 0;
      while (areCoprime(numbers) && attempts < 50) {
        numbers = generateRandomNumbers('hard', Math.random() > 0.5 ? 3 : 2);
        attempts++;
      }
    }
    if (areCoprime(numbers)) nodHardCoprimeCount++;
    
    const answer = calculateNODMultiple(numbers);
    tasks.push({
      id: id++,
      type: 'nod',
      difficulty: 'hard',
      numbers,
      answer,
      hint: generateNODHint(numbers),
      solution: generateNODSolution(numbers)
    });
  }

  for (let i = 0; i < 10; i++) {
    let numbers = generateRandomNumbers('hard', Math.random() > 0.5 ? 3 : 2);
    if (nokHardCoprimeCount >= 2 && areCoprime(numbers)) {
      let attempts = 0;
      while (areCoprime(numbers) && attempts < 50) {
        numbers = generateRandomNumbers('hard', Math.random() > 0.5 ? 3 : 2);
        attempts++;
      }
    }
    if (areCoprime(numbers)) nokHardCoprimeCount++;
    
    const answer = calculateNOKMultiple(numbers);
    tasks.push({
      id: id++,
      type: 'nok',
      difficulty: 'hard',
      numbers,
      answer,
      hint: generateNOKHint(numbers),
      solution: generateNOKSolution(numbers)
    });
  }

  return tasks;
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
      explanation: '12 = 2 × 2 × 3, 18 = 2 × 3 × 3. Общие множители: 2 × 3 = 6.'
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
      explanation: '15 = 3 × 5, 25 = 5 × 5. Общий множитель: 5.'
    },
    {
      id: 7,
      question: 'Найдите НОК(8, 12)',
      options: ['4', '24', '48', '96'],
      correctAnswer: 1,
      explanation: '8 = 2 × 2 , 12 = 2 × 2 × 3. НОК = 2 × 2 × 2 × 3 = 24.'
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
