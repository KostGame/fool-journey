import { getCard } from "./data/cards";
import { getCardImageAsset } from "./data/cardImages";
import { encounters, getEncounter } from "./data/encounters";
import { getDialogueSceneByEncounterId, getDialogueSceneByMinorEventId } from "./data/dialogueScenes";
import { getMinorEventAfterChapter, minorArcanaEvents } from "./data/minorArcanaEvents";
import { getJourneyStepById } from "./data/journeySteps";
import { storyChapters, getStoryChapter } from "./data/storyChapters";
import { composeEncounterInterpretation } from "./domain/meaning";
import { buildJournalSnapshot } from "./domain/journal";
import {
  advanceJourney,
  buildProgressSnapshot,
  getCurrentMinorEvent,
  getHomeActionLabel,
  getCurrentChapterCard,
  getLastChoiceCard,
  getJourneyAdvanceActionLabel,
  recordEncounterChoice,
  recordMinorEventChoice,
  resetPlayerState,
} from "./domain/progress";
import { loadPlayerState, resetStoredPlayerState, savePlayerState } from "./domain/storage";
import type {
  AppViewState,
  ChoiceInventoryEffect,
  DialogueChoice,
  DialogueLine,
  DialogueScene,
  EncounterChoice,
  PlayerState,
  ProgressSnapshot,
  ScreenId,
  StorageLike
} from "./domain/models";

const modeCatalog = [
  {
    id: "scene",
    title: "Путь Шута",
    description: "Диалоговый квест, где арканы говорят, а выборы ведут историю."
  },
  {
    id: "live-spread",
    title: "Живой расклад",
    description: "Пока только каркас будущего режима."
  },
  {
    id: "card-of-day",
    title: "Карта дня",
    description: "Пока только каркас будущего режима."
  },
  {
    id: "dialogues",
    title: "Аркана-диалоги",
    description: "Пока только каркас будущего режима."
  },
  {
    id: "assembly",
    title: "Собери трактовку",
    description: "Пока только каркас будущего режима."
  },
  {
    id: "reference",
    title: "Справочник",
    description: "Пока только каркас будущего режима."
  }
] as const;

export interface GameApp {
  destroy(): void;
}

export function mountGameApp(root: HTMLElement, storage: StorageLike = window.localStorage): GameApp {
  let screen: ScreenId = "home";
  let player = loadPlayerState(storage);
  let destroyed = false;

  const rerender = () => {
    if (destroyed) {
      return;
    }

    root.innerHTML = renderAppShell({ screen, player });
    updateDocumentTitle(screen, player);
  };

  const onClick = (event: MouseEvent) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const actionButton = target.closest<HTMLElement>("[data-action]");

    if (!actionButton) {
      return;
    }

    const action = actionButton.dataset.action;

    if (action === "screen") {
      const nextScreen = actionButton.dataset.screen;

      if (isScreenId(nextScreen)) {
        screen = nextScreen;
        rerender();
      }

      return;
    }

    if (action === "choice") {
      const choiceId = actionButton.dataset.choiceId;
      const minorEvent = getCurrentMinorEvent(player);
      const dialogueScene = getActiveDialogueScene(player);
      const dialogueChoice = dialogueScene?.choices.find((item) => item.id === choiceId);

      if (dialogueChoice && !isDialogueChoiceAvailable(player, dialogueChoice)) {
        return;
      }

      const inventoryEffect = toChoiceInventoryEffect(dialogueChoice);

      if (player.currentStepKind === "minor") {
        const choice = minorEvent?.choices.find((item) => item.id === choiceId);

        if (!minorEvent || !choice) {
          return;
        }

        const card = getCard(choice.cardId);

        if (!card) {
          return;
        }

        const interpretation = composeEncounterInterpretation(card, minorEvent, choice);
        player = recordMinorEventChoice(player, minorEvent.id, choice, interpretation.summary, inventoryEffect);
      } else {
        const encounter = getEncounter(player.currentEncounterId);
        const choice = encounter?.choices.find((item) => item.id === choiceId);

        if (!encounter || !choice) {
          return;
        }

        const card = getCard(choice.cardId);

        if (!card) {
          return;
        }

        const interpretation = composeEncounterInterpretation(card, encounter, choice);
        player = recordEncounterChoice(player, encounter.id, choice, interpretation.summary, inventoryEffect);
      }

      savePlayerState(storage, player);
      screen = "result";
      rerender();
      return;
    }

    if (action === "advance") {
      player = advanceJourney(player);
      savePlayerState(storage, player);
      screen = player.journeyPhase === "complete" ? "result" : "scene";
      rerender();
      return;
    }

    if (action === "restart") {
      player = resetPlayerState();
      savePlayerState(storage, player);
      screen = "scene";
      rerender();
      return;
    }

    if (action === "reset") {
      if (!window.confirm("Сбросить прогресс и начать путь заново?")) {
        return;
      }

      player = resetPlayerState();
      resetStoredPlayerState(storage);
      screen = "home";
      rerender();
    }
  };

  root.addEventListener("click", onClick);
  rerender();

  return {
    destroy() {
      destroyed = true;
      root.removeEventListener("click", onClick);
    }
  };
}

export function renderAppShell(view: AppViewState): string {
  if (view.screen === "home") {
    return renderHomeShell(view.player);
  }

  if (view.screen === "journal") {
    return renderJournalScreen(view.player);
  }

  if (view.screen === "scene" || view.screen === "result" || view.screen === "journey") {
    return renderFlowScreen(view.player, view.screen);
  }

  return renderPlaceholderScreen(view.screen);
}

function renderHomeShell(player: PlayerState): string {
  const progress = buildProgressSnapshot(player);
  const chapter = getStoryChapter(player.currentChapterId) ?? storyChapters[0];
  const chapterCard = getCurrentChapterCard(player);
  const lastChoiceCard = getLastChoiceCard(player);
  const activeMinorEvent = getCurrentMinorEvent(player);
  const homeActionLabel = getHomeActionLabel(player);
  const progressNote = activeMinorEvent
    ? `${activeMinorEvent.situation} После ответа история продолжится.`
    : lastChoiceCard
      ? lastChoiceCard.dailyMeaning
      : chapter.prompt;
  const homeJourneyScreenId = getHomeJourneyScreenId(player);

  return `
    <main class="app-shell home-shell">
      <div class="ambient ambient-a" aria-hidden="true"></div>
      <div class="ambient ambient-b" aria-hidden="true"></div>

      <header class="hero panel">
        <div class="hero-copy">
          <p class="eyebrow">Ранний прототип</p>
          <h1>Путь Шута</h1>
          <p class="lead">
            Лёгкий сюжетный квест про путь старших арканов от Шута к Миру. Между большими главами появляются короткие дорожные события младших арканов: бытовые сцены, ресурсы, препятствия и маленькие проверки.
          </p>
        </div>

        <div class="hero-tag">
          <span>Mobile-first</span>
          <strong>LocalStorage</strong>
          <small>Без backend и внешних API</small>
        </div>
      </header>

      <section class="panel progress-panel" aria-labelledby="progress-title">
        <div class="section-head">
          <p class="eyebrow">Текущий прогресс</p>
          <h2 id="progress-title">Уровень ${progress.level}</h2>
          <p>${escapeHtml(progress.statusLabel)}</p>
        </div>

        <div class="meter" aria-hidden="true">
          <div class="meter-fill" style="width: ${Math.min(100, (progress.xpIntoLevel / 2) * 100)}%"></div>
        </div>

        <dl class="progress-stats">
          <div>
            <dt>Глава пути</dt>
            <dd>${escapeHtml(progress.chapterTitle)}</dd>
          </div>
          <div>
            <dt>Карта главы</dt>
            <dd>${escapeHtml(chapterCard?.name ?? "Пока нет")}</dd>
          </div>
          <div>
            <dt>Тип шага</dt>
            <dd>${escapeHtml(progress.stepKindLabel)}</dd>
          </div>
          <div>
            <dt>Активный шаг</dt>
            <dd>${escapeHtml(progress.encounterTitle)}</dd>
          </div>
          <div>
            <dt>Эпизод</dt>
            <dd>${escapeHtml(progress.episodeProgressLabel)}</dd>
          </div>
          <div>
            <dt>Дорожные события</dt>
            <dd>${escapeHtml(progress.minorEventProgressLabel)}</dd>
          </div>
          <div>
            <dt>Маршрут</dt>
            <dd>${escapeHtml(progress.routeProgressLabel)}</dd>
          </div>
          <div>
            <dt>Осталось</dt>
            <dd>${escapeHtml(progress.remainingJourneyStepsLabel)} шагов</dd>
          </div>
          <div>
            <dt>Опыт</dt>
            <dd>${progress.xp} XP</dd>
          </div>
          <div>
            <dt>Сохранено</dt>
            <dd>${escapeHtml(progress.lastSavedLabel)}</dd>
          </div>
        </dl>

        <p class="progress-note">${escapeHtml(progressNote)}</p>
      </section>

      <section class="panel home-panel" aria-labelledby="home-title">
        <div class="section-head">
          <p class="eyebrow">Главный экран</p>
          <h2 id="home-title">Продолжить путь Шута</h2>
          <p>
            Здесь видна большая глава пути. Если появляется дорожное событие младших арканов, оно показывается отдельной короткой встречей между главами, а не новой большой сценой.
          </p>
        </div>

        <div class="home-actions">
          <button
            class="primary-button"
            type="button"
            data-action="${player.journeyPhase === "complete" ? "restart" : "screen"}"
            data-screen="${homeJourneyScreenId}"
          >
            ${escapeHtml(homeActionLabel)}
          </button>
          <button class="ghost-button" type="button" data-action="screen" data-screen="journal">Дневник Шута</button>
          <button class="ghost-button" type="button" data-action="reset">Сбросить и начать заново</button>
        </div>

        <p class="prototype-note">
          Это ранний прототип. Уже доступны 22 старших аркана и первый слой дорожных событий на основе всех 56 младших карт. Следующие SU будут расширять этот слой.
        </p>
      </section>

      <section class="panel mode-panel" aria-labelledby="modes-title">
        <div class="section-head">
          <p class="eyebrow">Режимы</p>
          <h2 id="modes-title">Выберите маршрут</h2>
        </div>

        <div class="mode-grid">
          ${modeCatalog
            .map((mode) => renderModeButton(mode.id, mode.title, mode.description, false))
            .join("")}
        </div>
      </section>

      <footer class="footer-note">
        <p>Путь Шута — статический прототип на Vite + TypeScript. Прогресс хранится локально в браузере.</p>
      </footer>
    </main>
  `;
}

function renderFlowScreen(player: PlayerState, screen: ScreenId): string {
  const stage = renderJourneyScreen(player);

  return `
    <main class="app-shell flow-shell flow-shell-${escapeAttribute(screen)}">
      <div class="ambient ambient-a" aria-hidden="true"></div>
      <div class="ambient ambient-b" aria-hidden="true"></div>
      ${stage}
    </main>
  `;
}

function renderScreen(view: AppViewState): string {
  if (view.screen === "journal") {
    return renderJournalScreen(view.player);
  }

  if (view.screen === "scene" || view.screen === "result" || view.screen === "journey") {
    return renderJourneyScreen(view.player);
  }

  return renderPlaceholderScreen(view.screen);
}

function getHomeJourneyScreenId(player: PlayerState): ScreenId {
  return player.journeyPhase === "resolved" ? "result" : "scene";
}

function getActiveDialogueScene(player: PlayerState): DialogueScene | undefined {
  if (player.currentStepKind === "minor") {
    const minorEvent = getCurrentMinorEvent(player);
    return minorEvent ? getDialogueSceneByMinorEventId(minorEvent.id) : undefined;
  }

  return getDialogueSceneByEncounterId(player.currentEncounterId);
}

function isDialogueChoiceAvailable(player: PlayerState, choice: DialogueChoice): boolean {
  if (!choice.requiredCardId) {
    return true;
  }

  return player.inventoryCards.includes(choice.requiredCardId);
}

function toChoiceInventoryEffect(choice: DialogueChoice | undefined): ChoiceInventoryEffect | undefined {
  if (!choice) {
    return undefined;
  }

  if (!choice.earnedCardId && !choice.appliedCardId && !choice.helperCardId) {
    return undefined;
  }

  return {
    earnedCardId: choice.earnedCardId,
    earnedRole: choice.earnedRole,
    appliedCardId: choice.appliedCardId,
    helperCardId: choice.helperCardId
  };
}

function renderDialogueSceneScreen(
  player: PlayerState,
  chapter: ReturnType<typeof getStoryChapter>,
  stepTitle: string,
  scene: DialogueScene,
  questionText: string,
): string {
  if (!chapter) {
    return renderCorruptedState();
  }

  const card = getCard(scene.majorCardId ?? scene.minorCardId ?? chapter.cardId);
  const helperCard = scene.helperCardId ? getCard(scene.helperCardId) : undefined;
  const progress = buildProgressSnapshot(player);

  if (!card) {
    return renderCorruptedState();
  }

  const cardArtStrip = renderCardArtStrip([
    {
      cardId: card.id,
      label: card.name,
      className: "scene-card-thumb quest-card-hero",
      loading: "eager"
    },
    ...(helperCard
      ? [
          {
            cardId: helperCard.id,
            label: helperCard.name,
            className: "scene-helper-thumb quest-card-assist",
            loading: "eager" as const
          }
        ]
      : [])
  ]);

  return `
    <section class="panel journey-panel dialogue-panel quest-layout">
      <header class="quest-header">
        <div class="quest-location-bar">
          <p class="eyebrow">${escapeHtml(scene.type === "major-scene" ? "Глава пути" : "Дорожное событие")}</p>
          <h2>${escapeHtml(scene.locationTitle)}</h2>
          <p class="quest-location-subtitle">${escapeHtml(chapter.title)} · ${escapeHtml(stepTitle)}</p>
        </div>
        ${renderJourneyStatusLine(progress, chapter.title)}
      </header>

      <div class="quest-body">
        <aside class="quest-visual-panel" aria-label="Карта и опора сцены">
          <p class="card-kicker">Визуальная зона</p>
          ${cardArtStrip}
          <p class="quest-visual-caption">${escapeHtml(scene.locationText)}</p>
          ${
            scene.helperCardId
              ? renderDialogueHelperCallout(scene)
              : ""
          }
        </aside>

        <div class="quest-text-panel">
          <article class="dialogue-card quest-card card-${card.id}">
            <div class="scene-title-block">
              <p class="card-kicker">${escapeHtml(scene.speakerRole)}</p>
              <h3>${escapeHtml(questionText || scene.nextStepLabel)}</h3>
              <p class="scene-speaker">${escapeHtml(scene.speakerName)}</p>
            </div>

            <p class="scene-location">${escapeHtml(scene.locationText)}</p>
            <p class="dialogue-narrator">${escapeHtml(scene.narratorText)}</p>

            <div class="dialogue-log">
              ${scene.dialogueLines.map((line) => renderDialogueLine(line)).join("")}
            </div>

            <p class="dialogue-thought">Мысль Шута: ${escapeHtml(scene.foolThought)}</p>
            <p class="dialogue-next-step">${escapeHtml(scene.nextStepLabel)}</p>
            ${
              player.inventoryCards.length > 0
                ? `<p class="inventory-note">Карты Шута: ${escapeHtml(player.inventoryCards.map((cardId) => getCard(cardId)?.name ?? cardId).join(" · "))}</p>`
                : ""
            }
          </article>

          <section class="quest-actions-panel" aria-labelledby="quest-actions-title">
            <div class="section-head">
              <p class="eyebrow">Действия</p>
              <h3 id="quest-actions-title">${escapeHtml(questionText || "Что сделает Шут?")}</h3>
            </div>
            <div class="choice-grid">
              ${scene.choices.map((choice) => renderDialogueChoiceButton(player, choice)).join("")}
            </div>
          </section>
        </div>
      </div>

      <footer class="quest-footer">
        <div class="quest-inventory-panel">
          <div class="quest-inventory-copy">
            <p class="eyebrow">Инвентарь и дневник</p>
            <p>Карты помогают помнить, что уже получено, применено и кто помог Шуту на пути.</p>
          </div>
          <div class="quest-inventory-meta">
            <div class="scene-status-item">
              <span>Карты</span>
              <strong>${escapeHtml(player.inventoryCards.length > 0 ? player.inventoryCards.map((cardId) => getCard(cardId)?.name ?? cardId).slice(-4).join(" · ") : "Пока нет")}</strong>
            </div>
            <div class="quest-inventory-links">
              <button class="ghost-button" type="button" data-action="screen" data-screen="journal">Дневник Шута</button>
              <button class="ghost-button" type="button" data-action="screen" data-screen="home">К главному экрану</button>
            </div>
          </div>
        </div>
      </footer>
    </section>
  `;
}

function renderDialogueResultScreen(
  player: PlayerState,
  chapter: ReturnType<typeof getStoryChapter>,
  stepTitle: string,
  scene: DialogueScene,
): string {
  if (!chapter) {
    return renderCorruptedState();
  }

  const choice = scene.choices.find((item) => item.id === player.lastChoiceId);
  const card = getCard(scene.majorCardId ?? scene.minorCardId ?? chapter.cardId);
  const helperCard = scene.helperCardId ? getCard(scene.helperCardId) : undefined;
  const progress = buildProgressSnapshot(player);

  if (!choice || !card) {
    return renderCorruptedState();
  }

  const cardArtStrip = renderCardArtStrip([
    {
      cardId: card.id,
      label: card.name,
      className: "result-card-thumb quest-card-hero",
      loading: "eager"
    },
    ...(helperCard
      ? [
          {
            cardId: helperCard.id,
            label: helperCard.name,
            className: "result-helper-thumb quest-card-assist",
            loading: "eager" as const
          }
        ]
      : [])
  ]);

  return `
    <section class="panel journey-panel dialogue-panel quest-layout">
      <header class="quest-header">
        <div class="quest-location-bar">
          <p class="eyebrow">${escapeHtml(scene.type === "major-scene" ? "Глава пути" : "Дорожное событие")}</p>
          <h2>${escapeHtml(scene.locationTitle)}</h2>
          <p class="quest-location-subtitle">${escapeHtml(chapter.title)} · ${escapeHtml(stepTitle)}</p>
        </div>
        ${renderJourneyStatusLine(progress, chapter.title)}
      </header>

      <div class="quest-body">
        <aside class="quest-visual-panel" aria-label="Результат и опора сцены">
          <p class="card-kicker">Результат действия</p>
          ${cardArtStrip}
          <p class="quest-visual-caption">${escapeHtml(choice.label)}</p>
          ${renderChoiceOutcomeBadges(player)}
          ${
            scene.helperCardId
              ? renderDialogueHelperCallout(scene)
              : ""
          }
        </aside>

        <div class="quest-text-panel">
          <article class="result-card dialogue-result quest-card card-${card.id}">
            <p class="card-kicker">Ответ собран</p>
            <h3>${escapeHtml(scene.resultText)}</h3>
            <p class="result-choice">${escapeHtml(choice.label)}</p>
            <p class="card-summary">${escapeHtml(choice.feedback)}</p>
            <p class="dialogue-reaction">${escapeHtml(choice.lesson)}</p>

            <div class="chips">
              <span>${escapeHtml(stepTitle)}</span>
              <span>${escapeHtml(progress.stepKindLabel)}</span>
              <span>${escapeHtml(scene.nextStepLabel)}</span>
            </div>

            <dl class="reading-grid">
              <div>
                <dt>Выбор</dt>
                <dd>${escapeHtml(choice.label)}</dd>
              </div>
              <div>
                <dt>Итог</dt>
                <dd>${escapeHtml(scene.resultText)}</dd>
              </div>
              <div>
                <dt>Совет</dt>
                <dd>${escapeHtml(choice.adviceOverride)}</dd>
              </div>
              <div>
                <dt>Дальше</dt>
                <dd>${escapeHtml(scene.nextStepLabel)}</dd>
              </div>
            </dl>
          </article>

          <section class="quest-actions-panel" aria-labelledby="result-actions-title">
            <div class="section-head">
              <p class="eyebrow">Что дальше</p>
              <h3 id="result-actions-title">${escapeHtml(getJourneyAdvanceActionLabel(player))}</h3>
            </div>
            <div class="journey-actions quest-result-actions">
              <button class="primary-button" type="button" data-action="advance">
                ${escapeHtml(getJourneyAdvanceActionLabel(player))}
              </button>
            </div>
          </section>
        </div>
      </div>
    </section>
  `;
}

function renderCardArtStrip(
  items: readonly { cardId: string; label: string; className?: string; loading?: "lazy" | "eager" }[],
): string {
  if (items.length === 0) {
    return "";
  }

  return `
    <div class="card-art-strip">
      ${items
        .map((item) => renderCardThumbnail(item.cardId, item.label, item.className, item.loading))
        .join("")}
    </div>
  `;
}

function renderCardThumbnail(
  cardId: string,
  label: string,
  className = "",
  loading: "lazy" | "eager" = "lazy",
): string {
  const image = getCardImageAsset(cardId);
  const classes = ["card-thumbnail", className].filter(Boolean).join(" ");
  const fallbackLabel = `${label} · изображение недоступно`;

  if (image.available && image.src) {
    return `
      <figure class="${escapeAttribute(classes)}" aria-label="${escapeAttribute(image.alt)}">
        <img
          src="${escapeAttribute(image.src)}"
          alt="${escapeAttribute(image.alt)}"
          loading="${escapeAttribute(loading)}"
          decoding="async"
        />
      </figure>
    `;
  }

  return `
    <div class="${escapeAttribute(classes)} card-thumbnail-fallback" role="img" aria-label="${escapeAttribute(fallbackLabel)}">
      <span>Миниатюра</span>
      <strong>${escapeHtml(label)}</strong>
    </div>
  `;
}

function renderDialogueHelperCallout(scene: DialogueScene): string {
  if (!scene.helperCardId) {
    return "";
  }

  const helperCard = getCard(scene.helperCardId);

  if (!helperCard) {
    return "";
  }

  return `
    <aside class="helper-callout card-${helperCard.id}">
      <p class="card-kicker">Помощник</p>
      ${renderCardThumbnail(helperCard.id, helperCard.name, "helper-callout-thumb", "lazy")}
      <h4>${escapeHtml(helperCard.name)}</h4>
      <p>${escapeHtml(scene.helperText ?? "Помощник помогает прочитать ситуацию мягче и точнее.")}</p>
    </aside>
  `;
}

function renderDialogueLine(line: DialogueLine): string {
  const label =
    line.speaker === "narrator"
      ? "Рассказчик"
      : line.speaker === "fool"
        ? "Шут"
        : line.speaker === "helper"
          ? `Помощник · ${line.name ?? "спутник"}`
          : `Аркан · ${line.name ?? "голос"}`;

  return `
    <div class="dialogue-line dialogue-line-${line.speaker}">
      <span class="dialogue-speaker">${escapeHtml(label)}</span>
      <p>${escapeHtml(line.text)}</p>
    </div>
  `;
}

function renderDialogueChoiceButton(player: PlayerState, choice: DialogueChoice): string {
  const card = getCard(choice.cardId);
  const isAvailable = isDialogueChoiceAvailable(player, choice);
  const requiredCard = choice.requiredCardId ? getCard(choice.requiredCardId) : undefined;

  if (!card) {
    return "";
  }

  return `
    <button
      class="choice-card dialogue-choice card-${card.id} ${isAvailable ? "" : "is-locked"}"
      type="button"
      data-action="choice"
      data-choice-id="${escapeAttribute(choice.id)}"
      ${isAvailable ? "" : "disabled"}
    >
      <span class="choice-label">${escapeHtml(choice.label)}</span>
      <span class="choice-note">${escapeHtml(choice.buttonNote)}</span>
      <span class="choice-tone">${escapeHtml(getDialogueToneLabel(choice.tone))}</span>
      ${!isAvailable && requiredCard ? `<span class="choice-lock-note">Нужна карта: ${escapeHtml(requiredCard.name)}</span>` : ""}
    </button>
  `;
}

function renderChoiceOutcomeBadges(player: PlayerState): string {
  const badges: string[] = [];

  if (player.lastEarnedCardId) {
    const card = getCard(player.lastEarnedCardId);
    badges.push(`<span>Получено: ${escapeHtml(card?.name ?? player.lastEarnedCardId)}</span>`);
  }

  if (player.lastAppliedCardId) {
    const card = getCard(player.lastAppliedCardId);
    badges.push(`<span>Применено: ${escapeHtml(card?.name ?? player.lastAppliedCardId)}</span>`);
  }

  if (player.lastHelperCardId) {
    const card = getCard(player.lastHelperCardId);
    badges.push(`<span>Помощник: ${escapeHtml(card?.name ?? player.lastHelperCardId)}</span>`);
  }

  if (badges.length === 0) {
    return "";
  }

  return `<div class="chips chips-status">${badges.join("")}</div>`;
}

function getDialogueToneLabel(tone?: DialogueChoice["tone"]): string {
  switch (tone) {
    case "feeling":
      return "Отклик";
    case "thought":
      return "Размышление";
    case "resource":
      return "Опора";
    case "action":
    default:
      return "Действие";
  }
}

function renderJourneyStatusLine(progress: ProgressSnapshot, chapterTitle: string): string {
  return `
    <div class="scene-status" aria-label="Текущий статус пути">
      <div class="scene-status-item">
        <span>Глава</span>
        <strong>${escapeHtml(chapterTitle)}</strong>
      </div>
      <div class="scene-status-item">
        <span>Шаг</span>
        <strong>${escapeHtml(progress.stepKindLabel)}</strong>
      </div>
      <div class="scene-status-item">
        <span>Прогресс</span>
        <strong>${escapeHtml(progress.routeProgressLabel)}</strong>
      </div>
    </div>
  `;
}

function renderJourneyScreen(player: PlayerState): string {
  if (player.journeyPhase === "complete") {
    return renderJourneyCompletionScreen(player);
  }

  const chapter = getStoryChapter(player.currentChapterId) ?? storyChapters[0];
  const encounter = getEncounter(player.currentEncounterId) ?? encounters[0];
  const minorEvent = getCurrentMinorEvent(player);
  const dialogueScene =
    player.currentStepKind === "minor"
      ? minorEvent
        ? getDialogueSceneByMinorEventId(minorEvent.id)
        : undefined
      : encounter
        ? getDialogueSceneByEncounterId(encounter.id)
        : undefined;

  if (player.currentStepKind === "minor") {
    if (!minorEvent) {
      return renderCorruptedState();
    }

    if (dialogueScene) {
      if (player.journeyPhase === "resolved" && player.lastChoiceId && player.lastChoiceCardId && player.lastFeedback) {
        return renderDialogueResultScreen(player, chapter, minorEvent.title, dialogueScene);
      }

      return renderDialogueSceneScreen(player, chapter, minorEvent.title, dialogueScene, minorEvent.question);
    }

    if (player.journeyPhase === "resolved" && player.lastChoiceId && player.lastChoiceCardId && player.lastFeedback) {
      return renderMinorJourneyResultScreen(player, chapter, minorEvent);
    }

    return renderMinorJourneyScreen(player, chapter, minorEvent);
  }

  if (dialogueScene) {
    if (player.journeyPhase === "resolved" && player.lastChoiceId && player.lastChoiceCardId && player.lastFeedback) {
      if (!encounter) {
        return renderCorruptedState();
      }

      return renderDialogueResultScreen(player, chapter, encounter.title, dialogueScene);
    }

    return renderDialogueSceneScreen(player, chapter, encounter.title, dialogueScene, chapter.prompt);
  }

  if (player.journeyPhase === "resolved" && player.lastChoiceId && player.lastChoiceCardId && player.lastFeedback) {
    if (!encounter) {
      return renderCorruptedState();
    }

    return renderMajorJourneyResultScreen(player, chapter, encounter);
  }

  if (!encounter) {
    return renderCorruptedState();
  }

  return renderMajorJourneyScreen(player, chapter, encounter);
}

function renderMajorJourneyScreen(
  _player: PlayerState,
  chapter: ReturnType<typeof getStoryChapter>,
  encounter: ReturnType<typeof getEncounter>,
): string {
  if (!chapter || !encounter) {
    return renderCorruptedState();
  }

  const nextMinorEvent = getMinorEventAfterChapter(chapter.id);

  return `
    <section class="panel journey-panel">
      <div class="section-head">
        <p class="eyebrow">Путь Шута</p>
        <h2>${escapeHtml(chapter.title)}</h2>
        <p>${escapeHtml(chapter.summary)}</p>
      </div>

      <article class="encounter-card">
        <p class="card-kicker">Большая глава</p>
        <h3>${escapeHtml(encounter.title)}</h3>
        <p>${escapeHtml(encounter.situation)}</p>
        <p class="encounter-question">${escapeHtml(encounter.question)}</p>
        ${nextMinorEvent ? `<p class="progress-note">После этой главы появится короткое дорожное событие: ${escapeHtml(nextMinorEvent.title)}.</p>` : ""}
      </article>

      <div class="choice-grid">
        ${encounter.choices.map((choice) => renderChoiceButton(choice)).join("")}
      </div>

      <div class="journey-actions">
        <button class="ghost-button" type="button" data-action="screen" data-screen="home">К главному экрану</button>
      </div>
    </section>
  `;
}

function renderMajorJourneyResultScreen(
  player: PlayerState,
  chapter: ReturnType<typeof getStoryChapter>,
  encounter: ReturnType<typeof getEncounter>,
): string {
  if (!chapter || !encounter) {
    return renderCorruptedState();
  }

  const progress = buildProgressSnapshot(player);
  const choice = encounter.choices.find((item) => item.id === player.lastChoiceId);
  const card = player.lastChoiceCardId ? getCard(player.lastChoiceCardId) : undefined;

  if (!choice || !card) {
    return renderCorruptedState();
  }

  const interpretation = composeEncounterInterpretation(card, encounter, choice);
  const nextMinorEvent = getMinorEventAfterChapter(chapter.id);

  return `
    <section class="panel journey-panel">
      <div class="section-head">
        <p class="eyebrow">Большая глава</p>
        <h2>${escapeHtml(chapter.title)}</h2>
        <p>${escapeHtml(chapter.summary)}</p>
      </div>

      <article class="result-card card-${card.id}">
        <p class="card-kicker">Ответ собран</p>
        <h3>${escapeHtml(interpretation.title)}</h3>
        <p class="card-summary">${escapeHtml(interpretation.summary)}</p>

        <div class="chips">
          ${interpretation.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}
        </div>

        <dl class="reading-grid">
          <div>
            <dt>Тип шага</dt>
            <dd>${escapeHtml(progress.stepKindLabel)}</dd>
          </div>
          <div>
            <dt>Активный шаг</dt>
            <dd>${escapeHtml(progress.encounterTitle)}</dd>
          </div>
          <div>
            <dt>Эпизод</dt>
            <dd>${escapeHtml(progress.episodeProgressLabel)}</dd>
          </div>
          <div>
            <dt>Дорожные события</dt>
            <dd>${escapeHtml(progress.minorEventProgressLabel)}</dd>
          </div>
          <div>
            <dt>Совет</dt>
            <dd>${escapeHtml(interpretation.advice)}</dd>
          </div>
          <div>
            <dt>Предупреждение</dt>
            <dd>${escapeHtml(interpretation.warning)}</dd>
          </div>
          <div>
            <dt>Вопрос к себе</dt>
            <dd>${escapeHtml(interpretation.questionToSelf)}</dd>
          </div>
          <div>
            <dt>На день</dt>
            <dd>${escapeHtml(interpretation.dailyMeaning)}</dd>
          </div>
        </dl>

        <p class="result-feedback">
          ${escapeHtml(player.lastFeedback ?? "")}
          ${nextMinorEvent ? ` После этой главы может появиться дорожное событие ${escapeHtml(nextMinorEvent.title)}.` : ""}
        </p>
        <p class="xp-badge">+${choice.xp} XP · ${escapeHtml(choice.buttonNote)}</p>
      </article>

      <div class="journey-actions">
        <button class="primary-button" type="button" data-action="advance">
          ${escapeHtml(getJourneyAdvanceActionLabel(player))}
        </button>
      </div>
    </section>
  `;
}

function renderMinorJourneyScreen(
  _player: PlayerState,
  chapter: ReturnType<typeof getStoryChapter>,
  minorEvent: NonNullable<ReturnType<typeof getCurrentMinorEvent>>,
): string {
  if (!chapter) {
    return renderCorruptedState();
  }

  const card = getCard(minorEvent.cardId);

  if (!card) {
    return renderCorruptedState();
  }

  return `
    <section class="panel journey-panel">
      <div class="section-head">
        <p class="eyebrow">Дорожное событие</p>
        <h2>${escapeHtml(minorEvent.title)}</h2>
        <p>Глава пути: ${escapeHtml(chapter.title)}</p>
      </div>

      <article class="encounter-card card-${card.id}">
        <p class="card-kicker">Младший аркан</p>
        <h3>${escapeHtml(card.name)}</h3>
        <p>${escapeHtml(minorEvent.situation)}</p>
        <p class="encounter-question">${escapeHtml(minorEvent.question)}</p>
        <p class="progress-note">Это короткая встреча между большими главами пути.</p>
      </article>

      <div class="choice-grid">
        ${minorEvent.choices.map((choice) => renderChoiceButton(choice)).join("")}
      </div>

      <div class="journey-actions">
        <button class="ghost-button" type="button" data-action="screen" data-screen="home">К главному экрану</button>
      </div>
    </section>
  `;
}

function renderMinorJourneyResultScreen(
  player: PlayerState,
  chapter: ReturnType<typeof getStoryChapter>,
  minorEvent: NonNullable<ReturnType<typeof getCurrentMinorEvent>>,
): string {
  if (!chapter) {
    return renderCorruptedState();
  }

  const progress = buildProgressSnapshot(player);
  const choice = minorEvent.choices.find((item) => item.id === player.lastChoiceId);
  const card = player.lastChoiceCardId ? getCard(player.lastChoiceCardId) : undefined;

  if (!choice || !card) {
    return renderCorruptedState();
  }

  const interpretation = composeEncounterInterpretation(card, minorEvent, choice);

  return `
    <section class="panel journey-panel">
      <div class="section-head">
        <p class="eyebrow">Дорожное событие</p>
        <h2>${escapeHtml(minorEvent.title)}</h2>
        <p>Глава пути: ${escapeHtml(chapter.title)}</p>
      </div>

      <article class="result-card card-${card.id}">
        <p class="card-kicker">Младший аркан</p>
        <h3>${escapeHtml(interpretation.title)}</h3>
        <p class="card-summary">${escapeHtml(interpretation.summary)}</p>

        <div class="chips">
          ${interpretation.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}
        </div>

        <dl class="reading-grid">
          <div>
            <dt>Тип шага</dt>
            <dd>${escapeHtml(progress.stepKindLabel)}</dd>
          </div>
          <div>
            <dt>Глава пути</dt>
            <dd>${escapeHtml(chapter.title)}</dd>
          </div>
          <div>
            <dt>Дорожных событий</dt>
            <dd>${escapeHtml(progress.minorEventProgressLabel)}</dd>
          </div>
          <div>
            <dt>Совет</dt>
            <dd>${escapeHtml(interpretation.advice)}</dd>
          </div>
          <div>
            <dt>Предупреждение</dt>
            <dd>${escapeHtml(interpretation.warning)}</dd>
          </div>
          <div>
            <dt>Вопрос к себе</dt>
            <dd>${escapeHtml(interpretation.questionToSelf)}</dd>
          </div>
          <div>
            <dt>На день</dt>
            <dd>${escapeHtml(interpretation.dailyMeaning)}</dd>
          </div>
          <div>
            <dt>Смысл события</dt>
            <dd>${escapeHtml(card.elementMeaning ?? card.dailyMeaning)}</dd>
          </div>
        </dl>

        <p class="result-feedback">${escapeHtml(player.lastFeedback ?? "")} После ответа история продолжится.</p>
        <p class="xp-badge">+${choice.xp} XP · ${escapeHtml(choice.buttonNote)}</p>
      </article>

      <div class="journey-actions">
        <button class="primary-button" type="button" data-action="advance">
          ${escapeHtml(getJourneyAdvanceActionLabel(player))}
        </button>
      </div>
    </section>
  `;
}

function renderJourneyCompletionScreen(player: PlayerState): string {
  const lastJourneyStep = player.lastEncounterId ? getJourneyStepById(player.lastEncounterId) : undefined;
  const fallbackEncounter = getEncounter(player.currentEncounterId) ?? encounters[encounters.length - 1];
  const encounter = lastJourneyStep ?? fallbackEncounter;
  const choice = encounter?.choices.find((item) => item.id === player.lastChoiceId);
  const card = player.lastChoiceCardId ? getCard(player.lastChoiceCardId) : undefined;

  if (!encounter || !choice || !card) {
    return renderCorruptedState();
  }

  const interpretation = composeEncounterInterpretation(card, encounter, choice);
  const completedMinorEvents = minorArcanaEvents.filter((event) => player.completedMinorEventIds.includes(event.id));
  const suitOrder = ["wands", "cups", "swords", "pentacles"] as const;
  const suitLabels: Record<(typeof suitOrder)[number], string> = {
    wands: "Жезлы",
    cups: "Кубки",
    swords: "Мечи",
    pentacles: "Пентакли"
  };
  const suitSummary = suitOrder
    .filter((suit) => completedMinorEvents.some((event) => getCard(event.cardId)?.suit === suit))
    .map((suit) => suitLabels[suit])
    .join(" · ");
  const inventorySummary = player.inventoryCards
    .map((cardId) => getCard(cardId)?.name ?? cardId)
    .join(" · ");

  return `
    <section class="panel journey-panel">
      <div class="section-head">
        <p class="eyebrow">Финал пути</p>
        <h2>Путь старших арканов завершён</h2>
        <p>Ты прошёл 22 архетипических этапа: от импульса Шута до целостности Мира.</p>
      </div>

      <article class="result-card card-${card.id}">
        <p class="card-kicker">Итог пути</p>
        ${renderCardThumbnail(card.id, card.name, "completion-card-thumb", "eager")}
        <h3>Что показал полный круг</h3>
        <p class="card-summary">${escapeHtml(interpretation.summary)}</p>
        <p class="result-feedback">Финальный ответ собран. Теперь можно увидеть весь путь сразу, как цельную историю, а затем пройти его снова уже с новым опытом.</p>

        <dl class="reading-grid">
          <div>
            <dt>Пройдено аркан</dt>
            <dd>22 / 22</dd>
          </div>
          <div>
            <dt>Дорожные события</dt>
            <dd>${completedMinorEvents.length} / ${minorArcanaEvents.length}</dd>
          </div>
          <div>
            <dt>Масти дорожных событий</dt>
            <dd>${escapeHtml(suitSummary || "Пока нет")}</dd>
          </div>
          <div>
            <dt>Получено опыта</dt>
            <dd>${player.xp} XP</dd>
          </div>
          <div>
            <dt>Карты Шута</dt>
            <dd>${escapeHtml(inventorySummary || "Пока нет карт в инвентаре")}</dd>
          </div>
          <div>
            <dt>Смысл круга</dt>
            <dd>От первого импульса к собранной целостности, а младшие арканы соединяют большие главы с повседневной жизнью.</dd>
          </div>
          <div>
            <dt>Дальше</dt>
            <dd>Дорожные события уже работают как слой бытовых проверок; дальше они будут расширяться и связывать новые сцены пути.</dd>
          </div>
        </dl>

        <p class="xp-badge">+${choice.xp} XP · ${escapeHtml(choice.buttonNote)}</p>
      </article>

      <div class="journey-actions">
        <button class="primary-button" type="button" data-action="restart">Повторить историю</button>
        <button class="ghost-button" type="button" data-action="screen" data-screen="journal">Открыть дневник</button>
        <button class="ghost-button" type="button" data-action="screen" data-screen="home">К главному экрану</button>
      </div>
    </section>
  `;
}

function renderJournalScreen(player: PlayerState): string {
  const journal = buildJournalSnapshot(player);

  return `
    <main class="app-shell journal-shell">
      <div class="ambient ambient-a" aria-hidden="true"></div>
      <div class="ambient ambient-b" aria-hidden="true"></div>

      <section class="panel journal-panel">
        <div class="section-head">
          <p class="eyebrow">Дневник Шута</p>
          <h1>След путешествия</h1>
          <p>
            Здесь видно, какие карты Шут получил, какие применил, каких помощников встретил и какие главы пути уже открыты.
          </p>
        </div>

        <dl class="journal-summary-grid">
          <div>
            <dt>Путь</dt>
            <dd>${escapeHtml(journal.progressLabel)}</dd>
          </div>
          <div>
            <dt>Текущая глава</dt>
            <dd>${escapeHtml(journal.currentChapterTitle)}</dd>
          </div>
          <div>
            <dt>Глав пройдено</dt>
            <dd>${journal.summary.completedMajorChapters} / ${journal.summary.totalMajorChapters}</dd>
          </div>
          <div>
            <dt>Малых событий</dt>
            <dd>${journal.summary.completedMinorEvents} / ${journal.summary.totalMinorEvents}</dd>
          </div>
          <div>
            <dt>Карт в инвентаре</dt>
            <dd>${journal.summary.inventoryCards}</dd>
          </div>
          <div>
            <dt>Получено карт</dt>
            <dd>${journal.summary.receivedCards}</dd>
          </div>
          <div>
            <dt>Применено карт</dt>
            <dd>${journal.summary.appliedCards}</dd>
          </div>
          <div>
            <dt>Помощников</dt>
            <dd>${journal.summary.helperCards}</dd>
          </div>
          <div>
            <dt>Известных карт</dt>
            <dd>${journal.summary.knownCards}</dd>
          </div>
        </dl>

        <div class="journal-sections">
          <section class="journal-section">
            <div class="section-head">
              <p class="eyebrow">Карты</p>
              <h2>Полученные карты</h2>
            </div>
            ${renderJournalCardList(
              journal.receivedCards,
              "Пока нет полученных карт.",
              "received"
            )}
          </section>

          <section class="journal-section">
            <div class="section-head">
              <p class="eyebrow">Ритуал</p>
              <h2>Применённые карты</h2>
            </div>
            ${renderJournalCardList(
              journal.appliedCards,
              "Пока нет карт, которые были активно применены.",
              "applied"
            )}
          </section>

          <section class="journal-section">
            <div class="section-head">
              <p class="eyebrow">Помощники</p>
              <h2>Кто помог Шуту</h2>
            </div>
            ${renderJournalHelperList(journal.helpers, "Пока нет встреч помощников.")}
          </section>

          <section class="journal-section">
            <div class="section-head">
              <p class="eyebrow">Главы</p>
              <h2>Путь старших арканов</h2>
            </div>
            ${renderJournalChapterList(journal.chapters)}
          </section>
        </div>

        <div class="journey-actions">
          <button class="primary-button" type="button" data-action="screen" data-screen="home">К главному экрану</button>
        </div>
      </section>
    </main>
  `;
}

function renderJournalCardList(
  entries: readonly { cardId: string; name: string; role: string; uses: number; sourceLabel: string; summary: string }[],
  emptyLabel: string,
  kind: "received" | "applied",
): string {
  if (entries.length === 0) {
    return `<div class="journal-empty">${escapeHtml(emptyLabel)}</div>`;
  }

  return `
    <div class="journal-list journal-list-${kind}">
      ${entries
        .map((entry) => {
          return `
            <article class="journal-item card-${escapeAttribute(entry.cardId)}">
              <div class="journal-item-layout">
                <div class="journal-item-media">
                  ${renderCardThumbnail(entry.cardId, entry.name, "journal-thumb", "lazy")}
                </div>
                <div class="journal-item-body">
                  <p class="card-kicker">${kind === "received" ? "Получено" : "Применено"}</p>
                  <h3>${escapeHtml(entry.name)}</h3>
                  <p>${escapeHtml(entry.summary)}</p>
                  <dl class="journal-meta">
                    <div>
                      <dt>Источник</dt>
                      <dd>${escapeHtml(entry.sourceLabel)}</dd>
                    </div>
                    <div>
                      <dt>Роль</dt>
                      <dd>${escapeHtml(entry.role)}</dd>
                    </div>
                    <div>
                      <dt>Использований</dt>
                      <dd>${entry.uses}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderJournalHelperList(
  entries: readonly { cardId: string; name: string; appearances: number; sceneTitles: readonly string[]; note: string }[],
  emptyLabel: string,
): string {
  if (entries.length === 0) {
    return `<div class="journal-empty">${escapeHtml(emptyLabel)}</div>`;
  }

  return `
    <div class="journal-list journal-list-helpers">
      ${entries
        .map((entry) => {
          return `
            <article class="journal-item card-${escapeAttribute(entry.cardId)}">
              <div class="journal-item-layout">
                <div class="journal-item-media">
                  ${renderCardThumbnail(entry.cardId, entry.name, "journal-thumb", "lazy")}
                </div>
                <div class="journal-item-body">
                  <p class="card-kicker">Помощник</p>
                  <h3>${escapeHtml(entry.name)}</h3>
                  <p>${escapeHtml(entry.note)}</p>
                  <p class="journal-count">Появлений: ${entry.appearances}</p>
                  <div class="chips journal-chips">
                    ${entry.sceneTitles.map((sceneTitle) => `<span>${escapeHtml(sceneTitle)}</span>`).join("")}
                  </div>
                </div>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderJournalChapterList(
  entries: readonly { chapterId: string; title: string; summary: string; prompt: string; status: "completed" | "current" | "upcoming"; cardId: string }[],
): string {
  return `
    <div class="journal-list journal-list-chapters">
      ${entries
        .map((entry, index) => {
          const statusLabel =
            entry.status === "completed" ? "Пройдено" : entry.status === "current" ? "Сейчас" : "Впереди";

          return `
            <article class="journal-item journal-chapter journal-chapter-${escapeAttribute(entry.status)} card-${escapeAttribute(entry.cardId)}">
              <div class="journal-item-layout">
                <div class="journal-item-media">
                  ${renderCardThumbnail(entry.cardId, entry.title, "journal-thumb", "lazy")}
                </div>
                <div class="journal-item-body">
                  <p class="card-kicker">${statusLabel}</p>
                  <span class="journal-index">${String(index + 1).padStart(2, "0")}</span>
                  <h3>${escapeHtml(entry.title)}</h3>
                  <p>${escapeHtml(entry.summary)}</p>
                  <p class="journal-prompt">${escapeHtml(entry.prompt)}</p>
                </div>
              </div>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderChoiceButton(choice: EncounterChoice): string {
  const card = getCard(choice.cardId);

  if (!card) {
    return "";
  }

  return `
    <button class="choice-card card-${card.id}" type="button" data-action="choice" data-choice-id="${escapeAttribute(choice.id)}">
      <span class="choice-label">${escapeHtml(choice.label)}</span>
      <span class="choice-note">${escapeHtml(choice.buttonNote)}</span>
    </button>
  `;
}

function renderChapterTrail(player: PlayerState): string {
  return `
    <div class="trail-grid">
      ${storyChapters
        .map((chapter, index) => {
          const isCurrent = chapter.id === player.currentChapterId;
          const isPlayable = Boolean(chapter.encounterId);
          const isCompleted = chapter.encounterId ? player.completedEncounterIds.includes(chapter.encounterId) : false;
          const card = getCard(chapter.cardId);

          return `
            <article class="trail-card ${isCurrent ? "is-current" : ""} ${isCompleted ? "is-completed" : ""} ${isPlayable ? "is-playable" : "is-locked"}">
              <span class="trail-index">${String(index + 1).padStart(2, "0")}</span>
              <h3>${escapeHtml(chapter.title)}</h3>
              <p>${escapeHtml(card?.storyRole ?? "глава")}</p>
              <small>${escapeHtml(isCompleted ? "Сцена пройдена" : isPlayable ? chapter.prompt : "Будет открыто в следующих шагах")}</small>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderPlaceholderScreen(screen: ScreenId): string {
  const mode = modeCatalog.find((item) => item.id === screen);

  return `
    <section class="panel placeholder-panel">
      <div class="section-head">
        <p class="eyebrow">Режим в разработке</p>
        <h2>${escapeHtml(mode?.title ?? "Режим")}</h2>
        <p>${escapeHtml(mode?.description ?? "Этот экран появится в следующем PR.")}</p>
      </div>

      <div class="placeholder-card">
        <p>Здесь пока только каркас навигации. В следующих PR появятся полноценные сценарии без backend и без внешних API.</p>
      </div>

      <div class="journey-actions">
        <button class="primary-button" type="button" data-action="screen" data-screen="home">Вернуться к главному экрану</button>
      </div>
    </section>
  `;
}

function renderCorruptedState(): string {
  return `
    <section class="panel placeholder-panel">
      <div class="section-head">
        <p class="eyebrow">Состояние</p>
        <h2>Ответ не удалось собрать</h2>
        <p>Пожалуйста, вернитесь на главный экран и продолжите путь заново.</p>
      </div>

      <div class="journey-actions">
        <button class="primary-button" type="button" data-action="screen" data-screen="home">К главному экрану</button>
      </div>
    </section>
  `;
}

function renderModeButton(id: ScreenId, title: string, description: string, isActive: boolean): string {
  return `
    <button class="mode-card ${isActive ? "is-active" : ""}" type="button" data-action="screen" data-screen="${id}">
      <span class="mode-title">${escapeHtml(title)}</span>
      <span class="mode-description">${escapeHtml(description)}</span>
    </button>
  `;
}

function updateDocumentTitle(screen: ScreenId, player: PlayerState): void {
  const minorEvent = getCurrentMinorEvent(player);
  const chapter = getStoryChapter(player.currentChapterId) ?? storyChapters[0];

  const titles: Record<ScreenId, string> = {
    home: "Путь Шута",
    journal: "Путь Шута · Дневник",
    scene:
      player.journeyPhase === "complete"
        ? "Путь Шута · Сцена завершена"
        : player.currentStepKind === "minor" && minorEvent
          ? `Путь Шута · ${minorEvent.title}`
          : `Путь Шута · ${chapter.title}`,
    result:
      player.journeyPhase === "complete"
        ? "Путь Шута · Завершено"
        : player.currentStepKind === "minor" && minorEvent
          ? `Путь Шута · Ответ · ${minorEvent.title}`
          : "Путь Шута · Ответ",
    journey:
      player.journeyPhase === "complete"
        ? "Путь Шута · Сцена завершена"
        : player.currentStepKind === "minor" && minorEvent
          ? `Путь Шута · ${minorEvent.title}`
          : `Путь Шута · ${chapter.title}`,
    "live-spread": "Путь Шута · Живой расклад",
    "card-of-day": "Путь Шута · Карта дня",
    dialogues: "Путь Шута · Аркана-диалоги",
    assembly: "Путь Шута · Собери трактовку",
    reference: "Путь Шута · Справочник"
  };

  document.title = titles[screen];
}

function isScreenId(value: string | undefined): value is ScreenId {
  return (
    value === "home" ||
    value === "scene" ||
    value === "result" ||
    value === "journal" ||
    value === "journey" ||
    value === "live-spread" ||
    value === "card-of-day" ||
    value === "dialogues" ||
    value === "assembly" ||
    value === "reference"
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll("'", "&#39;");
}

export {
  renderChoiceButton,
  renderJourneyScreen,
  renderJourneyCompletionScreen,
  renderPlaceholderScreen,
  renderChapterTrail,
  renderModeButton,
  renderCorruptedState,
  renderScreen,
  modeCatalog
};
