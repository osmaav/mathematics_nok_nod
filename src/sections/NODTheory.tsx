// ========================================================================
// src/sections/NODTheory.tsx
// Версия секции: 2.5.0 (релиз приложения v2.5.0)
// Изменения v2.5.0:
//   * блок «Алгоритм нахождения НОД» переписан по образу объяснения
//     (по аналогии с алгоритмом НОК из v2.3.0):
//     Главное правило работы со степенями: НОД — произведение общих
//     простых множителей, взятых в их НАИМЕНЬШЕЙ степени;
//     Шаг 1 — каноническое разложение (пример НОД(72, 90, 150));
//     Шаг 2 — алфавитный список оснований (тот же, что и для НОК);
//     Шаг 3 — выбор минимальной степени + объяснение роли нулевой
//       степени (5^0 «выбивает» множитель из НОД);
//     Шаг 4 — запись и вычисление результата (НОД = 2^1 · 3^1 = 6);
//   * добавлена таблица-шпаргалка «Как оформить это в тетради»
//     (критерий выбора — минимальная степень, 5^0 не пишем);
//   * добавлен блок «Связь двух алгоритмов (методический совет)»:
//     сравнительная таблица НОК/НОД и мнемоническое правило
//     («сборная солянка» — max, «общий знаменатель» — min).
// Изменения v2.4.0:
//   * интерактивный пример НОД(36, 48) переведён на запись со степенями:
//     разложения — "36 = 2² · 3²", "48 = 2⁴ · 3¹"; чипы множителей — степени;
//     шаг перемножения — "2² · 3¹ = 12" (взяли наименьшие степени общих
//     оснований), вместо "2 × 2 × 3".
// Обратная совместимость: определение НОД, примеры с делителями и
// интерактивный пример (НОД(36, 48)) сохранены без изменений.
// ========================================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Divide, ChevronDown, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { getDivisors, getCommonDivisors, primeFactorization, formatFactorization } from '@/lib/math';
import { useSectionVisibility } from '@/hooks/useSectionVisibility';

const exampleNumbers = { a: 36, b: 48 };

export default function NODTheory() {
  useSectionVisibility({ sectionId: 'nod' });
  const [showExample, setShowExample] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const divisorsA = getDivisors(exampleNumbers.a);
  const divisorsB = getDivisors(exampleNumbers.b);
  const commonDivisors = getCommonDivisors(exampleNumbers.a, exampleNumbers.b);
  const factorsA = primeFactorization(exampleNumbers.a);
  const factorsB = primeFactorization(exampleNumbers.b);

  const steps = [
    {
      title: 'Разложим числа на простые множители',
      content: (
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-mono text-base sm:text-lg font-bold text-nod-dark">{exampleNumbers.a}</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-text-secondary flex-shrink-0" />
            <span className="font-mono text-sm sm:text-lg">{formatFactorization(factorsA)}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-mono text-base sm:text-lg font-bold text-nod-dark">{exampleNumbers.b}</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-text-secondary flex-shrink-0" />
            <span className="font-mono text-sm sm:text-lg">{formatFactorization(factorsB)}</span>
          </div>
        </div>
      )
    },
    {
      // v2.4.0: общие основания показываем степенями (2² у 36 и 2⁴ у 48 -> общая часть 2²)
      title: 'Найдём общие простые основания',
      content: (
        <div className="space-y-2 sm:space-y-3">
          <p className="text-text-secondary text-sm sm:text-base">Общие основания: <span className="font-mono text-nod-dark font-bold">2 и 3</span>. Берём каждое в <strong>наименьшей</strong> степени из разложений.</p>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {/* Чипы: степени оснований числа 36 (общие с 48 — подсвечены) */}
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg font-mono text-xs sm:text-sm bg-nod/20 text-nod-dark">2²</span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg font-mono text-xs sm:text-sm bg-nod/20 text-nod-dark">3²</span>
            <span className="text-text-secondary font-mono text-xs sm:text-sm self-center">— разложение 36 = 2² · 3²; у 48 — 2⁴ · 3¹</span>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm">(для основания 2 наименьшая степень — 2² из 36, для основания 3 — 3¹ из 48)</p>
        </div>
      )
    },
    {
      // v2.4.0: перемножение одинаковых сомножителей заменено степенями
      title: 'Перемножим выбранные степени',
      content: (
        <div className="space-y-2 sm:space-y-3">
          {/* v2.5.0: итог записан свёрнуто степенями (без промежуточного умножения 4 × 3) */}
          <p className="font-mono text-base sm:text-lg">2² · 3¹ = <span className="text-nod-dark font-bold text-xl sm:text-2xl">12</span></p>
          <p className="text-text-secondary text-sm sm:text-base">Значит, НОД({exampleNumbers.a}, {exampleNumbers.b}) = 12</p>
        </div>
      )
    }
  ];

  return (
    <section id="nod" className="py-12 sm:py-20 bg-white">
      <div className="section-container">
        <div className="section-inner">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10 sm:mb-16"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-nod/10 text-nod-dark font-heading font-semibold text-xs sm:text-sm mb-4">
              <Divide className="w-3 h-3 sm:w-4 sm:h-4" />
              Наибольший общий делитель
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-3 sm:mb-4">
              Что такое <span className="text-gradient-nod">НОД</span>?
            </h2>
            <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              Наибольший общий делитель — это самое большое число, на которое делятся два или более чисел без остатка
            </p>
          </motion.div>

          {/* Definition Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-nod/5 to-nod/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 sm:mb-8 border-2 border-nod/20"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-nod flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-primary mb-2 sm:mb-3">Определение</h3>
                <p className="text-base sm:text-lg text-text-primary leading-relaxed">
                  <span className="highlight-nod">Наибольший общий делитель (НОД)</span> двух или нескольких натуральных чисел —
                  это <strong>наибольшее</strong> из натуральных чисел, на которое делятся данные числа <strong>без остатка</strong>.
                </p>
                <p className="text-base sm:text-lg text-text-primary mt-2 sm:mt-3">
                  Обозначается как: <span className="math-formula mt-1 sm:mt-2 inline-block text-sm sm:text-base">НОД(a, b)</span> или <span className="math-formula mt-1 sm:mt-2 inline-block text-sm sm:text-base">(a, b)</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Example with Divisors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            {/* Divisors of 36 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card border border-border">
              <h4 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-3 sm:mb-4">
                Делители числа <span className="text-nod-dark">{exampleNumbers.a}</span>:
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {divisorsA.map((d) => (
                  <span
                    key={d}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm ${commonDivisors.includes(d)
                      ? 'bg-nod text-white font-bold'
                      : 'bg-gray-100 text-text-secondary'
                      }`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Divisors of 48 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card border border-border">
              <h4 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-3 sm:mb-4">
                Делители числа <span className="text-nod-dark">{exampleNumbers.b}</span>:
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {divisorsB.map((d) => (
                  <span
                    key={d}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm ${commonDivisors.includes(d)
                      ? 'bg-nod text-white font-bold'
                      : 'bg-gray-100 text-text-secondary'
                      }`}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Common Divisors Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-nod/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-nod/30"
          >
            <h4 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-3 sm:mb-4">
              Общие делители (выделены цветом):
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {commonDivisors.map((d) => (
                <span key={d} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono font-bold bg-nod text-white text-sm sm:text-base">
                  {d}
                </span>
              ))}
            </div>
            <p className="text-base sm:text-lg text-text-primary">
              <span className="highlight-nod">Наибольший</span> из общих делителей:{' '}
              <span className="font-mono font-bold text-xl sm:text-2xl text-nod-dark">{Math.max(...commonDivisors)}</span>
            </p>
            <p className="text-text-secondary mt-1 sm:mt-2 text-sm sm:text-base">
              Значит, НОД({exampleNumbers.a}, {exampleNumbers.b}) = {Math.max(...commonDivisors)}
            </p>
          </motion.div>

          {/* Algorithm Steps — v2.5.0: переписан по образу «каноническое разложение → алфавитный список оснований → минимальная степень → результат» (по аналогии с алгоритмом НОК) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-card border border-border"
          >
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-primary mb-2 sm:mb-3">
              Пошаговый алгоритм нахождения НОД (исправленный)
            </h3>
            {/* Главное правило работы со степенями */}
            <div className="flex items-start gap-2 sm:gap-3 bg-nod/10 border-2 border-nod/30 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-nod-dark flex-shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-text-primary">
                <strong>Главное правило работы со степенями:</strong> НОД — это произведение{' '}
                <strong>общих</strong> простых множителей, взятых в их <span className="font-mono font-bold text-nod-dark">наименьшей</span> степени.
              </p>
            </div>
            <p className="text-text-secondary text-sm sm:text-base mb-5 sm:mb-6">
              Пример: найдём <span className="font-mono font-semibold text-nod-dark">НОД(72, 90, 150)</span>
            </p>

            <div className="space-y-5 sm:space-y-6">
              {/* Шаг 1. Каноническое разложение */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="step-number-nod flex-shrink-0 text-sm sm:text-lg w-8 h-8 sm:w-10 sm:h-10">1</div>
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary">Каноническое разложение</h4>
                  <p className="text-text-secondary text-sm sm:text-base mb-2 sm:mb-3">
                    Разложите каждое число на простые множители и запишите результат в каноническом виде
                    (числа в порядке возрастания, одинаковые основания — в виде степени).
                  </p>
                  <div className="space-y-1 sm:space-y-2 bg-gray-50 rounded-xl p-3 sm:p-4 border border-border">
                    {/* v2.5.0: нулевые степени дописаны явно — набор оснований одинаков во всех строках (как в таблице-шпаргалке) */}
                    <p className="font-mono text-sm sm:text-base text-text-primary">72 = 8 · 9 = <span className="font-bold text-nod-dark">2³ · 3² · 5⁰</span></p>
                    <p className="font-mono text-sm sm:text-base text-text-primary">90 = 9 · 10 = <span className="font-bold text-nod-dark">2¹ · 3² · 5¹</span></p>
                    <p className="font-mono text-sm sm:text-base text-text-primary">150 = 3 · 50 = <span className="font-bold text-nod-dark">2¹ · 3¹ · 5²</span></p>
                  </div>
                </div>
              </div>

              {/* Шаг 2. Алфавитный список оснований */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="step-number-nod flex-shrink-0 text-sm sm:text-lg w-8 h-8 sm:w-10 sm:h-10">2</div>
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary">Составление алфавитного списка оснований</h4>
                  <p className="text-text-secondary text-sm sm:text-base">
                    Выпишите все уникальные простые числа, которые встретились в разложениях.
                    Это тот же список, что и для НОК. В нашем примере:{' '}
                    <span className="font-mono font-bold text-nod-dark">2, 3, 5</span>.
                  </p>
                </div>
              </div>

              {/* Шаг 3. Выбор минимальной степени */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="step-number-nod flex-shrink-0 text-sm sm:text-lg w-8 h-8 sm:w-10 sm:h-10">3</div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary">
                    Выбор минимальной степени <span className="text-nod-dark">(самый важный шаг)</span>
                  </h4>
                  <p className="text-text-secondary text-sm sm:text-base mb-2 sm:mb-3">
                    Для каждого основания посмотрите на его показатели во всех числах и выберите наименьший.
                    Если у какого-то числа этого множителя нет, считайте, что он стоит в нулевой степени
                    (<span className="font-mono">5⁰ = 1</span>). Нулевая степень сразу «выбивает» этот множитель
                    из НОД, так как 0 — самая маленькая возможная степень.
                  </p>
                  <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base text-text-primary">
                    <li>Для основания 2: степени 3, 1, 1 — выбираем <span className="font-mono font-bold text-nod-dark">2¹</span></li>
                    <li>Для основания 3: степени 2, 2, 1 — выбираем <span className="font-mono font-bold text-nod-dark">3¹</span></li>
                    <li>Для основания 5: степени 0, 1, 2 — выбираем <span className="font-mono font-bold text-nod-dark">5⁰</span> (то есть просто отбрасываем пятёрку)</li>
                  </ul>
                </div>
              </div>

              {/* Шаг 4. Запись и вычисление результата */}
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="step-number-nod flex-shrink-0 text-sm sm:text-lg w-8 h-8 sm:w-10 sm:h-10">4</div>
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary">Запись и вычисление результата</h4>
                  <p className="text-text-secondary text-sm sm:text-base mb-2">Перемножьте выбранные степени.</p>
                  <p className="font-mono text-sm sm:text-lg text-text-primary">
                    НОД(72, 90, 150) = 2¹ · 3¹ ={' '}
                    <span className="font-bold text-xl sm:text-2xl text-nod-dark">6</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Шпаргалка для тетради: таблица выбора минимальных степеней — v2.5.0 */}
            <div className="mt-5 sm:mt-6">
              <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary mb-1 sm:mb-2">
                Как оформить это в тетради (шпаргалка для учеников)
              </h4>
              <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4">
                Используем ту же таблицу, что и для НОК, но меняем критерий выбора:
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs sm:text-sm font-mono bg-white">
                  <thead>
                    <tr className="bg-nod/10 text-nod-dark">
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-heading font-bold">Основание</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-heading font-bold">Число 72</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-heading font-bold">Число 90</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-heading font-bold">Число 150</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-heading font-bold">Выбор для НОД</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-primary">
                    <tr className="border-t border-border">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-bold">2</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">2³</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">2¹</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">2¹</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-bold bg-nod/10 text-nod-dark">2¹</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-bold">3</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">3²</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">3²</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">3¹</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-bold bg-nod/10 text-nod-dark">3¹</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-bold">5</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">5⁰</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">5¹</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">5²</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3 text-center font-bold bg-nod/10 text-nod-dark">5⁰ <span className="font-sans font-normal text-text-secondary">(не пишем)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Связь двух алгоритмов (методический совет) — v2.5.0 */}
            <div className="mt-5 sm:mt-6">
              <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary mb-1 sm:mb-2">
                Связь двух алгоритмов (методический совет)
              </h4>
              <p className="text-text-secondary text-xs sm:text-sm mb-3 sm:mb-4">
                Чтобы не путаться, всегда держите перед глазами эту пару:
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-xs sm:text-sm bg-white">
                  <thead>
                    <tr className="bg-gray-50 text-text-primary">
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-heading font-bold">Характеристика</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-heading font-bold text-nok-dark">НОК (Наименьшее общее кратное)</th>
                      <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-heading font-bold text-nod-dark">НОД (Наибольший общий делитель)</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-primary">
                    <tr className="border-t border-border align-top">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Что ищем?</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">Самое маленькое число, которое делится на данные</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">Самое большое число, на которое делятся данные</td>
                    </tr>
                    <tr className="border-t border-border align-top">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Какие основания берём?</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">Все уникальные основания</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">Только общие основания</td>
                    </tr>
                    <tr className="border-t border-border align-top">
                      <td className="px-2 sm:px-4 py-2 sm:py-3 font-semibold">Какую степень выбираем?</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">Максимальную (чтобы «покрыть» все числа)</td>
                      <td className="px-2 sm:px-4 py-2 sm:py-3">Минимальную (чтобы «влезло» в каждое число)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Мнемоническое правило */}
              <div className="mt-3 sm:mt-4 flex items-start gap-2 sm:gap-3 bg-green-50 border-2 border-green-200 rounded-xl p-3 sm:p-4">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-text-primary">
                  <strong>Мнемоническое правило:</strong> НОК — «сборная солянка»: нам нужно самое большое и сильное,
                  чтобы оно смогло поделить на всех, поэтому берём <span className="font-mono font-bold text-nok-dark">max</span>.{' '}
                  НОД — «общий знаменатель»: самое скромное и маленькое, что есть у всех, поэтому берём{' '}
                  <span className="font-mono font-bold text-nod-dark">min</span>.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Interactive Example */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 sm:mt-8"
          >
            <button
              onClick={() => {
                setShowExample(!showExample);
                if (!showExample) setCurrentStep(0);
              }}
              className="w-full flex items-center justify-between p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-card border border-border hover:shadow-card-hover transition-shadow touch-manipulation"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-nod/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-nod-dark" />
                </div>
                <div className="text-left">
                  <h4 className="font-heading font-bold text-base sm:text-xl text-text-primary">Интерактивный пример</h4>
                  <p className="text-text-secondary text-xs sm:text-sm">НОД({exampleNumbers.a}, {exampleNumbers.b}) — пошаговое решение</p>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-text-secondary transition-transform flex-shrink-0 ${showExample ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {showExample && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 sm:p-6 bg-gray-50 rounded-b-xl sm:rounded-b-2xl border-x border-b border-border">
                    {/* Step Navigation */}
                    <div className="flex gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                      {steps.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentStep(index)}
                          className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl font-heading font-semibold text-xs sm:text-sm transition-all touch-manipulation ${currentStep === index
                            ? 'bg-nod text-white'
                            : 'bg-white text-text-secondary hover:bg-gray-100'
                            }`}
                        >
                          Шаг {index + 1}
                        </button>
                      ))}
                    </div>

                    {/* Current Step */}
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-nod flex items-center justify-center text-white font-bold text-xs sm:text-base">
                          {currentStep + 1}
                        </div>
                        <h5 className="font-heading font-bold text-base sm:text-lg text-text-primary">
                          {steps[currentStep].title}
                        </h5>
                      </div>
                      {steps[currentStep].content}
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-3 sm:mt-4">
                      <button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        disabled={currentStep === 0}
                        className="px-3 sm:px-4 py-2 rounded-lg font-heading font-semibold text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors touch-manipulation"
                      >
                        ← Назад
                      </button>
                      <button
                        onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
                        disabled={currentStep === steps.length - 1}
                        className="px-3 sm:px-4 py-2 rounded-lg bg-nod text-white font-heading font-semibold text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-nod-dark transition-colors touch-manipulation"
                      >
                        Далее →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
