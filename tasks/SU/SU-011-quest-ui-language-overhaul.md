# SU-011: Quest UI language overhaul

## Контекст

Проект уже прошёл bootstrap, первый playable cycle, расширение дуги старших арканов, слой inventory и отдельный `Дневник Шута`.
Следующий шаг beta-цепочки описан в `docs/BETA_TRANSITION.md` и базируется на Issue #31.

## Цель

Перевести UI сцен и результатов из состояния технического прототипа в нормальный мобильный текстовый квест.

## Что нужно сделать

- сделать scene screen похожим на экран истории, а не на набор одинаковых карточек;
- выделить роли Рассказчика, Шута, Аркана, Помощника и Мысли Шута;
- превратить варианты выбора в короткие действия;
- сделать вопрос перед выбором прямым и игровым;
- переработать result screen так, чтобы он показывал выбор, реакцию и вывод, а не лог;
- сохранить текущий сюжет, journal и inventory state;
- не добавлять новые главы, карты или режимы.

## Что не делаем

- не переписываем историю;
- не добавляем backend, API, авторизацию или серверное хранение;
- не превращаем игру в RPG-систему;
- не ломаем `home → scene → result → next scene`;
- не используем слово `шпаргалка` в интерфейсе.

## Состав работ

- `src/app.ts` - подача scene/result экранов и текст выбора;
- `src/style.css` - визуальные роли реплик и mobile-first оформление;
- `src/app.test.ts` - проверки на quest UI, прямой вопрос и flow;
- `docs/BETA_TRANSITION.md` - beta-ориентир для цепочки SU-011 → SU-014;
- `docs/GAME_DESIGN.md` - фиксация нового языка подачи;
- `docs/ARCHITECTURE.md` - уточнение роли UI-слоёв;
- `docs/CHECKS.md` - ручной smoke-test для mobile quest UI;
- `docs/ROADMAP.md`, `README.md`, `CHANGELOG.md` - обновление статуса.

## Проверки

- `npm run check`
- `npm test`
- `npm run build`
- `git diff --check`

## Артефакты

- report: `reports/SU-011-quest-ui-language-overhaul.md`
- PR: обычный Open PR, не Draft
- base spec: `docs/BETA_TRANSITION.md`
