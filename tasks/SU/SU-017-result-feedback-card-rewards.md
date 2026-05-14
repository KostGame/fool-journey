# SU-017: Make result feedback and card rewards explicit

## Контекст

Issue #47 просит сделать результат выбора на экране `result` понятным без грубой схемы `правильно / неправильно`. Игрок должен сразу видеть, что он выбрал, как это повлияло на сцену, какую карту получил или применил, и почему этот ход полезен дальше по пути.

## Цель

- сделать feedback после выбора ясным и игровым;
- показать outcome tone: `Удачный ход`, `Осторожный ход`, `Рискованный ход`, `Новый опыт`;
- явно подписать `Получено в Карты Шута`, `Применено из Карт Шута`, `Помощник пути`;
- объяснить, зачем полученная или применённая карта нужна дальше;
- сделать inventory panel понятнее, не ломая journal, thumbnails и основной story flow.

## Не делаем

- не превращаем результат в тест `правильно / неправильно`;
- не добавляем новые главы, карты и режимы;
- не меняем сюжетную архитектуру;
- не убираем journal, thumbnails и beta flow;
- не делаем сложную RPG-экономику.

## Что затрону

- `src/app.ts`;
- `src/style.css`;
- `src/app.test.ts`;
- `src/domain/models.ts`;
- `src/domain/progress.ts`;
- `src/domain/storage.ts`;
- `src/domain/storage.test.ts`;
- `docs/GAME_DESIGN.md`;
- `docs/ARCHITECTURE.md`;
- `docs/CHECKS.md`;
- `docs/BETA_TRANSITION.md`;
- `docs/ROADMAP.md`;
- `README.md`;
- `CHANGELOG.md`;
- `reports/SU-017-result-feedback-card-rewards.md`.

## Проверки

- `npm run check`
- `npm run check:encoding`
- `npm test`
- `npm run build`
- `git diff --check`

## Риски

- результат может стать перегруженным, если reward-блоки дублировать слишком крупно;
- важно сохранить читаемость на mobile viewport 360-430 px;
- нужно аккуратно показать пользу карты, но не превратить экран в длинную справку.
