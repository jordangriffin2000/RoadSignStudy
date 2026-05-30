const IMAGE_DIRECTORY = "Images";
const SIGNS_ENDPOINT = "signs.json";
const TRICKY_STORAGE_KEY = "irishRoadSigns.trickySigns";
const THEME_STORAGE_KEY = "irishRoadSigns.theme";

const COMMON_SIGN_NUMBERS = [
  23, 30, 139, 1, 9, 15, 131, 3, 11, 7, 62, 97, 117, 99, 106, 109,
  110, 111, 90, 91, 89, 95, 98, 107, 108, 121, 76, 86, 88, 78, 85,
  82, 87, 70, 71, 72, 73, 122, 26, 25, 17, 18, 19
];

const state = {
  records: [],
  commonRecords: [],
  trickyFiles: [],
  trickySet: new Set(),
  answersByFile: new Map(),
  deckMode: "all",
  deck: [],
  currentIndex: 0,
  currentFileName: "",
  imageCandidates: [],
  imageCandidateIndex: 0
};

const storage = {
  read(key, fallback = []) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return value ?? fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }
};

const elements = {
  progressText: document.querySelector("#progressText"),
  progressFill: document.querySelector("#progressFill"),
  themeToggle: document.querySelector("#themeToggle"),
  studyView: document.querySelector("#studyView"),
  galleryView: document.querySelector("#galleryView"),
  commonView: document.querySelector("#commonView"),
  studyViewButton: document.querySelector("#studyViewButton"),
  allSignsViewButton: document.querySelector("#allSignsViewButton"),
  commonSignsViewButton: document.querySelector("#commonSignsViewButton"),
  allDeckButton: document.querySelector("#allDeckButton"),
  commonDeckButton: document.querySelector("#commonDeckButton"),
  trickyDeckButton: document.querySelector("#trickyDeckButton"),
  allSignsFilter: document.querySelector("#allSignsFilter"),
  allDeckCount: document.querySelector("#allDeckCount"),
  commonDeckCount: document.querySelector("#commonDeckCount"),
  trickyDeckCount: document.querySelector("#trickyDeckCount"),
  deckSummary: document.querySelector("#deckSummary"),
  signImage: document.querySelector("#signImage"),
  imageError: document.querySelector("#imageError"),
  toggleTricky: document.querySelector("#toggleTricky"),
  answerPanel: document.querySelector("#answerPanel"),
  answer: document.querySelector("#answer"),
  showAnswer: document.querySelector("#showAnswer"),
  nextSign: document.querySelector("#nextSign"),
  restartDeck: document.querySelector("#restartDeck"),
  galleryGrid: document.querySelector("#galleryGrid"),
  galleryCount: document.querySelector("#galleryCount"),
  excludeCommonFromStudy: document.querySelector("#excludeCommonFromStudy"),
  commonGrid: document.querySelector("#commonGrid"),
  commonCount: document.querySelector("#commonCount")
};

const getSignNumber = (key) => {
  const value = String(key);
  const namedMatch = value.match(/sign\s*\((\d+)\)/i);
  const numericMatch = value.match(/^(\d+)$/);
  const match = namedMatch || numericMatch;
  return match ? Number(match[1]) : null;
};

const getFileName = (key, number) => {
  const value = String(key);
  return /\.(?:png|jpe?g|webp)$/i.test(value) ? value : `sign (${number}).png`;
};

const buildRecords = (signDefinitions) => Object.entries(signDefinitions)
  .map(([key, definition]) => {
    const number = getSignNumber(key);
    return {
      number,
      fileName: getFileName(key, number),
      definition: String(definition || "").trim()
    };
  })
  .filter((record) => record.number && record.number !== 69 && record.definition)
  .sort((a, b) => a.number - b.number);

const shuffle = (items) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

const getImageCandidates = (fileName) => {
  const baseName = fileName.replace(/\.(?:png|jpe?g|webp)$/i, "");
  return [...new Set([
    fileName,
    `${baseName}.png`,
    `${baseName}.jpg`,
    `${baseName}.jpeg`,
    `${baseName}.webp`
  ])];
};

const getActiveFiles = () => {
  if (state.deckMode === "common") {
    return state.commonRecords.map((record) => record.fileName);
  }

  if (state.deckMode === "tricky") {
    return state.trickyFiles;
  }

  if (elements.excludeCommonFromStudy.checked) {
    const commonNumbers = new Set(COMMON_SIGN_NUMBERS);
    return state.records
      .filter((record) => !commonNumbers.has(record.number))
      .map((record) => record.fileName);
  }

  return state.records.map((record) => record.fileName);
};

const getDeckName = () => ({
  all: "All Signs",
  common: "Most Common",
  tricky: "Tricky"
})[state.deckMode];

const updateProgress = () => {
  const total = state.deck.length;
  const shown = total ? state.currentIndex + 1 : 0;
  const remaining = Math.max(total - shown, 0);
  const percent = total ? (shown / total) * 100 : 0;

  elements.progressText.textContent = total
    ? `${remaining} left`
    : "0 signs";
  elements.progressFill.style.width = `${percent}%`;
};

const updateCounts = () => {
  elements.allDeckCount.textContent = `${state.records.length} signs`;
  elements.commonDeckCount.textContent = `${state.commonRecords.length} signs`;
  elements.trickyDeckCount.textContent = `${state.trickyFiles.length} saved`;
  elements.galleryCount.textContent = `${state.records.length} signs`;
};

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  elements.themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  elements.themeToggle.setAttribute("aria-pressed", String(isDark));
};

const initializeTheme = () => {
  const savedTheme = storage.read(THEME_STORAGE_KEY, null);
  const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (systemPrefersDark ? "dark" : "light");
  applyTheme(theme);
};

const toggleTheme = () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  storage.write(THEME_STORAGE_KEY, nextTheme);
};

const updateDeckButtons = () => {
  elements.allDeckButton.setAttribute("aria-pressed", String(state.deckMode === "all"));
  elements.commonDeckButton.setAttribute("aria-pressed", String(state.deckMode === "common"));
  elements.trickyDeckButton.setAttribute("aria-pressed", String(state.deckMode === "tricky"));
  elements.allSignsFilter.hidden = state.deckMode !== "all";
};

const updateTrickyDeck = () => {
  const validFiles = new Set(state.records.map((record) => record.fileName));
  state.trickyFiles = [...state.trickySet].filter((fileName) => validFiles.has(fileName));

  if (state.trickyFiles.length !== state.trickySet.size) {
    state.trickySet = new Set(state.trickyFiles);
    storage.write(TRICKY_STORAGE_KEY, state.trickyFiles);
  }

  updateCounts();
};

const updateTrickyButton = () => {
  const isTricky = state.trickySet.has(state.currentFileName);
  elements.toggleTricky.textContent = isTricky ? "Remove Tricky" : "Mark Tricky";
  elements.toggleTricky.setAttribute("aria-pressed", String(isTricky));
};

const setImage = (fileName) => {
  state.currentFileName = fileName;
  state.imageCandidates = getImageCandidates(fileName);
  state.imageCandidateIndex = 0;

  elements.imageError.hidden = true;
  elements.signImage.hidden = false;
  elements.signImage.classList.add("is-changing");
  elements.signImage.alt = `Road sign ${getSignNumber(fileName) || ""}`.trim();

  window.setTimeout(() => {
    elements.signImage.src = `${IMAGE_DIRECTORY}/${state.imageCandidates[state.imageCandidateIndex]}`;
    elements.signImage.classList.remove("is-changing");
  }, 90);
};

const setGalleryImage = (image, fileName) => {
  const candidates = getImageCandidates(fileName);
  let candidateIndex = 0;

  image.src = `${IMAGE_DIRECTORY}/${candidates[candidateIndex]}`;
  image.addEventListener("error", () => {
    candidateIndex += 1;

    if (candidateIndex < candidates.length) {
      image.src = `${IMAGE_DIRECTORY}/${candidates[candidateIndex]}`;
      return;
    }

    const missing = document.createElement("p");
    missing.className = "image-error";
    missing.textContent = "Image missing";
    image.replaceWith(missing);
  });
};

const renderGallery = () => {
  const fragment = document.createDocumentFragment();

  state.records.forEach((record) => {
    const card = document.createElement("article");
    const number = document.createElement("p");
    const imageFrame = document.createElement("div");
    const image = document.createElement("img");
    const caption = document.createElement("p");

    card.className = "sign-card";
    number.className = "sign-number";
    imageFrame.className = "gallery-image-frame";
    caption.className = "gallery-answer";

    number.textContent = `Sign ${record.number}`;
    image.alt = `Road sign ${record.number}`;
    caption.textContent = record.definition;

    setGalleryImage(image, record.fileName);
    imageFrame.append(image);
    card.append(number, imageFrame, caption);
    fragment.append(card);
  });

  elements.galleryGrid.replaceChildren(fragment);
  elements.galleryCount.textContent = `${state.records.length} signs`;
};

const renderCommonGallery = () => {
  const fragment = document.createDocumentFragment();

  state.commonRecords.forEach((record) => {
    const card = document.createElement("article");
    const number = document.createElement("p");
    const imageFrame = document.createElement("div");
    const image = document.createElement("img");
    const caption = document.createElement("p");

    card.className = "sign-card";
    number.className = "sign-number";
    imageFrame.className = "gallery-image-frame";
    caption.className = "gallery-answer";

    number.textContent = `Sign ${record.number}`;
    image.alt = `Road sign ${record.number}`;
    caption.textContent = record.definition;

    setGalleryImage(image, record.fileName);
    imageFrame.append(image);
    card.append(number, imageFrame, caption);
    fragment.append(card);
  });

  elements.commonGrid.replaceChildren(fragment);
  elements.commonCount.textContent = `${state.commonRecords.length} signs`;
};

const setView = (view) => {
  const isStudy = view === "study";
  const isGallery = view === "gallery";
  const isCommon = view === "common";

  elements.studyView.hidden = !isStudy;
  elements.galleryView.hidden = !isGallery;
  elements.commonView.hidden = !isCommon;
  elements.studyViewButton.setAttribute("aria-pressed", String(isStudy));
  elements.allSignsViewButton.setAttribute("aria-pressed", String(isGallery));
  elements.commonSignsViewButton.setAttribute("aria-pressed", String(isCommon));

  if (isGallery) {
    elements.progressText.textContent = `${state.records.length} signs`;
    elements.progressFill.style.width = "100%";
  } else if (isCommon) {
    elements.progressText.textContent = `${state.commonRecords.length} signs`;
    elements.progressFill.style.width = "100%";
  } else {
    updateProgress();
  }
};

const setInitialView = () => {
  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname);
  }

  setView("study");
};

const showEmptyDeck = () => {
  const isTricky = state.deckMode === "tricky";

  state.deck = [];
  state.currentIndex = 0;
  elements.signImage.hidden = true;
  elements.imageError.hidden = true;
  elements.toggleTricky.hidden = true;
  elements.answerPanel.hidden = false;
  elements.answer.textContent = isTricky
    ? "No tricky signs saved yet. Mark signs as tricky while studying to build this deck."
    : "No signs found for this deck.";
  elements.showAnswer.hidden = true;
  elements.nextSign.hidden = true;
  elements.restartDeck.hidden = true;
  elements.deckSummary.textContent = `${getDeckName()} is empty.`;
  updateProgress();
};

const showCurrentCard = () => {
  const fileName = state.deck[state.currentIndex];

  if (!fileName) {
    showEmptyDeck();
    return;
  }

  elements.answerPanel.hidden = true;
  elements.answer.textContent = state.answersByFile.get(fileName) || "";
  elements.showAnswer.hidden = false;
  elements.nextSign.hidden = true;
  elements.restartDeck.hidden = true;
  elements.toggleTricky.hidden = false;
  elements.deckSummary.textContent = `${getDeckName()} deck is shuffled. No repeats until all signs are shown.`;

  setImage(fileName);
  updateTrickyButton();
  updateProgress();
};

const finishDeck = () => {
  elements.signImage.hidden = true;
  elements.imageError.hidden = true;
  elements.toggleTricky.hidden = true;
  elements.answerPanel.hidden = false;
  elements.answer.textContent = "Deck complete";
  elements.showAnswer.hidden = true;
  elements.nextSign.hidden = true;
  elements.restartDeck.hidden = false;
  elements.progressText.textContent = "Complete";
  elements.progressFill.style.width = "100%";
  elements.deckSummary.textContent = `You completed the ${getDeckName()} deck.`;
  elements.restartDeck.focus();
};

const startDeck = () => {
  const files = getActiveFiles();

  if (!files.length) {
    showEmptyDeck();
    return;
  }

  state.deck = shuffle(files);
  state.currentIndex = 0;
  showCurrentCard();
};

const setDeckMode = (mode) => {
  state.deckMode = mode;
  updateDeckButtons();
  startDeck();
};

const revealAnswer = () => {
  elements.answerPanel.hidden = false;
  elements.showAnswer.hidden = true;
  elements.nextSign.hidden = false;
  elements.nextSign.focus();
};

const goToNextSign = () => {
  state.currentIndex += 1;

  if (state.currentIndex >= state.deck.length) {
    finishDeck();
    return;
  }

  showCurrentCard();
};

const toggleTricky = () => {
  if (!state.currentFileName) {
    return;
  }

  if (state.trickySet.has(state.currentFileName)) {
    state.trickySet.delete(state.currentFileName);
  } else {
    state.trickySet.add(state.currentFileName);
  }

  storage.write(TRICKY_STORAGE_KEY, [...state.trickySet]);
  updateTrickyDeck();
  updateTrickyButton();

  if (state.deckMode === "tricky" && !state.trickySet.has(state.currentFileName)) {
    state.deck = state.deck.filter((fileName) => fileName !== state.currentFileName);

    if (!state.deck.length) {
      showEmptyDeck();
      return;
    }

    if (state.currentIndex >= state.deck.length) {
      state.currentIndex = state.deck.length - 1;
    }

    showCurrentCard();
  }
};

const loadSignDefinitions = async () => {
  if (window.location.protocol === "file:" && window.SIGN_DEFINITIONS) {
    return window.SIGN_DEFINITIONS;
  }

  try {
    const response = await fetch(SIGNS_ENDPOINT, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Could not load ${SIGNS_ENDPOINT}`);
    }

    return response.json();
  } catch (error) {
    if (window.SIGN_DEFINITIONS) {
      return window.SIGN_DEFINITIONS;
    }

    throw error;
  }
};

const bindEvents = () => {
  elements.signImage.addEventListener("error", () => {
    state.imageCandidateIndex += 1;

    if (state.imageCandidateIndex < state.imageCandidates.length) {
      elements.signImage.src = `${IMAGE_DIRECTORY}/${state.imageCandidates[state.imageCandidateIndex]}`;
      return;
    }

    elements.signImage.hidden = true;
    elements.imageError.textContent = `Image missing: ${state.currentFileName}`;
    elements.imageError.hidden = false;
  });

  elements.studyViewButton.addEventListener("click", () => setView("study"));
  elements.allSignsViewButton.addEventListener("click", () => setView("gallery"));
  elements.commonSignsViewButton.addEventListener("click", () => setView("common"));
  elements.allDeckButton.addEventListener("click", () => setDeckMode("all"));
  elements.commonDeckButton.addEventListener("click", () => setDeckMode("common"));
  elements.trickyDeckButton.addEventListener("click", () => setDeckMode("tricky"));
  elements.showAnswer.addEventListener("click", revealAnswer);
  elements.nextSign.addEventListener("click", goToNextSign);
  elements.restartDeck.addEventListener("click", startDeck);
  elements.toggleTricky.addEventListener("click", toggleTricky);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.excludeCommonFromStudy.addEventListener("change", () => {
    if (state.deckMode === "all") {
      startDeck();
    }
  });
};

const initialize = async () => {
  initializeTheme();
  bindEvents();

  try {
    const signDefinitions = await loadSignDefinitions();
    state.records = buildRecords(signDefinitions);
    state.commonRecords = COMMON_SIGN_NUMBERS
      .map((number) => state.records.find((record) => record.number === number))
      .filter(Boolean);
    state.answersByFile = new Map(state.records.map((record) => [record.fileName, record.definition]));
    state.trickySet = new Set(storage.read(TRICKY_STORAGE_KEY));

    updateTrickyDeck();
    updateCounts();
    updateDeckButtons();
    renderGallery();
    renderCommonGallery();
    startDeck();
    setInitialView();
  } catch (error) {
    elements.progressText.textContent = "Load failed";
    elements.answerPanel.hidden = false;
    elements.answer.textContent = "Unable to load sign data. Check that signs.json or signs-data.js is available.";
    elements.showAnswer.hidden = true;
    elements.nextSign.hidden = true;
    elements.restartDeck.hidden = true;
    elements.toggleTricky.hidden = true;
  }
};

initialize();
