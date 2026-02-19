import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Lightbulb, Eye, CheckCircle2, XCircle, RotateCcw, Trophy, Target } from 'lucide-react';
import { generatePracticeTasks } from '@/lib/math';
import { Input } from '@/components/ui/input';

const tasks = generatePracticeTasks();

export default function Practice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [showSolutions, setShowSolutions] = useState<Record<number, boolean>>({});
  const [correctCount, setCorrectCount] = useState(0);

  const filteredTasks = selectedDifficulty === 'all' 
    ? tasks 
    : tasks.filter(t => t.difficulty === selectedDifficulty);

  const handleCheck = (taskId: number, correctAnswer: number) => {
    const userAnswer = parseInt(answers[taskId]);
    const isCorrect = userAnswer === correctAnswer;
    
    if (!checked[taskId]) {
      setChecked(prev => ({ ...prev, [taskId]: true }));
      if (isCorrect) {
        setCorrectCount(prev => prev + 1);
      }
    }
  };

  const handleReset = () => {
    setAnswers({});
    setChecked({});
    setShowHints({});
    setShowSolutions({});
    setCorrectCount(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success/10 text-success';
      case 'medium': return 'bg-yellow-accent/30 text-text-primary';
      case 'hard': return 'bg-error/10 text-error';
      default: return 'bg-gray-100 text-text-secondary';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Простое';
      case 'medium': return 'Среднее';
      case 'hard': return 'Сложное';
      default: return '';
    }
  };

  return (
    <section id="practice" className="py-12 sm:py-20 bg-gray-50">
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
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-success/10 text-success font-heading font-semibold text-xs sm:text-sm mb-4">
              <CheckSquare className="w-3 h-3 sm:w-4 sm:h-4" />
              Практика
            </div>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary mb-3 sm:mb-4">
              Реши <span className="text-gradient-nod">задачи</span> самостоятельно
            </h2>
            <p className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto px-4">
              Закрепи знания на практике. Выбери уровень сложности и реши задания!
            </p>
          </motion.div>

          {/* Stats & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            {/* Difficulty Filter */}
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {[
                { key: 'all', label: 'Все' },
                { key: 'easy', label: '🟢 Простые' },
                { key: 'medium', label: '🟡 Средние' },
                { key: 'hard', label: '🔴 Сложные' },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedDifficulty(filter.key as any)}
                  className={`px-3 sm:px-4 py-2 rounded-xl font-heading font-semibold text-xs sm:text-sm transition-all touch-manipulation ${
                    selectedDifficulty === filter.key
                      ? 'bg-text-primary text-white'
                      : 'bg-white text-text-secondary hover:bg-gray-100 border border-border'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white rounded-xl border border-border">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-accent" />
                <span className="font-heading font-bold text-text-primary text-sm sm:text-base">
                  {correctCount} / {tasks.length}
                </span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white rounded-xl border border-border hover:bg-gray-100 transition-colors touch-manipulation"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-text-secondary" />
                <span className="font-heading font-semibold text-xs sm:text-sm text-text-secondary">Сбросить</span>
              </button>
            </div>
          </motion.div>

          {/* Tasks Grid */}
          <div className="grid md:grid-cols-2 gap-3 sm:gap-6">
            {filteredTasks.map((task, index) => {
              const isChecked = checked[task.id];
              const isCorrect = parseInt(answers[task.id]) === task.answer;
              const showHint = showHints[task.id];
              const showSolution = showSolutions[task.id];

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card border-2 transition-all ${
                    isChecked
                      ? isCorrect
                        ? 'border-success'
                        : 'border-error'
                      : 'border-border hover:shadow-card-hover'
                  }`}
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs font-bold ${getDifficultyColor(task.difficulty)}`}>
                        {getDifficultyLabel(task.difficulty)}
                      </span>
                      <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs font-bold ${
                        task.type === 'nod' ? 'bg-nod/10 text-nod-dark' : 'bg-nok/10 text-nok-dark'
                      }`}>
                        {task.type === 'nod' ? 'НОД' : 'НОК'}
                      </span>
                    </div>
                    {isChecked && (
                      isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-success flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-error flex-shrink-0" />
                      )
                    )}
                  </div>

                  {/* Task Content */}
                  <div className="mb-3 sm:mb-4">
                    <p className="text-base sm:text-lg text-text-primary font-medium">
                      Найдите {task.type === 'nod' ? 'НОД' : 'НОК'}({task.numbers.join(', ')})
                    </p>
                  </div>

                  {/* Answer Input */}
                  <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <Input
                      type="number"
                      value={answers[task.id] || ''}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [task.id]: e.target.value }))}
                      disabled={isChecked}
                      placeholder="Ваш ответ"
                      className={`flex-1 input-field text-sm sm:text-base ${
                        isChecked
                          ? isCorrect
                            ? 'border-success bg-success/5'
                            : 'border-error bg-error/5'
                          : ''
                      }`}
                    />
                    <motion.button
                      onClick={() => handleCheck(task.id, task.answer)}
                      disabled={isChecked || !answers[task.id]}
                      className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-heading font-bold text-white text-sm sm:text-base transition-all touch-manipulation ${
                        isChecked
                          ? isCorrect
                            ? 'bg-success'
                            : 'bg-error'
                          : 'bg-text-primary hover:bg-text-primary/90'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                      whileHover={!isChecked ? { scale: 1.05 } : {}}
                      whileTap={!isChecked ? { scale: 0.95 } : {}}
                    >
                      {isChecked ? (isCorrect ? 'Верно!' : 'Неверно') : 'Проверить'}
                    </motion.button>
                  </div>

                  {/* Hint & Solution Buttons */}
                  <div className="flex gap-2 mb-3 sm:mb-4">
                    <button
                      onClick={() => setShowHints(prev => ({ ...prev, [task.id]: !showHint }))}
                      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg bg-yellow-accent/20 text-text-primary text-xs sm:text-sm font-heading font-semibold hover:bg-yellow-accent/30 transition-colors touch-manipulation"
                    >
                      <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4" />
                      Подсказка
                    </button>
                    <button
                      onClick={() => setShowSolutions(prev => ({ ...prev, [task.id]: !showSolution }))}
                      className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-2 rounded-lg bg-gray-100 text-text-secondary text-xs sm:text-sm font-heading font-semibold hover:bg-gray-200 transition-colors touch-manipulation"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      Решение
                    </button>
                  </div>

                  {/* Hint */}
                  <AnimatePresence>
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-3 sm:mb-4 p-3 sm:p-4 bg-yellow-accent/10 rounded-xl border border-yellow-accent/30"
                      >
                        <p className="text-xs sm:text-sm text-text-primary">
                          <span className="font-bold">Подсказка:</span> {task.hint}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Solution */}
                  <AnimatePresence>
                    {showSolution && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 sm:p-4 bg-gray-100 rounded-xl"
                      >
                        <p className="font-mono text-xs sm:text-sm text-text-primary">
                          <span className="font-bold">Решение:</span> {task.solution}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 sm:mt-12 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-card border border-border"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-nod-dark" />
                <span className="font-heading font-bold text-text-primary text-sm sm:text-base">Ваш прогресс</span>
              </div>
              <span className="font-heading font-bold text-nod-dark text-sm sm:text-base">
                {Math.round((correctCount / tasks.length) * 100)}%
              </span>
            </div>
            <div className="h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(correctCount / tasks.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-nod to-nod-dark rounded-full"
              />
            </div>
            <p className="text-center text-text-secondary mt-3 sm:mt-4 text-sm sm:text-base">
              Решено правильно: <span className="font-bold text-success">{correctCount}</span> из{' '}
              <span className="font-bold text-text-primary">{tasks.length}</span> заданий
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
