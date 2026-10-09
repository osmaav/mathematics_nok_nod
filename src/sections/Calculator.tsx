// ========================================================================
// src/sections/Calculator.tsx
// Версия компонента: 2.7.0 (релиз приложения v2.7.0)
// Изменения v2.7.0:
//   * калькулятор принимает два ИЛИ три числа: третье поле явно помечено
//     как необязательное ("необязательно"), если оно не заполнено —
//     вычисление выполняется для двух чисел (реализовано и проверено:
//     НОД(36, 48) = 12, НОД(36, 48, 60) = 12, НОК(36, 48, 60) = 720,
//     НОК(72, 90, 150) = 1800);
//   * в пошаговом решении добавлены подписи шагов ("Шаг 1. Каноническое
//     разложение", "Шаг 2. Алфавитный список оснований", "Шаг 3. Выбор
//     минимальной/максимальной степени", "Шаг 4. Результат") — как в
//     исправленном алгоритме из теории;
//   * текст подсказки уточнён: третье число необязательное.
// Изменения v2.5.0:
//   * пошаговое решение НОД приведено к исправленному алгоритму из теории:
//     перед выбором оснований показывается «Главное правило работы со
//     степенями» — НОД = произведение общих простых множителей в их
//     наименьшей степени;
//   * разложения во всех шагах — в едином каноническом формате с явными
//     показателями (6 -> "2¹ · 3¹"), как в таблице-шпаргалке.
// Изменения v2.4.0:
//   * пошаговое решение переведено на канонический вид со степенями:
//     разложения чисел — "72 = 2³ · 3²" (вместо "2 × 2 × 2 × 3 × 3");
//     выбор множителей для НОД/НОК показывается степенями с основаниями
//     в нулевых степенях (5⁰), как в таблице-шпаргалке теории НОК;
//     итоговая строка: "НОК(12, 18) = 2² · 3² = 36".
// Изменения v2.0.0:
//   * добавлено поле ввода третьего числа для вкладок НОД и НОК;
//   * третье число — опциональное: если оно не заполнено, вычисление
//     выполняется для двух чисел (обратная совместимость);
//   * логика расчёта и пошагового решения переработана под массив из
//     2..3 чисел (calculateNOD/calculateNOK теперь вариадические);
//   * в истории вычислений сохраняются все участвующие числа;
//   * обновлены тексты интерфейса ("два или три числа").
// ========================================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator as CalcIcon, Divide, Percent, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
// v2.4.0: добавлены formatPowersFromCounts / toSuperscript — степени вместо перемножений
import { calculateNOD, calculateNOK, primeFactorization, formatFactorization, formatPowersFromCounts, toSuperscript } from '@/lib/math';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

interface CalculationHistory {
  id: number;
  type: 'nod' | 'nok';
  numbers: number[]; // v2.0.0: 2 или 3 числа
  result: number;
}

// v2.0.0: результат вычисления — разложения и шаги для произвольного
// количества чисел (2..3)
interface CalculationResult {
  value: number;
  factors: number[][]; // разложение каждого входного числа
  steps: string[];
}

export default function Calculator() {
  useSectionVisibility({ sectionId: 'calculator' });

  const [activeTab, setActiveTab] = useState<'nod' | 'nok'>('nod');
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  // v2.0.0: третье число (опциональное)
  const [num3, setNum3] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');

    // v2.0.0: собираем список чисел; третье включаем только если заполнено
    const rawInputs = [num1, num2, num3.trim() === '' ? null : num3];
    const numbers: number[] = [];

    for (const raw of rawInputs) {
      if (raw === null) continue;
      const n = parseInt(raw, 10);
      if (isNaN(n) || n <= 0) {
        setError('Пожалуйста, введите положительные числа');
        return;
      }
      if (n > 10000) {
        setError('Числа должны быть не больше 10000');
        return;
      }
      numbers.push(n);
    }

    if (numbers.length < 2) {
      setError('Введите минимум два числа');
      return;
    }

    // Разложения на простые множители для каждого числа
    const factors = numbers.map(primeFactorization);

    let value: number;
    let steps: string[];

    if (activeTab === 'nod') {
      value = calculateNOD(...numbers); // v2.0.0: 2..3 аргумента
      steps = generateSteps(numbers, factors, value, 'nod');
    } else {
      value = calculateNOK(...numbers); // v2.0.0: 2..3 аргумента
      steps = generateSteps(numbers, factors, value, 'nok');
    }

    setResult({ value, factors, steps });

    // Add to history
    const newHistoryItem: CalculationHistory = {
      id: Date.now(),
      type: activeTab,
      numbers,
      result: value,
    };
    setHistory(prev => [newHistoryItem, ...prev].slice(0, 5));
  };

  /**
   * v2.0.0: универсальная генерация пошагового решения для 2..3 чисел.
   * mode 'nod' — общие множители (минимум количеств),
   * mode 'nok' — все уникальные множители (максимум количеств).
   */
  const generateSteps = (
    numbers: number[],
    factors: number[][],
    res: number,
    mode: 'nod' | 'nok'
  ): string[] => {
    const steps: string[] = [];

    // v2.7.0: Шаг 1 — подписан как в исправленном алгоритме из теории
    steps.push('Шаг 1. Каноническое разложение');
    numbers.forEach((n, idx) => {
      steps.push(`${n} = ${formatFactorization(factors[idx])}`);
    });

    // Карты "множитель -> степень" по каждому числу
    const maps = factors.map(fs => {
      const c: Record<number, number> = {};
      fs.forEach(f => c[f] = (c[f] || 0) + 1);
      return c;
    });

    // Алфавитный список оснований (v2.4.0): все уникальные простые числа
    // в порядке возрастания — как в шаге 2 алгоритма НОК из теории
    const allPrimes = Array.from(new Set(maps.flatMap(m => Object.keys(m).map(Number))))
      .sort((a, b) => a - b);

    // v2.4.0: список оснований в виде степеней (показатель = степень из
    // первого числа; отсутствие множителя в числе отображается как 5⁰ —
    // тот же формат, что и в таблице-шпаргалке теории НОК)
    const baseList = allPrimes
      .map(prime => {
        const firstPow = maps[0][prime] || 0;
        return `${prime}${toSuperscript(firstPow)}`;
      })
      .join(' · ');

    const pickedPowers: Record<number, number> = {};
    const choiceDetails: string[] = [];
    allPrimes.forEach(prime => {
      const powers = maps.map(m => m[prime] || 0);
      const presentInAll = powers.every(p => p > 0);
      if (mode === 'nod') {
        // общий делитель требует присутствия основания во всех числах
        if (!presentInAll) return;
        const minPow = Math.min(...powers);
        pickedPowers[prime] = minPow;
        choiceDetails.push(`для ${prime}: минимальная степень из ${powers.join(', ')} → ${prime}${toSuperscript(minPow)}`);
      } else {
        const maxPow = Math.max(...powers);
        pickedPowers[prime] = maxPow;
        choiceDetails.push(`для ${prime}: максимальная степень из ${powers.join(', ')} → ${prime}${toSuperscript(maxPow)}`);
      }
    });

    const label = mode === 'nod' ? 'НОД' : 'НОК';

    // v2.5.0: для НОД напоминаем главное правило работы со степенями
    // (см. «Пошаговый алгоритм нахождения НОД (исправленный)» в теории)
    if (mode === 'nod') {
      steps.push('Правило: НОД — произведение общих простых множителей в их наименьшей степени');
    }

    // v2.7.0: шаги подписаны так же, как в исправленном алгоритме из теории
    // (Шаг 2 — алфавитный список оснований, Шаг 3 — выбор степени)
    steps.push('Шаг 2. Алфавитный список оснований');
    if (allPrimes.length > 0) {
      steps.push(`Основания: ${baseList}`);
    }

    steps.push(mode === 'nod'
      ? 'Шаг 3. Выбор минимальной степени (только общие основания)'
      : 'Шаг 3. Выбор максимальной степени (все основания)');
    choiceDetails.forEach(d => steps.push(`Выбор ${d}`));

    const finalStr = Object.keys(pickedPowers).length > 0 ? formatPowersFromCounts(pickedPowers, { skipPowerOne: true }) : '';
    // v2.7.0: Шаг 4 — запись и вычисление результата
    steps.push('Шаг 4. Результат');
    // Если выбранное совпадает с результатом или оснований нет — без дублирования
    if (!finalStr || finalStr === String(res)) {
      steps.push(`${label}(${numbers.join(', ')}) = ${res}`);
    } else {
      steps.push(`${label}(${numbers.join(', ')}) = ${finalStr} = ${res}`);
    }
    return steps;
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setNum3(''); // v2.0.0
    setResult(null);
    setError('');
  };

  const fillFromHistory = (item: CalculationHistory) => {
    setActiveTab(item.type);
    setNum1(item.numbers[0]?.toString() ?? '');
    setNum2(item.numbers[1]?.toString() ?? '');
    setNum3(item.numbers[2]?.toString() ?? ''); // v2.0.0
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
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-purple-100 text-purple-600 font-heading font-semibold text-xs sm:text-sm mb-4">
              <CalcIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              Калькулятор
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-3 sm:mb-4">
              Вычисли <span className="text-gradient-nod">НОД</span> и <span className="text-gradient-nok">НОК</span>
            </h2>
            {/* v2.7.0: уточнён текст — третье число необязательное */}
            <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              Введи два числа (или три — третье поле необязательное) и получи пошаговое решение
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
                <TabsList className="grid w-full grid-cols-2 h-13">
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
                    num3={num3}
                    setNum1={setNum1}
                    setNum2={setNum2}
                    setNum3={setNum3}
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
                    num3={num3}
                    setNum1={setNum1}
                    setNum2={setNum2}
                    setNum3={setNum3}
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
                          <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-1 sm:mb-2 ${item.type === 'nod' ? 'bg-nod/10 text-nod-dark' : 'bg-nok/10 text-nok-dark'
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
  num3: string; // v2.0.0: третье число (опционально)
  setNum1: (v: string) => void;
  setNum2: (v: string) => void;
  setNum3: (v: string) => void; // v2.0.0
  result: CalculationResult | null;
  error: string;
  onCalculate: () => void;
  onReset: () => void;
}

function CalculatorContent({ type, num1, num2, num3, setNum1, setNum2, setNum3, result, error, onCalculate, onReset }: CalculatorContentProps) {
  const isNOD = type === 'nod';
  const accentClass = isNOD ? 'text-nod-dark border-nod focus:border-nod focus:ring-nod/20' : 'text-nok-dark border-nok focus:border-nok focus:ring-nok/20';

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-card border border-border">
      {/* Input Fields — v2.0.0: добавлено третье поле */}
      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-1.5 sm:mb-2">
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
        {/* v2.7.0: явный маркер необязательности поля */}
        <div>
          <label className="block font-heading font-semibold text-text-primary mb-1.5 sm:mb-2 text-sm sm:text-base">
            Третье число <span className="text-text-secondary font-normal text-xs">(необязательно)</span>
          </label>
          <Input
            type="number"
            value={num3}
            onChange={(e) => setNum3(e.target.value)}
            placeholder="Можно оставить пустым"
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
      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 mt-4">
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
            {/* Final Result — v2.0.0: список чисел формируется из результата */}
            <div className={`text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 ${isNOD ? 'bg-nod/10' : 'bg-nok/10'}`}>
              <p className="text-text-secondary mb-1 sm:mb-2 text-sm sm:text-base">
                {isNOD ? 'Наибольший общий делитель' : 'Наименьшее общее кратное'}
              </p>
              <p className="font-mono text-2xl sm:text-4xl font-bold" style={{ color: isNOD ? '#3BA99F' : '#E85555' }}>
                {isNOD ? 'НОД' : 'НОК'}({resultNumbers(num1, num2, num3).join(', ')}) = {result.value}
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

// v2.0.0: вспомогательная функция — список чисел для заголовка результата
// (третье число включается, только если заполнено)
function resultNumbers(num1: string, num2: string, num3: string): string[] {
  const list = [num1, num2];
  if (num3.trim() !== '') list.push(num3);
  return list;
}
