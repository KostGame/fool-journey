# CHECKS

## Обязательные проверки

- `npm run check`
- `npm run check:encoding`
- `npm test`
- `npm run build`
- `git diff --check`

## Локальная разработка

- `npm run dev`
- `npm run preview`

## Mobile smoke-test

Проверять на ширине 360–430 px:

- нет горизонтальной прокрутки;
- главный экран не ломает страницу;
- кнопки и карточки не сжимаются в узкие колонки;
- scene screen открывается как отдельный экран с вопросом и 2–3 понятными выборами;
- result screen показывает реакцию и кнопку `Дальше`;
- `Дневник Шута` открывается как отдельный экран и не ломает основной flow;
- thumbnails карт видны в `scene`, `result` и `journal`;
- fallback не показывает битую картинку, если ассет отсутствует;
- в текстах нет replacement character `U+FFFD` и явных mojibake-паттернов;
- completion screen остаётся читаемым;
- после перезагрузки прогресс восстанавливается;
- reset работает предсказуемо;
- текст нигде не накладывается друг на друга.

## SU-012 thumbnail smoke-test

- открыть Pages;
- дойти до сцены и проверить миниатюру текущей карты;
- пройти выбор и проверить миниатюру на result screen;
- открыть `Дневник Шута` и убедиться, что карточки коллекции показывают миниатюры;
- проверить отсутствие внешних ссылок на изображения;
- при отсутствии картинки увидеть аккуратный fallback.

## SU-013 encoding and content smoke-test

- запустить `npm run check:encoding`;
- проверить, что `index.html` содержит `<meta charset="UTF-8" />`;
- открыть Pages и убедиться, что русские строки читаются без replacement character и явных mojibake-паттернов;
- пройти несколько сцен и проверить, что вопросы звучат прямо;
- убедиться, что action labels остаются короткими и без технических формулировок;
- проверить, что `Дневник Шута`, result screen и thumbnails не ломаются от текстовых правок.

## SU-014 beta readiness mobile smoke pass

- открыть [docs/BETA_CHECKLIST.md](BETA_CHECKLIST.md) и пройти его как финальный beta smoke-test;
- открыть Pages на мобильной ширине 360-430 px;
- пройти основной flow `home → scene → result → next scene → completion`;
- проверить `Дневник Шута`, inventory statuses, thumbnails и fallback;
- убедиться, что `npm run check:encoding` проходит и в интерфейсе нет `U+FFFD` или явных mojibake-паттернов;
- если найден крупный blocker, остановиться, создать follow-up Issue и не ставить beta status;
- если все проверки зелёные, зафиксировать `Project status: beta` в документации.
