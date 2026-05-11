import { getCard } from "./data/cards";
import { encounters, getEncounter } from "./data/encounters";
import { storyChapters, getStoryChapter } from "./data/storyChapters";
import { composeEncounterInterpretation } from "./domain/meaning";
import {
  buildProgressSnapshot,
  getCurrentChapterCard,
  getLastChoiceCard,
  getPrimaryActionLabel,
  recordEncounterChoice,
  resetPlayerState,
} from "./domain/progress";
import { loadPlayerState, resetStoredPlayerState, savePlayerState } from "./domain/storage";
import type { AppViewState, EncounterChoice, PlayerState, ScreenId, StorageLike } from "./domain/models";

const modeCatalog = [
  {
    id: "journey",
    title: "Путь Шута",
    description: "Сюжетная сцена, первый выбор и мягкая трактовка ответа."
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
      player = recordEncounterChoice(player, encounter.id, choice, interpretation.summary);
      savePlayerState(storage, player);
      screen = "journey";
      rerender();
      return;
    }

    if (action === "reset") {
      if (!window.confirm("Сбросить прогресс Шута?")) {
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
  const progress = buildProgressSnapshot(view.player);
  const chapter = getStoryChapter(view.player.currentChapterId) ?? storyChapters[0];
  const chapterCard = getCurrentChapterCard(view.player);
  const lastChoiceCard = getLastChoiceCard(view.player);
  const primaryActionLabel = getPrimaryActionLabel(view.player);

  return `
    <main class="app-shell">
      <div class="ambient ambient-a" aria-hidden="true"></div>
      <div class="ambient ambient-b" aria-hidden="true"></div>

      <header class="hero panel">
        <div class="hero-copy">
          <p class="eyebrow">Ранний прототип</p>
          <h1>Путь Шута</h1>
          <p class="lead">
            Лёгкий сюжетный квест про карты Таро как архетипы, выбор в контексте и спокойное обучение через игру.
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
            <dt>Глава</dt>
            <dd>${escapeHtml(progress.chapterTitle)}</dd>
          </div>
          <div>
            <dt>Карта главы</dt>
            <dd>${escapeHtml(chapterCard?.name ?? "Пока нет")}</dd>
          </div>
          <div>
            <dt>Опыт</dt>
            <dd>${progress.xp} XP</dd>
          </div>
          <div>
            <dt>Последний выбор</dt>
            <dd>${escapeHtml(progress.lastChoiceLabel)}</dd>
          </div>
          <div>
            <dt>Последняя карта</dt>
            <dd>${escapeHtml(progress.lastChoiceCardLabel)}</dd>
          </div>
          <div>
            <dt>Сохранено</dt>
            <dd>${escapeHtml(progress.lastSavedLabel)}</dd>
          </div>
        </dl>

        <p class="progress-note">
          ${lastChoiceCard ? escapeHtml(lastChoiceCard.dailyMeaning) : escapeHtml(chapter.prompt)}
        </p>
      </section>

      <section class="panel home-panel" aria-labelledby="home-title">
        <div class="section-head">
          <p class="eyebrow">Главный экран</p>
          <h2 id="home-title">Продолжить путь Шута</h2>
          <p>
            На этой странице живёт стартовая сцена, а остальные режимы пока открываются как отдельные заглушки.
          </p>
        </div>

        <div class="home-actions">
          <button class="primary-button" type="button" data-action="screen" data-screen="journey">
            ${escapeHtml(primaryActionLabel)}
          </button>
          <button class="ghost-button" type="button" data-action="reset">Сбросить прогресс</button>
        </div>

        <p class="prototype-note">
          Это ранний прототип. Сейчас здесь только одна сюжетная сцена, чтобы проверить ритм игры и сохранение прогресса.
        </p>
      </section>

      <section class="panel mode-panel" aria-labelledby="modes-title">
        <div class="section-head">
          <p class="eyebrow">Режимы</p>
          <h2 id="modes-title">Выберите маршрут</h2>
        </div>

        <div class="mode-grid">
          ${modeCatalog
            .map((mode) => renderModeButton(mode.id, mode.title, mode.description, view.screen === mode.id))
            .join("")}
        </div>
      </section>

      <section class="screen-stack" aria-live="polite">
        ${renderScreen(view)}
      </section>

      <footer class="footer-note">
        <p>Путь Шута — статический прототип на Vite + TypeScript. Прогресс хранится локально в браузере.</p>
      </footer>
    </main>
  `;
}

function renderScreen(view: AppViewState): string {
  if (view.screen === "home") {
    return "";
  }

  if (view.screen === "journey") {
    return renderJourneyScreen(view.player);
  }

  return renderPlaceholderScreen(view.screen);
}

function renderJourneyScreen(player: PlayerState): string {
  const chapter = getStoryChapter(player.currentChapterId) ?? storyChapters[0];
  const encounter = getEncounter(player.currentEncounterId) ?? encounters[0];

  if (player.journeyPhase === "resolved" && player.lastChoiceId && player.lastChoiceCardId && player.lastFeedback) {
    const choice = encounter.choices.find((item) => item.id === player.lastChoiceId);
    const card = getCard(player.lastChoiceCardId);

    if (!choice || !card) {
      return renderCorruptedState();
    }

    const interpretation = composeEncounterInterpretation(card, encounter, choice);

    return `
      <section class="panel journey-panel">
        <div class="section-head">
          <p class="eyebrow">Путь Шута</p>
          <h2>${escapeHtml(chapter.title)}</h2>
          <p>${escapeHtml(chapter.summary)}</p>
        </div>

        ${renderChapterTrail(player)}

        <article class="result-card card-${card.id}">
          <p class="card-kicker">Ответ собран</p>
          <h3>${escapeHtml(interpretation.title)}</h3>
          <p class="card-summary">${escapeHtml(interpretation.summary)}</p>

          <div class="chips">
            ${interpretation.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join("")}
          </div>

          <dl class="reading-grid">
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

          <p class="result-feedback">${escapeHtml(player.lastFeedback)}</p>
          <p class="xp-badge">+${choice.xp} XP · ${escapeHtml(choice.buttonNote)}</p>
        </article>

        <div class="journey-actions">
          <button class="primary-button" type="button" data-action="screen" data-screen="home">К главному экрану</button>
        </div>
      </section>
    `;
  }

  return `
    <section class="panel journey-panel">
      <div class="section-head">
        <p class="eyebrow">Путь Шута</p>
        <h2>${escapeHtml(chapter.title)}</h2>
        <p>${escapeHtml(chapter.summary)}</p>
      </div>

      ${renderChapterTrail(player)}

      <article class="encounter-card">
        <p class="card-kicker">Ситуация</p>
        <h3>${escapeHtml(encounter.title)}</h3>
        <p>${escapeHtml(encounter.situation)}</p>
        <p class="encounter-question">${escapeHtml(encounter.question)}</p>
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

function renderChoiceButton(choice: EncounterChoice): string {
  const card = getCard(choice.cardId);

  if (!card) {
    return "";
  }

  return `
    <button class="choice-card card-${card.id}" type="button" data-action="choice" data-choice-id="${escapeAttribute(choice.id)}">
      <span class="choice-label">${escapeHtml(choice.label)}</span>
      <span class="choice-card-name">${escapeHtml(card.name)} · ${escapeHtml(choice.orientation === "upright" ? "прямая" : "перевёрнутая")}</span>
      <span class="choice-note">${escapeHtml(choice.buttonNote)}</span>
      <span class="choice-keywords">${card.keywords.map((keyword) => escapeHtml(keyword)).join(" · ")}</span>
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
          const card = getCard(chapter.cardId);

          return `
            <article class="trail-card ${isCurrent ? "is-current" : ""} ${isPlayable ? "is-playable" : "is-locked"}">
              <span class="trail-index">0${index + 1}</span>
              <h3>${escapeHtml(chapter.title)}</h3>
              <p>${escapeHtml(card?.storyRole ?? "глава")}</p>
              <small>${escapeHtml(isPlayable ? chapter.prompt : "Будет открыто в следующих шагах")}</small>
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
  const titles: Record<ScreenId, string> = {
    home: "Путь Шута",
    journey: player.journeyPhase === "resolved" ? "Путь Шута · Ответ" : "Путь Шута · Сцена Шута",
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

// Экспортируем хелперы, чтобы тесты могли проверять чистую сборку интерфейса.
export {
  renderChoiceButton,
  renderJourneyScreen,
  renderPlaceholderScreen,
  renderChapterTrail,
  renderModeButton,
  renderCorruptedState,
  renderScreen,
  modeCatalog
};
