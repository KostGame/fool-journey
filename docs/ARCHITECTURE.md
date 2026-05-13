# ARCHITECTURE

## Слои

- `src/data` хранит карты, главы, полный major path, 56 младших карт и curated minor events.
- `src/domain` собирает модель состояния, трактовки, прогресс и `localStorage`.
- `src/app.ts` рендерит экран и переключает игрока между major и minor шагами.
- `src/style.css` отвечает за мобильную оболочку.
- `src/main.ts` монтирует приложение в DOM.

## Доменная модель

- `PlayerState` хранит XP, текущую главу, текущий шаг, результат выбора и прогресс по minor events.
- `TarotCard` описывает базовую карту, а для младших арканов добавляет `suit`, `rank`, `elementMeaning` и `rankMeaning`.
- `StoryChapter` задаёт большую главу пути.
- `StoryEncounter` описывает сцену старшего аркана.
- `MinorArcanaEvent` описывает короткое дорожное событие младшего аркана.
- `JourneyStepId` и `JourneyStepKind` помогают работать с major и minor шагами единообразно.

## Принцип сборки смысла

Трактовка строится композиционно:

- базовая карта;
- позиция или контекст сцены;
- ориентация;
- точечные overrides.

Это позволяет сохранять один общий слой интерпретации для majors и minors.

## Совместимость сохранений

- Ключ `localStorage` сохранён прежним, чтобы не терять старые данные SU-002.
- `normalizePlayerState` умеет поднимать старые сохранения до новой структуры.
- Если в сохранении нет minor-данных, игра продолжает работать как major-only путь и мягко достраивает новую модель.

## Текущая структура данных

- `src/data/cards.ts`
- `src/data/storyChapters.ts`
- `src/data/encounters.ts`
- `src/data/minorArcana.ts`
- `src/data/minorArcanaEvents.ts`
- `src/data/journeySteps.ts`
- `src/domain/meaning.ts`
- `src/domain/progress.ts`
- `src/domain/storage.ts`
- `src/app.ts`
- `src/main.ts`
- `src/style.css`

## Ограничения

- Без backend.
- Без внешних API.
- Без авторизации.
- Без серверного хранения.
- Без тяжёлых зависимостей.


## SU-004

- `ProgressSnapshot` дополнен полями route progress и remaining steps, чтобы home, result screens и completion не дублировали логику подсчёта.
- `route-panel` на home screen показывает ближайшую точку пути и различает major/minor/finish шаги без новых режимов.
- Completion screen использует отдельный `restart` action для повторного прохождения, а reset остаётся явным действием с подтверждением.
- Manual smoke-test Pages строится вокруг mobile-first маршрута: открыть, пройти, завершить, перезапустить, сбросить и проверить сохранение.
