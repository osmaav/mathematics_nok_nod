#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
========================================================================
 scripts/generate-icons.py
 Версия скрипта: 1.0.0 (релиз приложения v2.1.0)
 Назначение: генерация PNG-иконок для PWA/web-app на iOS.
------------------------------------------------------------------------
 Покрывает экраны устройств:
   iPhone 7 ... iPhone 16  (физические размеры @2x / @3x)
   iPad 6 ... iPad 10      (физический размер @2x)
 А также: favicon 32/48, apple-touch-icon 180, иконки manifest 192/512.
------------------------------------------------------------------------
 Дизайн иконки: скруглённый квадрат с фирменным градиентом проекта
 (бирюзовый НОД #3BA99F -> красный НОК #E85555), символ "÷" и подпись
 "НОД · НОК".
------------------------------------------------------------------------
 Запуск:  python3 scripts/generate-icons.py
 Выход:   public/icons/*.png  (копируются в выходную папку при сборке Vite)
========================================================================
"""

import os
from PIL import Image, ImageDraw, ImageFont

# --- Параметры дизайна ---
BASE = 1024                      # базовый размер исходного изображения (px)
CORNER_RADIUS_RATIO = 0.2237     # коэффициент скругления "squircle" iOS
COLOR_NOD = (59, 169, 159)       # #3BA99F — фирменный цвет НОД
COLOR_NOK = (232, 85, 85)        # #E85555 — фирменный цвет НОК
FONT_PATH = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                       "public", "icons")

# Таблица размеров: имя файла -> физический размер в пикселях (квадрат).
# Соответствие экранам устройств:
SIZES = {
    # --- Common PWA / favicon ---
    "favicon-32.png": 32,             # ярлык вкладки браузера
    "favicon-48.png": 48,             # Android Chrome адресная строка
    "apple-touch-icon.png": 180,      # стандартный Apple Touch Icon
    "icon-192.png": 192,              # webmanifest (Android/desktop)
    "icon-512.png": 512,              # webmanifest + App Store (масштабируется)
    # --- iPhone 7...iPhone 16 ---
    "iphone-750x1334.png": 750,       # iPhone 7/8/SE2/SE3 @2x (375x667pt)
    "iphone-1125x2436.png": 1125,     # iPhone X/XS/11 Pro/12 mini/13 mini @3x
    "iphone-828x1792.png": 828,       # iPhone XR/11 @2x (414x896pt)
    "iphone-1242x2688.png": 1242,     # iPhone XS Max/11 Pro Max @3x
    "iphone-780x1688.png": 780,       # iPhone 12/13/14/15/16 @2x (390x844pt)
    "iphone-1170x2532.png": 1170,     # iPhone 12 Pro/13 Pro/14/15/16 Pro @3x
    "iphone-1290x2796.png": 1290,     # iPhone 14 Plus/16 Plus/16 Pro Max @3x
    # --- iPad 6...iPad 10 ---
    "ipad-1536x2048.png": 1536,       # iPad 6/7 (10.2") @2x, портрет
    "ipad-1620x2160.png": 1620,       # iPad 8/9 (10.2") @2x, лог. 810x1080pt
    "ipad-1640x2360.png": 1640,       # iPad 10 (10.9") @2x, лог. 820x1180pt
}


def make_base(size: int) -> Image.Image:
    """Рисует базовую иконку произвольного размера (квадрат, RGBA)."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # 1. Диагональный градиент НОД -> НОК
    step = max(1, size // 200)         # шаг растра (ускорение отрисовки)
    for y in range(size):
        for x0 in range(0, size, step):
            t = (x0 + y) / (2 * size)  # 0..1 по диагонали
            cr = int(COLOR_NOD[0] + (COLOR_NOK[0] - COLOR_NOD[0]) * t)
            cg = int(COLOR_NOD[1] + (COLOR_NOK[1] - COLOR_NOD[1]) * t)
            cb = int(COLOR_NOD[2] + (COLOR_NOK[2] - COLOR_NOD[2]) * t)
            d.rectangle([x0, y, min(x0 + step - 1, size - 1), y], fill=(cr, cg, cb, 255))

    # 2. Маска скруглённых углов (iOS squircle)
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    rad = int(size * CORNER_RADIUS_RATIO)
    md.rounded_rectangle([0, 0, size - 1, size - 1], radius=rad, fill=255)
    img.putalpha(mask)

    td = ImageDraw.Draw(img)

    # 3. Полупрозрачная белая "плитка" под знаком деления
    tile = int(size * 0.5)
    tx = (size - tile) // 2
    ty = int(size * 0.10)
    td.rounded_rectangle([tx, ty, tx + tile, ty + tile],
                         radius=int(tile * 0.18),
                         fill=(255, 255, 255, 46))

    # 4. Символ "÷"
    try:
        f_div = ImageFont.truetype(FONT_PATH, int(size * 0.42))
    except OSError:
        f_div = ImageFont.load_default()
    bbox = td.textbbox((0, 0), "÷", font=f_div)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    td.text(((size - tw) // 2 - bbox[0], ty + (tile - th) // 2 - bbox[1]),
            "÷", font=f_div, fill=(255, 255, 255, 255))

    # 5. Подпись "НОД · НОК"
    try:
        f_txt = ImageFont.truetype(FONT_PATH, int(size * 0.085))
    except OSError:
        f_txt = ImageFont.load_default()
    label = "НОД · НОК"
    bbox = td.textbbox((0, 0), label, font=f_txt)
    lw = bbox[2] - bbox[0]
    td.text(((size - lw) // 2 - bbox[0], int(size * 0.72) - bbox[1]),
            label, font=f_txt, fill=(255, 255, 255, 235))

    return img


def main():
    """Генерирует все иконки из таблицы SIZES."""
    os.makedirs(OUT_DIR, exist_ok=True)
    base = make_base(BASE)             # рисуем один раз в максимальном качестве
    for name, px in SIZES.items():
        icon = base.resize((px, px), Image.LANCZOS)
        icon.save(os.path.join(OUT_DIR, name), "PNG", optimize=True)
        print(f"[v1.0.0] создан {name} ({px}x{px})")
    print("Готово. Иконки размещены в public/icons/")


if __name__ == "__main__":
    main()
