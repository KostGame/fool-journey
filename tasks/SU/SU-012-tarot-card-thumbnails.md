# SU-012: Add tarot card thumbnails

## Контекст

По Issue #34 нужно добавить локальные миниатюры карт Таро в `scene`, `result` и `Дневник Шута`, чтобы игра стала визуально ближе к Tarot-квесту.

## Цель

- подключить public domain Rider–Waite / Waite–Smith изображения локально;
- добавить mapping `cardId -> image`;
- показать миниатюры в сцене, результате и дневнике;
- предусмотреть fallback для отсутствующих изображений;
- сохранить mobile-first UI и текущий story flow.

## Scope

- `src/data/cardImages.ts`;
- `public/assets/cards/`;
- `src/app.ts` для scene/result/journal rendering;
- `src/style.css` для thumbnail layout;
- `src/data/cardImages.test.ts` и обновление render tests;
- `docs/ASSETS.md` и синхронизация beta-документов;
- `reports/SU-012-tarot-card-thumbnails.md`.

## Проверки

- `npm run check`
- `npm test`
- `npm run build`
- `git diff --check`

## Риски

- возможное несовпадение cardId и имени файла;
- слишком крупные миниатюры на мобильном;
- битая ссылка на изображение при неполном mapping;
- случайное нарушение читаемости scene/result/journal.
