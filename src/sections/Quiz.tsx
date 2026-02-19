import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trophy, RotateCcw, HelpCircle, Sparkles, Star, Award, Target } from 'lucide-react';
import { generateQuizQuestions } from '@/lib/math';
import confetti from 'canvas-confetti';

const questions = generateQuizQuestions();

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setAnswers(prev => ({ ...prev, [currentQuestion]: answerIndex }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
      const correctCount = Object.entries(answers).filter(
        ([qId, aId]) => questions[parseInt(qId)].correctAnswer === aId
      ).length;

      if (correctCount >= 8) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4ECDC4', '#FF6B6B', '#FFE66D', '#2ECC71']
        });
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers({});
    setShowResult(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([qId, aId]) => {
      if (questions[parseInt(qId)].correctAnswer === aId) {
        correct++;
      }
    });
    return correct;
  };

  const getGrade = (score: number) => {
    if (score >= 9) return { label: 'Отлично!', color: 'text-success', icon: Award, bg: 'bg-success/10' };
    if (score >= 7) return { label: 'Хорошо!', color: 'text-nok-dark', icon: Star, bg: 'bg-nok/10' };
    if (score >= 5) return { label: 'Удовлетворительно', color: 'text-yellow-600', icon: Target, bg: 'bg-yellow-accent/30' };
    return { label: 'Нужно подучить', color: 'text-error', icon: HelpCircle, bg: 'bg-error/10' };
  };

  if (showResult) {
    const score = calculateScore();
    const grade = getGrade(score);
    const GradeIcon = grade.icon;

    return (
      <section id="quiz" className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="section-container">
          <div className="section-inner">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto px-4"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-card border border-border text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className={`w-16 h-16 sm:w-24 sm:h-24 rounded-full ${grade.bg} flex items-center justify-center mx-auto mb-4 sm:mb-6`}
                >
                  <GradeIcon className={`w-8 h-8 sm:w-12 sm:h-12 ${grade.color}`} />
                </motion.div>

                <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-text-primary mb-3 sm:mb-4">
                  {grade.label}
                </h2>

                <div className="mb-6 sm:mb-8">
                  <p className="text-4xl sm:text-6xl font-bold font-heading mb-1 sm:mb-2">
                    <span className={grade.color}>{score}</span>
                    <span className="text-text-secondary text-2xl sm:text-4xl">/{questions.length}</span>
                  </p>
                  <p className="text-text-secondary text-sm sm:text-base">
                    Правильных ответов
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden mb-6 sm:mb-8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={`h-full rounded-full ${score >= 7 ? 'bg-gradient-to-r from-nok to-success' : 'bg-gradient-to-r from-error to-yellow-500'
                      }`}
                  />
                </div>

                {/* Review Answers */}
                <div className="text-left mb-6 sm:mb-8">
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-text-primary mb-3 sm:mb-4">Разбор ошибок:</h3>
                  <div className="space-y-2 sm:space-y-3 max-h-48 sm:max-h-60 overflow-y-auto scroll-momentum">
                    {questions.map((q, i) => {
                      const userAnswer = answers[i];
                      const isCorrect = userAnswer === q.correctAnswer;

                      if (isCorrect) return null;

                      return (
                        <div key={q.id} className="p-3 sm:p-4 bg-error/5 rounded-xl border border-error/20">
                          <p className="font-medium text-text-primary mb-1 sm:mb-2 text-sm sm:text-base">{q.question}</p>
                          <p className="text-xs sm:text-sm text-error mb-1">
                            Твой ответ: {q.options[userAnswer ?? 0]}
                          </p>
                          <p className="text-xs sm:text-sm text-success">
                            Правильно: {q.options[q.correctAnswer]}
                          </p>
                          <p className="text-xs sm:text-sm text-text-secondary mt-1 sm:mt-2">
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                    {score === questions.length && (
                      <div className="p-3 sm:p-4 bg-success/10 rounded-xl border border-success/30 text-center">
                        <p className="text-success font-heading font-bold text-sm sm:text-base">
                          🎉 Поздравляем! Все ответы правильные!
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <motion.button
                  onClick={handleRestart}
                  className="btn-primary w-full sm:w-auto text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Пройти ещё раз
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <section id="quiz" className="py-12 sm:py-20 bg-gradient-to-b from-white to-gray-50">
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
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-nok/10 text-nok-dark font-heading font-semibold text-xs sm:text-sm mb-4">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
              Проверь себя
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-3 sm:mb-4">
              Тест на <span className="text-gradient-nok">знания</span>
            </h2>
            <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              Ответь на 10 вопросов и проверь, как хорошо ты усвоил материал
            </p>
          </motion.div>

          {/* Quiz Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto px-4"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-card border border-border">
              {/* Progress */}
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs sm:text-sm text-text-secondary">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </span>
                  <span className="text-xs sm:text-sm font-heading font-bold text-nok-dark">
                    {Math.round((currentQuestion / questions.length) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-nok/5 to-nok rounded-full"
                  />
                </div>
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h3 className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-text-primary mb-4 sm:mb-6">
                    {question.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {question.options.map((option, index) => {
                      const isSelected = selectedAnswer === index;
                      const isCorrectAnswer = index === question.correctAnswer;

                      let buttonClass = 'border-border hover:border-nok hover:bg-nok/5';
                      if (isAnswered) {
                        if (isCorrectAnswer) {
                          buttonClass = 'border-success bg-success/10';
                        } else if (isSelected) {
                          buttonClass = 'border-error bg-error/10';
                        } else {
                          buttonClass = 'border-border opacity-50';
                        }
                      } else if (isSelected) {
                        buttonClass = 'border-nod bg-nok/10';
                      }

                      return (
                        <motion.button
                          key={index}
                          onClick={() => handleAnswer(index)}
                          disabled={isAnswered}
                          className={`w-full p-3 sm:p-4 rounded-xl border-2 text-left transition-all touch-manipulation ${buttonClass}`}
                          whileHover={!isAnswered ? { scale: 1.02 } : {}}
                          whileTap={!isAnswered ? { scale: 0.98 } : {}}
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <span className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs sm:text-sm ${isAnswered
                              ? isCorrectAnswer
                                ? 'bg-success text-white'
                                : isSelected
                                  ? 'bg-error text-white'
                                  : 'bg-gray-100 text-text-secondary'
                              : isSelected
                                ? 'bg-nod text-white'
                                : 'bg-gray-100 text-text-secondary'
                              }`}>
                              {String.fromCharCode(65 + index)}
                            </span>
                            <span className="font-medium text-text-primary text-sm sm:text-base">{option}</span>
                            {isAnswered && isCorrectAnswer && (
                              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-success ml-auto flex-shrink-0" />
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className={`p-3 sm:p-4 rounded-xl mb-4 sm:mb-6 ${isCorrect ? 'bg-success/10 border border-success/30' : 'bg-error/10 border border-error/30'
                          }`}
                      >
                        <p className={`font-heading font-bold mb-1 sm:mb-2 text-sm sm:text-base ${isCorrect ? 'text-success' : 'text-error'}`}>
                          {isCorrect ? '✓ Правильно!' : '✗ Неверно'}
                        </p>
                        <p className="text-text-secondary text-xs sm:text-sm">
                          {question.explanation}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Next Button */}
                  {isAnswered && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleNext}
                      className="w-full btn-primary text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {currentQuestion < questions.length - 1 ? 'Следующий вопрос →' : 'Завершить тест'}
                    </motion.button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mt-4 sm:mt-6 text-center px-4"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 text-text-secondary text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-accent" />
              <span>Совет: внимательно читай вопросы и проверяй свои ответы</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
