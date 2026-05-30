const IMAGE_DIRECTORY = "Images";
const SIGNS_ENDPOINT = "signs.json";

const COMMON_SIGN_NUMBERS = [
  23, 30, 139, 1, 9, 15, 131, 3, 11, 7, 62, 97, 117, 99, 106, 109,
  110, 111, 90, 91, 89, 95, 98, 107, 108, 121, 76, 86, 88, 78, 85,
  82, 87, 70, 71, 72, 73, 122, 26, 25, 17, 18, 19
];

const commonGrid = document.querySelector("#commonGrid");
const count = document.querySelector("#count");

const getImageCandidates = (number) => [
  `sign (${number}).png`,
  `sign (${number}).jpg`,
  `sign (${number}).jpeg`,
  `sign (${number}).webp`
];

const setImage = (image, number) => {
  const candidates = getImageCandidates(number);
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
    missing.textContent = `Image missing: sign (${number})`;
    image.replaceWith(missing);
  });
};

const renderCommonSigns = (signDefinitions) => {
  const fragment = document.createDocumentFragment();

  COMMON_SIGN_NUMBERS.forEach((number) => {
    const card = document.createElement("article");
    const label = document.createElement("p");
    const imageFrame = document.createElement("div");
    const image = document.createElement("img");
    const answer = document.createElement("p");

    card.className = "sign-card";
    label.className = "sign-number";
    imageFrame.className = "gallery-image-frame";
    answer.className = "gallery-answer";

    label.textContent = `Sign ${number}`;
    image.alt = `Road sign ${number}`;
    answer.textContent = signDefinitions[String(number)] || "Answer missing";

    setImage(image, number);
    imageFrame.append(image);
    card.append(label, imageFrame, answer);
    fragment.append(card);
  });

  commonGrid.replaceChildren(fragment);
  count.textContent = `${COMMON_SIGN_NUMBERS.length} signs`;
};

const initialize = async () => {
  try {
    if (window.location.protocol === "file:" && window.SIGN_DEFINITIONS) {
      renderCommonSigns(window.SIGN_DEFINITIONS);
      return;
    }

    let signDefinitions = window.SIGN_DEFINITIONS;

    try {
      const response = await fetch(SIGNS_ENDPOINT, { cache: "no-store" });

      if (response.ok) {
        signDefinitions = await response.json();
      }
    } catch {
      signDefinitions = window.SIGN_DEFINITIONS;
    }

    if (!signDefinitions) {
      throw new Error(`Could not load ${SIGNS_ENDPOINT}`);
    }

    renderCommonSigns(signDefinitions);
  } catch {
    count.textContent = "Load failed";
    const message = document.createElement("p");
    message.className = "empty-state";
    message.textContent = "Unable to load sign data. Check that signs.json or signs-data.js is available.";
    commonGrid.replaceChildren(message);
  }
};

initialize();
