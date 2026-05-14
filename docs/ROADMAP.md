# ROADMAP

## Правило PR

Если задача готова к проверке, Codex открывает обычный Open PR.
Draft PR в этой цепочке не используется.

## Завершённые этапы

- PR-000 - bootstrap проекта, CI, Pages и стартовый UI.
- SU-001 - первый играбельный эпизод `Шут → Маг → Жрица`.
- SU-002 - полный путь 22 старших арканов.
- SU-003 - слой minor events и данные 56 младших арканов.
- SU-004 - polish playable journey UX.
- SU-006 - dialogue-based text quest vertical slice.
- SU-007 - single-screen scene flow.
- SU-008 - расширение dialogue arc и inventory state.
- SU-010 - `Дневник Шута` и card collection.

## Текущий beta-переход

- `SU-011` - quest UI language overhaul.
- `SU-012` - tarot card thumbnails.
- `SU-013` - encoding and content quality audit.
- `SU-014` - beta readiness mobile smoke pass.

Подробные правила перехода описаны в [docs/BETA_TRANSITION.md](docs/BETA_TRANSITION.md).

## Следующий смысловой шаг

- сделать сцены и результаты читаемыми как мобильный текстовый квест;
- сохранить отдельные экраны и не возвращать длинную страницу;
- затем подключить визуальные миниатюры карт;
- после этого проверить кодировку и выполнить финальный beta smoke pass.

## Что не планируется

- backend;
- внешние API;
- авторизация;
- server-side storage;
- большие RPG-системы;
- платёжные функции;
- Draft PR.
