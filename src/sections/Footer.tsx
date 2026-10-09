// @/src/sections/Footer.tsx
// v2.2.1 — подвал заменён на дизайн подвала из проекта mathematics-divisibility
// (https://github.com/osmaav/mathematics-divisibility), добавлена ссылка на сайт
// «Правила делимости» в шапке которого есть обратная ссылка на этот проект.

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-100 mt-8">
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <div className="text-2xl mb-2">🎓</div>
      <p className="text-sm text-gray-500 font-medium">Математика 5 класс — НОД и НОК</p>
      <p className="text-xs text-gray-400 mt-1">Интерактивный учебный ресурс</p>
      <div className="flex justify-center gap-4 mt-4">
        <span className="text-xs text-gray-400">Сделано с ❤️ для сына Андрея</span>
      </div>
      {/* v2.2.1: ссылка на связанный проект о правилах делимости (открывается в текущей вкладке) */}
      <p className="text-xs mt-3">
        <a
          href="https://osmaav.github.io/mathematics-divisibility/"
          className="text-violet-600 hover:text-violet-700 hover:underline"
        >
          Правила делимости →
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
