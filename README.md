# Путь Шута

Статический mobile-first браузерный квест по Таро.

## Состояние проекта

- Project status: beta
- Финальный beta-pass: `SU-014`
- Базовый ориентир перехода: [docs/BETA_TRANSITION.md](docs/BETA_TRANSITION.md)
- Beta checklist: [docs/BETA_CHECKLIST.md](docs/BETA_CHECKLIST.md)
- Публичный Pages-адрес: [https://kostgame.github.io/fool-journey/](https://kostgame.github.io/fool-journey/)

## Что уже есть

- Vite + TypeScript + Vitest;
- главный экран `Путь Шута`;
- основной flow `home → scene → result → next scene → completion`;
- `Дневник Шута` со следами пути;
- inventory state с статусами `Получено`, `Применено`, `Помощник`;
- локальные thumbnails карт;
- проверка кодировки `npm run check:encoding`;
- статический хостинг на GitHub Pages;
- отсутствие backend, внешних API и серверного хранения.

## Команды

- `npm install`
- `npm run dev`
- `npm run check`
- `npm run check:encoding`
- `npm test`
- `npm run build`
- `npm run preview`

## Рабочий процесс

1. Задача оформляется через GitHub Issue.
2. Для крупной задачи создаётся отдельный файл в `tasks/SU/`.
3. Работа идёт в отдельной feature-ветке от актуального `main`.
4. Codex открывает обычный Open PR, не Draft.
5. Пользователь вручную проверяет визуальные изменения на Pages.
6. Итоговый отчёт кладётся в `reports/`.

## Ограничения

- без backend;
- без авторизации;
- без внешних API;
- без серверного хранения прогресса;
- без тяжёлой RPG-экономики;
- без Draft PR;
- без слова `шпаргалка` в интерфейсе.
