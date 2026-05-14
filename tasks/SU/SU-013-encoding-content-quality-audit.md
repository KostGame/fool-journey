# SU-013: Encoding and content quality audit

## Контекст

По Issue #37 и BETA-000 нужно перед beta-аудитом проверить кодировку, убрать битые русские строки и вычитать игровые тексты так, чтобы интерфейс звучал как нормальный мобильный текстовый квест.

## Цель

- добавить автоматическую проверку кодировки;
- подтвердить, что `index.html` содержит `<meta charset="UTF-8" />`;
- убрать replacement character `U+FFFD`, явные mojibake-паттерны и другие следы битой кодировки;
- вычитать вопросы сцен и короткие подписи кнопок;
- сохранить story flow, `Дневник Шута` и thumbnails.

## Scope

- `scripts/check-encoding.mjs` или эквивалент;
- `package.json` для `npm run check:encoding`;
- `src/data/majorArcanaPath.ts`;
- `src/data/minorArcanaEvents.ts`;
- `src/data/dialogueScenes.ts`;
- `src/data/*.test.ts` для content-quality checks;
- `docs/BETA_TRANSITION.md`;
- `docs/GAME_DESIGN.md`;
- `docs/CHECKS.md`;
- `docs/ROADMAP.md`;
- `README.md`;
- `CHANGELOG.md`;
- `reports/SU-013-encoding-content-quality-audit.md`.

## Проверки

- `npm run check`
- `npm run check:encoding`
- `npm test`
- `npm run build`
- `git diff --check`

## Риски

- случайно тронуть хорошие UTF-8 строки при замене;
- задеть story flow или journal-экран;
- сделать content-check слишком хрупким;
- оставить в UI слишком технические подписи вместо коротких игровых действий.
