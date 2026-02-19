import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator as CalcIcon, Divide, Percent, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import { calculateNOD, calculateNOK, primeFactorization, formatFactorization } from '@/lib/math';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CalculationHistory {
  id: number;
  type: 'nod' | 'nok';
  numbers: number[];
  result: number;
}

export default function Calculator() {
  const [activeTab, setActiveTab] = useState<'nod' | 'nok'>('nod');
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<{
    value: number;
    factors1: number[];
    factors2: number[];
    steps: string[];
  } | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');
    const n1 = parseInt(num1);
    const n2 = parseInt(num2);

    if (isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0) {
      setError('Пожалуйста, введите положительные числа');
      return;
    }

    if (n1 > 10000 || n2 > 10000) {
      setError('Числа должны быть не больше 10000');
      return;
    }

    const factors1 = primeFactorization(n1);
    const factors2 = primeFactorization(n2);
    
    let value: number;
    let steps: string[];

    if (activeTab === 'nod') {
      value = calculateNOD(n1, n2);
      steps = generateNODSteps(n1, n2, factors1, factors2, value);
    } else {
      value = calculateNOK(n1, n2);
      steps = generateNOKSteps(n1, n2, factors1, factors2, value);
    }

    setResult({ value, factors1, factors2, steps });

    // Add to history
    const newHistoryItem: CalculationHistory = {
      id: Date.now(),
      type: activeTab,
      numbers: [n1, n2],
      result: value,
    };
    setHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
  };

  const generateNODSteps = (n1: number, n2: number, f1: number[], f2: number[], res: number): string[] => {
    const steps = [];
    steps.push(`${n1} = ${formatFactorization(f1)}`);
    steps.push(`${n2} = ${formatFactorization(f2)}`);
    
    const counts1: Record<number, number> = {};
    const counts2: Record<number, number> = {};
    f1.forEach(f => counts1[f] = (counts1[f] || 0) + 1);
    f2.forEach(f => counts2[f] = (counts2[f] || 0) + 1);
    
    const commonFactors: string[] = [];
    const allPrimes = new Set([...Object.keys(counts1), ...Object.keys(counts2)].map(Number));
    allPrimes.forEach(prime => {
      if (counts1[prime] && counts2[prime]) {
        const minCount = Math.min(counts1[prime], counts2[prime]);
        commonFactors.push(minCount === 1 ? `${prime}` : `${prime}^${minCount}`);
      }
    });
    
    steps.push(`Общие множители: ${commonFactors.join(' × ')}`);
    steps.push(`НОД(${n1}, ${n2}) = ${commonFactors.join(' × ')} = ${res}`);
    return steps;
  };

  const generateNOKSteps = (n1: number, n2: number, f1: number[], f2: number[], res: number): string[] => {
    const steps = [];
    steps.push(`${n1} = ${formatFactorization(f1)}`);
    steps.push(`${n2} = ${formatFactorization(f2)}`);
    
    const counts1: Record<number, number> = {};
    const counts2: Record<number, number> = {};
    f1.forEach(f => counts1[f] = (counts1[f] || 0) + 1);
    f2.forEach(f => counts2[f] = (counts2[f] || 0) + 1);
    
    const allFactors: string[] = [];
    const allPrimes = new Set([...Object.keys(counts1), ...Object.keys(counts2)].map(Number));
    allPrimes.forEach(prime => {
      const maxCount = Math.max(counts1[prime] || 0, counts2[prime] || 0);
      allFactors.push(maxCount === 1 ? `${prime}` : `${prime}^${maxCount}`);
    });
    
    steps.push(`Все множители с макс. степенями: ${allFactors.join(' × ')}`);
    steps.push(`НОК(${n1}, ${n2}) = ${allFactors.join(' × ')} = ${res}`);
    return steps;
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setResult(null);
    setError('');
  };

  const fillFromHistory = (item: CalculationHistory) => {
    setActiveTab(item.type);
    setNum1(item.numbers[0].toString());
    setNum2(item.numbers[1].toString());
    setResult(null);
  };

  return (
    <section id="calculator" className="py-12 sm:py-20 bg-white">
      <div className="section-container">
        <div className="section-inner">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-yellow-accent/30 text-text-primary font-heading font-semibold text-xs sm:text-sm mb-4">
              <CalcIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              Калькулятор
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-3 sm:mb-4">
              Вычисли <span className="text-gradient-nod">НОД</span> и <span className="text-gradient-nok">НОК</span>
            </h2>
            <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              Введи два числа и получи пошаговое решение
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-8">
            {/* Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <Tabs value={activeTab} onValueChange={(v) => {
                setActiveTab(v as 'nod' | 'nok');
                setResult(null);
              }}>
                <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6">
                  <TabsTrigger value="nod" className="flex items-center justify-center gap-1.5 sm:gap-2 data-[state=active]:bg-nod data-[state=active]:text-white text-sm sm:text-base py-3">
                    <Divide className="w-4 h-4" />
                    <span className="hidden sm:inline">НОД</span>
                    <span className="sm:hidden">НОД</span>
                  </TabsTrigger>
                  <TabsTrigger value="nok" className="flex items-center justify-center gap-1.5 sm:gap-2 data-[state=active]:bg-nok data-[state=active]:text-white text-sm sm:text-base py-3">
                    <Percent className="w-4 h-4" />
                    <span className="hidden sm:inline">НОК</span>
                    <span className="sm:hidden">НОК</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="nod" className="mt-0">
                  <CalculatorContent
                    type="nod"
                    num1={num1}
                    num2={num2}
                    setNum1={setNum1}
                    setNum2={setNum2}
                    result={result}
                    error={error}
                    onCalculate={handleCalculate}
                    onReset={handleReset}
                  />
                </TabsContent>

                <TabsContent value="nok" className="mt-0">
                  <CalculatorContent
                    type="nok"
                    num1={num1}
                    num2={num2}
                    setNum1={setNum1}
                    setNum2={setNum2}
                    result={result}
                    error={error}
                    onCalculate={handleCalculate}
                    onReset={handleReset}
                  />
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-border"
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-accent" />
                <h3 className="font-heading font-bold text-lg sm:text-xl text-text-primary">История</h3>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-text-secondary">
                  <p className="text-sm sm:text-base">Пока нет вычислений</p>
                  <p className="text-xs sm:text-sm mt-2">Введи числа и нажми "Вычислить"</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {history.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => fillFromHistory(item)}
                      className="w-full p-3 sm:p-4 bg-white rounded-xl border border-border hover:shadow-card transition-shadow text-left touch-manipulation"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-1 sm:mb-2 ${
                            item.type === 'nod' ? 'bg-nod/10 text-nod-dark' : 'bg-nok/10 text-nok-dark'
                          }`}>
                            {item.type === 'nod' ? 'НОД' : 'НОК'}
                          </span>
                          <p className="font-mono text-xs sm:text-sm text-text-primary">
                            {item.type === 'nod' ? 'НОД' : 'НОК'}({item.numbers.join(', ')}) = {item.result}
                          </p>
                        </div>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-text-secondary flex-shrink-0" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CalculatorContentProps {
  type: 'nod' | 'nok';
  num1: string;
  num2: string;
  setNum1: (v: string) => void;
  setNum2: (v: string) => void;
  result: {
    value: number;
    factors1: number[];
    factors2: number[];
    steps: string[];
  } | null;
  error: string;
  onCalculate: () => void;
  onReset: () => void;
}

function CalculatorContent({ type, num1, num2, setNum1, setNum2, result, error, onCalculate, onReset }: CalculatorContentProps) {
  const isNOD = type === 'nod';
  const accentClass = isNOD ? 'text-nod-dark border-nod focus:border-nod focus:ring-nod/20' : 'text-nok-dark border-nok focus:border-nok focus:ring-nok/20';

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-card border border-border">
      {/* Input Fields */}
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <label className="block font-heading font-semibold text-text-primary mb-1.5 sm:mb-2 text-sm sm:text-base">Первое число</label>
          <Input
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Например: 36"
            className={`input-field ${accentClass}`}
            min="1"
            max="10000"
          />
        </div>
        <div>
          <label className="block font-heading font-semibold text-text-primary mb-1.5 sm:mb-2 text-sm sm:text-base">Второе число</label>
          <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Например: 48"
            className={`input-field ${accentClass}`}
            min="1"
            max="10000"
          />
        </div>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 sm:p-4 bg-error/10 text-error rounded-xl font-heading font-semibold text-xs sm:text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buttons */}
      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
        <motion.button
          onClick={onCalculate}
          className={`flex-1 ${isNOD ? 'btn-primary' : 'btn-secondary'} py-3.5 sm:py-4 text-sm sm:text-base touch-manipulation`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isNOD ? <Divide className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" /> : <Percent className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2" />}
          Вычислить
        </motion.button>
        <motion.button
          onClick={onReset}
          className="px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-gray-100 text-text-secondary hover:bg-gray-200 transition-colors touch-manipulation flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Сбросить"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border pt-4 sm:pt-6"
          >
            {/* Final Result */}
            <div className={`text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 ${isNOD ? 'bg-nod/10' : 'bg-nok/10'}`}>
              <p className="text-text-secondary mb-1 sm:mb-2 text-sm sm:text-base">
                {isNOD ? 'Наибольший общий делитель' : 'Наименьшее общее кратное'}
              </p>
              <p className="font-mono text-2xl sm:text-4xl font-bold" style={{ color: isNOD ? '#3BA99F' : '#E85555' }}>
                {isNOD ? 'НОД' : 'НОК'}({num1}, {num2}) = {result.value}
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-2 sm:space-y-3">
              <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary mb-3 sm:mb-4">Пошаговое решение:</h4>
              {result.steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl"
                >
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${isNOD ? 'bg-nod' : 'bg-nok'}`}>
                    {index + 1}
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-text-primary break-all">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
