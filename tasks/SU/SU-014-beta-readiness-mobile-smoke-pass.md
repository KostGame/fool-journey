# SU-014: Beta readiness mobile smoke pass

## Контекст

По Issue #40 и BETA-000 нужен финальный beta-smoke перед закреплением `Project status: beta`. Уже есть:

- отдельный экран `Дневник Шута`;
- inventory statuses `Получено`, `Применено`, `Помощник`;
- локальные thumbnails карт;
- encoding audit и проверки текста;
- mobile-first flow `home → scene → result → next scene → completion`.

## Цель

- провести финальную проверку beta-готовности мобильной версии `Путь Шута`;
- подтвердить, что Pages открывается и основной flow читается на телефоне;
- проверить `Дневник Шута`, inventory, thumbnails и fallback;
- убедиться, что кодировка и русские строки отображаются корректно;
- если всё зелёное, зафиксировать `Project status: beta` в документации.

## Не делаем

- не добавляем новые режимы;
- не меняем сюжетную архитектуру;
- не добавляем backend, авторизацию, внешние API или серверное хранение;
- не делаем большую RPG-экономику;
- не мержим PR до ручной проверки пользователя;
- не ставим beta status, если найден крупный blocker.

## Состав работ

- `docs/BETA_CHECKLIST.md`;
- `docs/CHECKS.md`;
- `docs/ROADMAP.md`;
- `docs/BETA_TRANSITION.md`, если нужна финальная синхронизация формулировок;
- `README.md`;
- `CHANGELOG.md`;
- `reports/SU-014-beta-readiness-mobile-smoke-pass.md`.

## Проверки

- `npm run check`
- `npm run check:encoding`
- `npm test`
- `npm run build`
- `git diff --check`

## Риски

- если на mobile viewport появится горизонтальная прокрутка, beta-ready откладывается;
- если найдётся битая кодировка, `U+FFFD` или явный mojibake, нужен follow-up fix;
- если completion/journal/thumbnails сломаются, beta status ставить нельзя.
