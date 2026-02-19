import { motion } from 'framer-motion';
import { Calculator, BookOpen, GraduationCap, ExternalLink } from 'lucide-react';

const resources = [
  { label: 'ФГОС начального общего образования', href: 'https://fgos.ru/' },
  { label: 'Российская образовательная платформа', href: 'https://resh.edu.ru/' },
  { label: 'ЯКласс', href: 'https://yaklass.ru/' }
];

export default function Footer() {
  return (
    <footer
      className="bg-text-primary text-white py-10 sm:py-16"
      style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="section-container">
        <div className="section-inner">
          <div className="grid md:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Logo & Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-nok flex items-center justify-center">
                  <Calculator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg">Математика</h3>
                  <p className="text-xs sm:text-sm text-white/60">5 класс</p>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                Интерактивный образовательный сайт по теме "НОД и НОК"
                для учеников 5 класса. Соответствует программе ФГОС России.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-nod" />
                <h3 className="font-heading font-bold text-base sm:text-lg">Разделы</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {[
                  { label: 'Главная', href: '#hero' },
                  { label: 'Теория НОД', href: '#nod' },
                  { label: 'Теория НОК', href: '#nok' },
                  { label: 'Калькулятор', href: '#calculator' },
                  { label: 'Практика', href: '#practice' },
                  { label: 'Тест', href: '#quiz' },
                ].map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-nok transition-colors text-sm sm:text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-nok" />
                <h3 className="font-heading font-bold text-base sm:text-lg">Полезные ресурсы</h3>
              </div>
              <ul className="space-y-1.5 sm:space-y-2">
                {resources.map((resource) => (
                  <li key={resource.href}>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-nok transition-colors inline-flex items-center gap-1 text-sm sm:text-base"
                    >
                      {resource.label}
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
              <p className="text-white/50 text-xs sm:text-sm text-center sm:text-left">
                Образовательный сайт по математике.
              </p>
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/50 text-xs sm:text-sm">
                <span>© Сайт разработан в 2026г<span> </span>
                  <a
                    href="https://t.me/osmaav"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-nok transition-colors inline-flex items-center gap-1"
                  >
                    osmaav
                    <svg
                      className="inline-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 32 32">
                      <path d="M26.07 3.996a2.974 2.974 0 0 0-.933.223h-.004c-.285.113-1.64.683-3.7 1.547l-7.382 3.109c-5.297 2.23-10.504 4.426-10.504 4.426l.062-.024s-.359.118-.734.375a2.03 2.03 0 0 0-.586.567c-.184.27-.332.683-.277 1.11.09.722.558 1.155.894 1.394.34.242.664.355.664.355h.008l4.883 1.645c.219.703 1.488 4.875 1.793 5.836.18.574.355.933.574 1.207.106.14.23.257.379.351a1.119 1.119 0 0 0 .246.106l-.05-.012c.015.004.027.016.038.02.04.011.067.015.118.023.773.234 1.394-.246 1.394-.246l.035-.028 2.883-2.625 4.832 3.707.11.047c1.007.442 2.027.196 2.566-.238.543-.437.754-.996.754-.996l.035-.09 3.734-19.129c.106-.472.133-.914.016-1.343a1.807 1.807 0 0 0-.781-1.047 1.872 1.872 0 0 0-1.067-.27Zm-.101 2.05c-.004.063.008.056-.02.177v.011l-3.699 18.93c-.016.027-.043.086-.117.145-.078.062-.14.101-.465-.028l-5.91-4.531-3.57 3.254.75-4.79 9.656-9c.398-.37.265-.448.265-.448.028-.454-.601-.133-.601-.133l-12.176 7.543-.004-.02-5.836-1.965v-.004l-.015-.003a.27.27 0 0 0 .03-.012l.032-.016.031-.011s5.211-2.196 10.508-4.426c2.652-1.117 5.324-2.242 7.379-3.11 2.055-.863 3.574-1.496 3.66-1.53.082-.032.043-.032.102-.032Z" />
                    </svg>
                  </a>
                  <span>
                  </span>для собстенного ребенка</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
