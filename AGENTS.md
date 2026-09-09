# AGENTS.md

Правила для работы в проекте «Путь Шута».

## Codex-native workspace baseline

- По умолчанию работать в изолированном Codex-managed worktree, если Codex его предоставляет.
- Fresh clone на каждую задачу не требуется. Он используется для provisioning, recovery или явно заданного task-specific flow.
- Перед изменениями доказать repository/origin, scope задачи, base commit если задан, Git worktree membership и то, что текущий каталог является назначенным worktree, а не primary/canonical checkout.
- Detached HEAD допустим для inspect/edit/test/review.
- Перед первым commit создать или переключиться на выделенную task branch. По умолчанию prefix `agent/`, если task/repository policy не задаёт другой.
- Не работать напрямую в `main`, primary/user checkout, control repo, другом task workspace или неоднозначной копии.
- Обычные локальные Git-операции выполняет Codex. Push и PR допустимы, когда это разрешено текущей задачей/repository workflow; direct push в `main` запрещён.
- При sandbox-блокировке точной Git metadata mutation использовать native approval/escalation для этой операции, не расширяя ACL и не запуская Codex elevated.
- Не использовать stash/reset/clean/force push/history rewrite для сокрытия неожиданного состояния.
- PR по умолчанию Ready for Review.
- Merge authority отделена от implementation/publication authority. Не мержить PR автоматически без явного разрешения текущей задачи, repository policy или пользователя.
- Если repository/worktree/base/task identity нельзя доказать, остановиться fail-closed.

## Project rules

- Держать изменения маленькими и понятными.
- Писать отчёты и проектные документы на русском языке.
- Не добавлять backend, серверные функции, авторизацию, базу данных или внешние API.
- Не делать полноценный генератор раскладов и не превращать прототип в викторину.
- Поддерживать mobile-first интерфейс и проверять отсутствие горизонтальной прокрутки.
- Не использовать в интерфейсе слово «шпаргалка».
- Хранить прогресс только в `localStorage`.
- Перед PR запускать `npm run check`, `npm test`, `npm run build` и `git diff --check`.
- Работать в выделенной task branch и открывать обычный Ready-for-Review PR, если задача готова к проверке.
