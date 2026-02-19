import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Percent, ChevronDown, Lightbulb, CheckCircle2, ArrowRight } from 'lucide-react';
import { getMultiples, getCommonMultiples, primeFactorization, formatFactorization } from '@/lib/math';

const exampleNumbers = { a: 4, b: 6 };

export default function NOKTheory() {
  const [showExample, setShowExample] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const multiplesA = getMultiples(exampleNumbers.a, 50);
  const multiplesB = getMultiples(exampleNumbers.b, 50);
  const commonMultiples = getCommonMultiples(exampleNumbers.a, exampleNumbers.b, 50);
  const factorsA = primeFactorization(exampleNumbers.a);
  const factorsB = primeFactorization(exampleNumbers.b);

  const steps = [
    {
      title: 'Разложим числа на простые множители',
      content: (
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-mono text-base sm:text-lg font-bold text-nok-dark">{exampleNumbers.a}</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-text-secondary flex-shrink-0" />
            <span className="font-mono text-sm sm:text-lg">{formatFactorization(factorsA)}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="font-mono text-base sm:text-lg font-bold text-nok-dark">{exampleNumbers.b}</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-text-secondary flex-shrink-0" />
            <span className="font-mono text-sm sm:text-lg">{formatFactorization(factorsB)}</span>
          </div>
        </div>
      )
    },
    {
      title: 'Возьмём все множители с наибольшими степенями',
      content: (
        <div className="space-y-2 sm:space-y-3">
          <p className="text-text-secondary text-sm sm:text-base">Из разложений берём все простые множители с наибольшими показателями:</p>
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg font-mono text-xs sm:text-sm bg-nok/20 text-nok-dark">2²</span>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg font-mono text-xs sm:text-sm bg-nok/20 text-nok-dark">3</span>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm">(взяли 2² из {exampleNumbers.a} и 3 из {exampleNumbers.b})</p>
        </div>
      )
    },
    {
      title: 'Перемножим множители',
      content: (
        <div className="space-y-2 sm:space-y-3">
          <p className="font-mono text-base sm:text-lg">2² × 3 = 4 × 3 = <span className="text-nok-dark font-bold text-xl sm:text-2xl">12</span></p>
          <p className="text-text-secondary text-sm sm:text-base">Значит, НОК({exampleNumbers.a}, {exampleNumbers.b}) = 12</p>
        </div>
      )
    }
  ];

  return (
    <section id="nok" className="py-12 sm:py-20 bg-gray-50">
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
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-nok/10 text-nok-dark font-heading font-semibold text-xs sm:text-sm mb-4">
              <Percent className="w-3 h-3 sm:w-4 sm:h-4" />
              Наименьшее общее кратное
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-3 sm:mb-4">
              Что такое <span className="text-gradient-nok">НОК</span>?
            </h2>
            <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              Наименьшее общее кратное — это самое маленькое число, которое делится на два или более чисел без остатка
            </p>
          </motion.div>

          {/* Definition Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-nok/5 to-nok/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 mb-6 sm:mb-8 border-2 border-nok/20"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-nok flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-primary mb-2 sm:mb-3">Определение</h3>
                <p className="text-base sm:text-lg text-text-primary leading-relaxed">
                  <span className="highlight-nok">Наименьшее общее кратное (НОК)</span> двух или нескольких натуральных чисел — 
                  это <strong>наименьшее</strong> натуральное число, которое <strong>делится без остатка</strong> на каждое из данных чисел.
                </p>
                <p className="text-base sm:text-lg text-text-primary mt-2 sm:mt-3">
                  Обозначается как: <span className="math-formula mt-1 sm:mt-2 inline-block text-sm sm:text-base">НОК(a, b)</span> или <span className="math-formula mt-1 sm:mt-2 inline-block text-sm sm:text-base">[a, b]</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Example with Multiples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
          >
            {/* Multiples of 4 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card border border-border">
              <h4 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-3 sm:mb-4">
                Кратные числа <span className="text-nok-dark">{exampleNumbers.a}</span>:
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {multiplesA.slice(0, 10).map((m, i) => (
                  <span
                    key={i}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm ${
                      commonMultiples.includes(m)
                        ? 'bg-nok text-white font-bold'
                        : 'bg-gray-100 text-text-secondary'
                    }`}
                  >
                    {m}
                  </span>
                ))}
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm bg-gray-100 text-text-secondary">...</span>
              </div>
            </div>

            {/* Multiples of 6 */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card border border-border">
              <h4 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-3 sm:mb-4">
                Кратные числа <span className="text-nok-dark">{exampleNumbers.b}</span>:
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {multiplesB.slice(0, 10).map((m, i) => (
                  <span
                    key={i}
                    className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm ${
                      commonMultiples.includes(m)
                        ? 'bg-nok text-white font-bold'
                        : 'bg-gray-100 text-text-secondary'
                    }`}
                  >
                    {m}
                  </span>
                ))}
                <span className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-mono text-xs sm:text-sm bg-gray-100 text-text-secondary">...</span>
              </div>
            </div>
          </motion.div>

          {/* Common Multiples Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-nok/5 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-nok/30"
          >
            <h4 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-3 sm:mb-4">
              Общие кратные (выделены цветом):
            </h4>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {commonMultiples.slice(0, 6).map((m, i) => (
                <span
                  key={i}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono font-bold text-sm sm:text-base ${
                    i === 0 ? 'bg-nok text-white' : 'bg-nok/30 text-nok-dark'
                  }`}
                >
                  {m}
                </span>
              ))}
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-mono text-text-secondary bg-gray-100 text-sm sm:text-base">...</span>
            </div>
            <p className="text-base sm:text-lg text-text-primary">
              <span className="highlight-nok">Наименьшее</span> из общих кратных:{' '}
              <span className="font-mono font-bold text-xl sm:text-2xl text-nok-dark">{commonMultiples[0]}</span>
            </p>
            <p className="text-text-secondary mt-1 sm:mt-2 text-sm sm:text-base">
              Значит, НОК({exampleNumbers.a}, {exampleNumbers.b}) = {commonMultiples[0]}
            </p>
          </motion.div>

          {/* Algorithm Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-card border border-border"
          >
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-primary mb-4 sm:mb-6">
              Алгоритм нахождения НОК
            </h3>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="step-number-nok flex-shrink-0 text-sm sm:text-lg w-8 h-8 sm:w-10 sm:h-10">1</div>
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary">Разложить числа на простые множители</h4>
                  <p className="text-text-secondary text-sm sm:text-base">Разложить каждое число на произведение простых чисел</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="step-number-nok flex-shrink-0 text-sm sm:text-lg w-8 h-8 sm:w-10 sm:h-10">2</div>
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary">Вписать все множители первого числа</h4>
                  <p className="text-text-secondary text-sm sm:text-base">Записать все простые множители из разложения первого числа</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="step-number-nok flex-shrink-0 text-sm sm:text-lg w-8 h-8 sm:w-10 sm:h-10">3</div>
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary">Добавить недостающие множители</h4>
                  <p className="text-text-secondary text-sm sm:text-base">Добавить множители из разложения второго числа, которых ещё нет</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="step-number-nok flex-shrink-0 text-sm sm:text-lg w-8 h-8 sm:w-10 sm:h-10">4</div>
                <div>
                  <h4 className="font-heading font-bold text-base sm:text-lg text-text-primary">Перемножить все множители</h4>
                  <p className="text-text-secondary text-sm sm:text-base">Перемножить все записанные множители — это и есть НОК</p>
                </div>
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
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-nok/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-nok-dark" />
                </div>
                <div className="text-left">
                  <h4 className="font-heading font-bold text-base sm:text-xl text-text-primary">Интерактивный пример</h4>
                  <p className="text-text-secondary text-xs sm:text-sm">НОК({exampleNumbers.a}, {exampleNumbers.b}) — пошаговое решение</p>
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
                          className={`flex-1 py-2.5 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl font-heading font-semibold text-xs sm:text-sm transition-all touch-manipulation ${
                            currentStep === index
                              ? 'bg-nok text-white'
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
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-nok flex items-center justify-center text-white font-bold text-xs sm:text-base">
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
                        className="px-3 sm:px-4 py-2 rounded-lg bg-nok text-white font-heading font-semibold text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-nok-dark transition-colors touch-manipulation"
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
