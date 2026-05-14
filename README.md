# Путь Шута

Статический mobile-first браузерный квест про путь Шута через старшие арканы Таро.
Игра строится как экранный текстовый квест: `home → scene → result → next scene → completion`.

## Состояние проекта

- текущий шаг beta-цепочки: `SU-011`
- текущий ориентир beta-перехода: [docs/BETA_TRANSITION.md](docs/BETA_TRANSITION.md)
- главный игровой поток уже работает на сценах, результатах и завершении пути
- прогресс хранится локально через `localStorage`
- отдельный экран `Дневник Шута` использует уже существующий inventory state
- проект остаётся статическим, без backend, авторизации, внешних API и серверного хранения

## Что уже есть

- Vite + TypeScript + Vitest
- мобильный главный экран
- диалоговый путь старших арканов
- слой карт-инвентаря и статусы `Получено`, `Применено`, `Помощник`
- отдельные экраны `scene`, `result`, `journal` и `completion`
- GitHub Actions CI и GitHub Pages

## Команды

- `npm install`
- `npm run dev`
- `npm run check`
- `npm test`
- `npm run build`
- `npm run preview`

## Структура

- `src/data` - карты, главы, сцены и события.
- `src/domain` - состояние игрока, прогресс, storage и helpers.
- `src/app.ts` - render и обработка действий.
- `src/style.css` - mobile-first визуальная оболочка.
- `docs` - проектная документация.
- `tasks/SU` - карточки крупных задач.
- `reports` - отчёты Codex по PR.
- `.github/workflows` - CI и Pages.

## Процесс работы

1. Задача оформляется в GitHub Issue.
2. Для крупной задачи создаётся файл в `tasks/SU/`.
3. Работа идёт в отдельной feature-ветке от актуального `main`.
4. Codex открывает обычный Open PR, не Draft.
5. После проверки пользователь смотрит визуальные изменения вручную.
6. Отчёт по PR кладётся в `reports/`.
7. Если нужен merge, он делается только по отдельному решению после проверки.

## Публикация

GitHub Pages:

`https://kostgame.github.io/fool-journey/`

## Кратко о beta-цепочке

- `SU-011` - язык сцен и результатов под mobile text quest.
- `SU-012` - миниатюры карт.
- `SU-013` - проверка кодировки и качества текстов.
- `SU-014` - финальный mobile smoke pass и beta readiness.
