# Отчёт Codex по SU-008

## 1. Кратко

SU-008 расширил диалоговый путь после стартового vertical slice и добавил минимальную механику «карты как инвентарь Шута». Теперь часть выборов выдаёт карты, а часть следующих выборов требует ранее полученную карту и помечается в UI как `Применено`.

## 2. Ветка и PR

- Ветка: `feature/su-008-expand-dialogue-story`
- PR: [#23](https://github.com/KostGame/fool-journey/pull/23)

## 3. Что реализовано

- Расширен dialogue-блок major scenes до `Иерофант → Влюблённые → Колесница → Сила → Отшельник → Колесо Фортуны → Справедливость`.
- Сохранён flow `home → scene → result → next scene` без возврата к длинной странице.
- Добавлен минимальный слой инвентаря карт:
  - `earnedCards`;
  - `inventoryCards`;
  - `knownCards`;
  - `lastEarnedCardId`, `lastAppliedCardId`, `lastHelperCardId`;
  - `uses` у полученной карты.
- Расширены choice-данные:
  - `earnedCardId`, `earnedRole`;
  - `requiredCardId`;
  - `appliedCardId`.
- Встроены ветки с выдачей и применением карт:
  - выбор может дать карту;
  - часть вариантов в следующих сценах доступна только при наличии карты.
- На UI добавлены короткие статусы:
  - `Получено`;
  - `Применено`;
  - `Помощник`.
- Обновлены storage helpers для мягкой миграции старых сохранений.
- Обновлены тесты домена, рендера и dialogue-данных.
- Исправлено повреждение кодировки в `src/app.ts` (восстановлены нормальные русские UI-строки).

## 4. Что изменено по файлам

- `src/data/dialogueScenes.ts`
- `src/data/dialogueScenes.test.ts`
- `src/domain/models.ts`
- `src/domain/progress.ts`
- `src/domain/progress.test.ts`
- `src/domain/storage.ts`
- `src/domain/storage.test.ts`
- `src/app.ts`
- `src/app.test.ts`
- `src/style.css`
- `README.md`
- `CHANGELOG.md`
- `docs/GAME_DESIGN.md`
- `docs/ARCHITECTURE.md`
- `docs/ROADMAP.md`
- `docs/CHECKS.md`
- `tasks/SU/SU-008-expand-dialogue-story.md`
- `reports/SU-008-expand-dialogue-story.md`

## 5. Проверки

- `npm run check`
- `npm test`
- `npm run build`
- `git diff --check`

Все проверки проходят локально.

## 6. Что не сделано

- Не добавлялись новые режимы.
- Не переписывались все 22 главы в dialogue format.
- Не добавлялись backend, внешние API, авторизация и серверное хранение.
- Не делалась сложная RPG-экономика инвентаря (редкость, баланс, отдельный экран коллекции).

## 7. Риски и ограничения

- Инвентарь пока минимальный и не имеет отдельного полноценного UI-экрана.
- Часть сцен по-прежнему работает через fallback, это сознательное ограничение SU-008.
- Требуется ручной мобильный smoke-test в Pages (360–430 px), чтобы подтвердить UX на реальном устройстве.

## 8. Что проверить вручную

- Пройти путь до `Иерофанта`, выбрать ветку с получением карты и увидеть статус `Получено`.
- Дойти до `Влюблённых` и убедиться, что выбор с требованием карты блокируется без нужной карты и открывается после её получения.
- Проверить в следующих сценах статусы `Применено` и `Помощник`.
- Перезагрузить страницу и убедиться, что инвентарь и прогресс восстановились из `localStorage`.
- Проверить, что flow остаётся `home → scene → result → next scene`.
- Проверить отсутствие горизонтальной прокрутки на мобильной ширине.

## 9. Статус merge

- PR смержен: да

Отдельно:

- PR URL: [https://github.com/KostGame/fool-journey/pull/23](https://github.com/KostGame/fool-journey/pull/23)
- ветка: `feature/su-008-expand-dialogue-story`
- head commit: `00eca6f`
- merge commit: `d02db8a71ba706f97786726900db53a53bd9af0c`
- Pages URL: [https://kostgame.github.io/fool-journey/](https://kostgame.github.io/fool-journey/)
- статус Pages: `built` (последний подтверждённый статус в проектных отчётах и после merge SU-008 URL Pages активен)
- CI: `success` (GitHub Actions CI для PR #23 завершился успешно)
- какие проверки запускались: `npm run check`, `npm test`, `npm run build`, `git diff --check`
- какие major scenes переведены в dialogue format: `Иерофант`, `Влюблённые`, `Колесница`, `Сила`, `Отшельник`, `Колесо Фортуны`, `Справедливость`
- сколько новых court helper appearances добавлено: `7` в расширенном блоке SU-008
- какие младшие арканы использованы как действия: `2 Кубков`, `4 Пентаклей`, `7 Жезлов`, `6 Мечей`, `8 Пентаклей`, `Королева Мечей`
- был ли PR смержен: да
