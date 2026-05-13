# Отчёт Codex по SU-005

## 1. Кратко

SU-005 исправил мобильную проблему блока режимов на главном экране. На ширине 360–430 px карточки режимов теперь идут вертикальным списком, не сжимаются в узкие колонки и не создают горизонтальную прокрутку.

## 2. Ветка и PR

- Ветка: `feature/su-005-mobile-mode-selector-fix`
- PR: [#13](https://github.com/KostGame/fool-journey/pull/13)
- Commit: `a41e8e7`
- Merge commit: `83d1c4c9f3be11b1096807d61dba700ac595da5d`
- Pages URL: [https://kostgame.github.io/fool-journey/](https://kostgame.github.io/fool-journey/)
- Статус Pages: `built`

## 3. Что реализовано

- Блок `Выберите маршрут` на мобильной ширине стал вертикальным списком.
- Карточки режимов растягиваются на всю ширину контейнера.
- Длинные названия и описания переносятся нормально.
- Добавлен ручной mobile smoke-test в `docs/CHECKS.md`.

## 4. Что изменено по файлам

- `src/style.css`
- `docs/CHECKS.md`
- `CHANGELOG.md`
- `tasks/SU/SU-005-mobile-mode-selector-fix.md`
- `reports/SU-005-mobile-mode-selector-fix.md`

## 5. Проверки

- `npm run check`
- `npm test`
- `npm run build`
- `git diff --check`
- GitHub Actions CI on PR #13: `pass`

## 6. Что не сделано

- Не менялись карты, режимы и сюжетная механика.
- Не добавлялись новые игровые сущности.

## 7. Риски и ограничения

- Hotfix затрагивает только раскладку на мобильной ширине.
- После merge всё ещё нужен короткий ручной smoke-test на телефоне.

## 8. Что проверить вручную

- Открыть Pages на ширине 360–430 px.
- Убедиться, что блок режимов не имеет горизонтальной прокрутки.
- Проверить, что карточки не налезают друг на друга.
- Проверить, что `Продолжить путь` и `Сбросить и начать заново` работают как раньше.

## 9. Статус merge

- PR: [#13](https://github.com/KostGame/fool-journey/pull/13)
- Смёржен ли PR: да
- Merge commit: `83d1c4c9f3be11b1096807d61dba700ac595da5d`
- Pages URL: [https://kostgame.github.io/fool-journey/](https://kostgame.github.io/fool-journey/)
- Статус Pages: `built`
