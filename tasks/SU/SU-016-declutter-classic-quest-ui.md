# SU-016: Declutter classic quest UI and separate buttons from panels

## Контекст

Issue #45 просит разгрузить классический quest UI после SU-015: оставить явными только реальные действия и навигацию, а статусные блоки, реплики, story panel, visual area и inventory/journal сделать спокойными и не похожими на кнопки.

## Цель

- отделить интерактивные элементы от текстовых и статусных панелей;
- сделать scene screen читаемой текстовой сценой, а не набором тяжёлых карточек;
- оставить actions panel главным интерактивным блоком;
- сохранить journal, thumbnails, story flow и mobile-first поведение.

## Не делаем

- не меняем сюжетную архитектуру;
- не добавляем новые главы, карты и режимы;
- не отключаем `npm run check:encoding`;
- не добавляем backend, авторизацию, внешние API или серверное хранение;
- не делаем новую RPG-экономику;
- не мержим PR самостоятельно.

## Состав работ

- `src/app.ts`;
- `src/style.css`;
- `src/data/cardImages.ts`, если нужно поправить визуальный fallback;
- `src/app.test.ts`;
- `tsconfig.json`, если потребуется для проверки типов;
- `tasks/SU/SU-016-declutter-classic-quest-ui.md`;
- `reports/SU-016-declutter-classic-quest-ui.md`.

## Проверки

- `npm run check`
- `npm run check:encoding`
- `npm test`
- `npm run build`
- `git diff --check`

## Риски

- можно случайно снова сделать story panel слишком похожим на кнопку;
- важно не сломать thumbnail fallback и не вернуть битую миниатюру;
- нужно сохранить понятный mobile layout на 360–430 px.
