# Путь Шута

Статический mobile-first браузерный квест про путь Шута через старшие арканы Таро.

## Состояние проекта

- текущий beta-шаг: `SU-013`;
- базовый ориентир beta-перехода: [docs/BETA_TRANSITION.md](docs/BETA_TRANSITION.md);
- главный поток уже работает как экранная история `home → scene → result → next scene → completion`;
- прогресс хранится локально в `localStorage`;
- отдельный экран `Дневник Шута` использует существующий inventory state;
- локальные миниатюры карт подключены через `public/assets/cards/`.

## Что уже есть

- Vite + TypeScript + Vitest;
- главный экран с CTA `Продолжить историю`;
- диалоговый путь старших арканов;
- слой карточек-инвентаря и дневник;
- GitHub Actions CI и GitHub Pages.

## Команды

- `npm install`
- `npm run dev`
- `npm run check`
- `npm run check:encoding`
- `npm test`
- `npm run build`
- `npm run preview`

## Структура

- `src/data` - карты, сцены, события и mapping изображений;
- `src/domain` - state, progress, storage и journal helpers;
- `src/app.ts` - сборка экранов и обработка действий;
- `src/style.css` - mobile-first визуальная оболочка;
- `public/assets/cards` - локальные миниатюры карт;
- `docs` - проектная документация;
- `tasks/SU` - карточки крупных задач;
- `reports` - отчёты Codex по PR.

## Рабочий процесс

1. Задача оформляется в GitHub Issue.
2. Для крупной задачи создаётся файл в `tasks/SU/`.
3. Работа идёт в отдельной feature-ветке от актуального `main`.
4. Codex открывает обычный Open PR, не Draft.
5. После визуальной проверки пользователь решает, можно ли мержить.
6. Итоговый отчёт кладётся в `reports/`.

## Публикация

GitHub Pages: [https://kostgame.github.io/fool-journey/](https://kostgame.github.io/fool-journey/)

## Ближайший фокус

- `SU-012` - локальные миниатюры карт Таро;
- `SU-013` - аудит кодировки и качества текста;
- `SU-014` - финальный beta smoke pass.
