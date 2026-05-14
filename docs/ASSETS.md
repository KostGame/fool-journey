# ASSETS

## Источник миниатюр

Для SU-012 используются локальные миниатюры из набора Rider–Waite–Smith tarot deck, взятые из Wikimedia Commons.

- Категория источника: [Rider-Waite-Smith tarot deck (TaionWC)](https://commons.wikimedia.org/wiki/Category:Rider-Waite-Smith_tarot_deck_(TaionWC))
- Пример файла: [RWS_Tarot_00_Fool.jpg](https://commons.wikimedia.org/wiki/File:RWS_Tarot_00_Fool.jpg)
- Лицензия на страницах файлов: public domain / Public Domain Mark

## Как используются ассеты

- Все изображения лежат локально в `public/assets/cards/`.
- Приложение не обращается к внешним серверам за картинками во время работы.
- В коде есть явный mapping `cardId -> image`.
- Если изображение для карты отсутствует, экран показывает аккуратный fallback вместо битой картинки.

## Покрытие

- Покрыто изображениями: `78/78`
- Старшие арканы: `22/22`
- Младшие арканы: `56/56`

## Что важно помнить

- Это исторически сложившийся public domain набор, который подходит для статического Pages-приложения.
- Если позже потребуется другой визуальный стиль, его лучше добавить отдельной задачей, не ломая текущий mapping и fallback.
