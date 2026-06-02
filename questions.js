const THEME_STORAGE_KEY = "irishRoadSigns.theme";
const TRICKY_QUESTIONS_STORAGE_KEY = "irishRoadSigns.trickyQuestions";

const QUESTIONS = [
  {
    id: "overtake-left",
    question: "When can you overtake on the left?",
    answer: [
      "When you want to go straight ahead and the driver in front of you has moved out and signalled that they intend to turn right.",
      "When you have signalled that you intend to turn left.",
      "When traffic in both lanes is moving slowly and traffic in the left-hand lane is moving more quickly than the traffic in the right-hand lane."
    ]
  },
  {
    id: "solid-white-line",
    question: "What is meant by a solid white line in the centre of the road?",
    answer: ["You must stay to the left and must not cross the line unless it is for access or in an emergency."]
  },
  {
    id: "broken-yellow-line",
    question: "What does a broken yellow line mean?",
    answer: ["The road contains a hard shoulder which is normally only for pedestrians and cyclists, but may be used briefly to allow faster traffic to overtake if it is safe to do so."]
  },
  {
    id: "double-broken-white-lines",
    question: "What does double broken white lines along the centre of the road mean?",
    answer: ["These alert the driver to continuous white lines a short distance ahead. You must not cross them unless it is safe to do so."]
  },
  {
    id: "stop-sign-no-line",
    question: "At a stop sign that has no white line, where should you stop?",
    answer: ["You must stop at the sign."]
  },
  {
    id: "continuous-and-broken-white-line",
    question: "Where there is a continuous and a broken white line along the centre of the road, which one do you obey?",
    answer: ["You must obey the line that is nearest you."]
  },
  {
    id: "roundabout-priority",
    question: "Who has priority at a roundabout?",
    answer: ["You must give right of way to traffic already on a roundabout."]
  },
  {
    id: "dip-headlights",
    question: "When driving, when should you dip your headlights?",
    answer: [
      "When meeting other traffic.",
      "When following close behind another vehicle.",
      "On continuously lit roads.",
      "In snow, fog, dusk, or dawn.",
      "Generally, to avoid inconveniencing other traffic."
    ]
  },
  {
    id: "dazzled-by-headlights",
    question: "What should you do if you are dazzled by another vehicle's headlights?",
    answer: [
      "Slow down and stop if necessary.",
      "Always watch for pedestrians or cyclists on the side of the road.",
      "If the dazzle is from an oncoming vehicle, avoid it by looking towards the left verge until the vehicle has passed.",
      "If the dazzle is from a vehicle behind you and reflected in your mirror, operate the night-driving mode on your mirror."
    ]
  },
  {
    id: "horn-restrictions",
    question: "What restrictions are there in relation to the use of the horn?",
    answer: ["Do not use a horn in a built-up area between 11.30pm and 7.00am, unless there is a traffic emergency."]
  },
  {
    id: "parking-distance-kerb",
    question: "Within what distance from the kerb should you park?",
    answer: ["45cm"]
  },
  {
    id: "where-not-overtake",
    question: "Where should you not overtake?",
    answer: ["Near a bend, the brow of a hill, a hump back bridge, a continuous white line, where your vehicle would obstruct a sign, at an entrance, opposite another vehicle on a narrow road, or at a taxi rank."]
  },
  {
    id: "traffic-light-sequence",
    question: "What is the sequence of traffic lights?",
    answer: ["Green, Amber, Red."]
  },
  {
    id: "clearway-meaning",
    question: "What does a clearway mean?",
    answer: ["No parking during specified times or stopping unless you are waiting in a line of traffic."]
  },
  {
    id: "box-junction-rules",
    question: "What rules apply to a box junction?",
    answer: ["You must not enter a yellow box junction unless you can clear it without stopping. An exception is when you want to turn right. You may enter while waiting for a gap in traffic coming from the opposite direction, as long as doing so would not block other traffic that has priority."]
  },
  {
    id: "pelican-vs-zebra-crossing",
    question: "What is the difference between a pelican crossing and a zebra crossing?",
    answer: ["A pelican crossing is controlled by lights. A zebra crossing has flashing orange beacons and is controlled by the presence of pedestrians."]
  },
  {
    id: "pedestrian-crossing-island",
    question: "What does an island in the centre of a pedestrian crossing mean?",
    answer: [
      "Zebra crossings with a central island should be treated as two separate crossings.",
      "Pelican crossings that go straight across the road count as one crossing even if there is a central island.",
      "If Pelican crossings on either side of the central island are not in a straight line, meaning they are staggered, they count as two separate crossings."
    ]
  },
  {
    id: "white-zig-zag-zebra",
    question: "What do the white zig-zag lines at a zebra crossing mean?",
    answer: ["No overtaking or parking."]
  },
  {
    id: "national-motorway-speed-limits",
    question: "What is the speed limit on national roads, primary and secondary, and on motorways?",
    answer: [
      "National roads: 100km/h.",
      "Motorways: 120km/h."
    ]
  },
  {
    id: "built-up-area-speed-limits",
    question: "What are the speed limits in built up areas?",
    answer: ["Usually 50km/h unless special speed limits apply to designated roads and zones. Special speed limits are generally 30km/h or 60km/h."]
  },
  {
    id: "minimum-tyre-tread-depth",
    question: "What is the minimum tread depth on tyres?",
    answer: ["Most vehicles on the road must have a minimum tread depth of 1.6mm over their main treads."]
  },
  {
    id: "bus-lane-rules",
    question: "What are the rules regarding bus lanes?",
    answer: [
      "A with-flow bus lane runs in the same direction as the traffic beside it. It can be used by bicyclists and taxis as well as buses, and is reserved during the times shown on the information plate.",
      "A contra-flow bus lane is reserved only for buses, which means no other traffic may use it day or night."
    ]
  },
  {
    id: "parking-distance-from-junction",
    question: "How far away should you park from a junction?",
    answer: ["Over 5 metres."]
  },
  {
    id: "right-turn-one-way-street-position",
    question: "What position would you take up for a right turn in a one-way street?",
    answer: ["When turning right from a one-way street, drive as close as you can to the right-hand side."]
  },
  {
    id: "hatched-markings",
    question: "What are hatched markings?",
    answer: ["Hatched markings are diagonal or chevron markings on the road that can be used for merging traffic, diverging traffic, and separating traffic travelling in opposite directions, such as central median islands. If you see these markings on the road you must not enter the area they cover."]
  },
  {
    id: "yield-sign-meaning",
    question: "What does a yield sign mean?",
    answer: ["If you see a Yield sign on the road, usually near a junction or roundabout, you must give way to traffic on a major road ahead or on the roundabout and you must not proceed unless it is safe to do so."]
  },
  {
    id: "filter-light",
    question: "What is a filter light?",
    answer: ["An arrow light, green or amber. You may proceed in the direction of the arrow if it is safe to do so."]
  },
  {
    id: "amber-traffic-light-action",
    question: "You are approaching traffic lights and they change to amber. What action should you take?",
    answer: ["Stop unless it is unsafe to do so."]
  },
  {
    id: "flashing-amber-traffic-light",
    question: "What does a flashing amber traffic light mean?",
    answer: ["Proceed if the crossing is clear, but pedestrians have priority."]
  },
  {
    id: "flashing-red-traffic-lights",
    question: "What do flashing red traffic lights mean?",
    answer: ["Stop, train approaching."]
  },
  {
    id: "continuous-yellow-line",
    question: "What does a continuous yellow line at the side of a road mean?",
    answer: ["No parking during certain hours."]
  },
  {
    id: "double-continuous-yellow-lines",
    question: "What do double continuous yellow lines at the side of the road mean?",
    answer: ["No parking at any time."]
  },
  {
    id: "where-not-park-examples",
    question: "Give examples of where you would not park.",
    answer: ["Near a bend, the brow of a hill, a hump back bridge, opposite a single or continuous white line, where your vehicle would obstruct a sign, at an entrance, opposite another vehicle on a narrow road, at a taxi rank, near a junction, at a bus stop, or on a footpath."]
  },
  {
    id: "parking-distance-pedestrian-crossing",
    question: "Within what distance from a pedestrian crossing should you not park?",
    answer: ["15 metres before or 5 metres after."]
  },
  {
    id: "dual-carriageway-narrow-median-crossing",
    question: "What procedure must you adopt if crossing a dual carriageway with a narrow central median?",
    answer: ["If the median is too narrow for your vehicle, you must wait until you can complete the crossing."]
  },
  {
    id: "motorway-vs-dual-carriageway",
    question: "What are the differences between a motorway and a dual carriageway?",
    answer: ["On motorways, exits are to the left only, there are no traffic lights, no junctions, no roundabouts, and 120km/h speed limits may apply."]
  },
  {
    id: "unmarked-crossroads-priority",
    question: "Who has priority at an unmarked crossroads with roads of equal importance?",
    answer: ["Give priority to traffic on the junction and traffic approaching from your right."]
  },
  {
    id: "no-entry-road-markings",
    question: "What are the road markings for no entry?",
    answer: ["A continuous and a broken white line with the words \"NO ENTRY\"."]
  },
  {
    id: "country-roads-hazards",
    question: "What would you look out for on country roads?",
    answer: ["Pedestrians, animals, muddy surfaces, concealed entrances, and slow moving farm machinery."]
  },
  {
    id: "when-being-overtaken",
    question: "When being overtaken, what must you not do?",
    answer: ["Increase your speed."]
  },
  {
    id: "never-make-u-turn",
    question: "Where would you never make a U-turn?",
    answer: ["In a one-way street, where there is a continuous white line or lines, or where a sign directs you not to."]
  },
  {
    id: "tailgating-meaning",
    question: "What is meant by tailgating?",
    answer: ["Driving too close to a vehicle in front and not keeping a safe distance."]
  },
  {
    id: "human-factors-driving",
    question: "What human factors can affect your driving?",
    answer: ["Alcohol, drugs, including prescription and non-prescription drugs, tiredness and fatigue, road rage, and attitude."]
  },
  {
    id: "coasting-danger",
    question: "What is coasting and why is it potentially dangerous?",
    answer: ["Coasting is when the vehicle is not being driven by the engine, for example when the clutch pedal is held down or the gear lever is in neutral. It is dangerous because it reduces the driver's control of the vehicle."]
  },
  {
    id: "seat-belt-responsibility",
    question: "Who is responsible for seat belts?",
    answer: [
      "For passengers under 17 years of age, the driver is responsible.",
      "For passengers 17 years of age and over, the person themselves is responsible."
    ]
  },
  {
    id: "multi-lane-dual-carriageway-lane",
    question: "When following the road ahead on a multi-lane dual carriageway, which lane would you normally use?",
    answer: ["You would normally use lane 1, or the left-hand driving lane, unless road markings indicate otherwise."]
  },
  {
    id: "two-second-rule",
    question: "What is the 2 second rule?",
    answer: ["It is used as a measure of a safe following distance of at least 2 seconds in dry conditions, doubled in the wet and extended further in icy conditions."]
  }
];

const elements = {
  themeToggle: document.querySelector("#themeToggle"),
  progress: document.querySelector("#questionProgress"),
  progressFill: document.querySelector("#questionProgressFill"),
  allQuestionsDeck: document.querySelector("#allQuestionsDeck"),
  trickyQuestionsDeck: document.querySelector("#trickyQuestionsDeck"),
  allQuestionsCount: document.querySelector("#allQuestionsCount"),
  trickyQuestionsCount: document.querySelector("#trickyQuestionsCount"),
  questionNumber: document.querySelector("#questionNumber"),
  questionText: document.querySelector("#questionText"),
  toggleTrickyQuestion: document.querySelector("#toggleTrickyQuestion"),
  answerPanel: document.querySelector("#questionAnswerPanel"),
  answer: document.querySelector("#questionAnswer"),
  showAnswer: document.querySelector("#showQuestionAnswer"),
  nextQuestion: document.querySelector("#nextQuestion"),
  restartQuestions: document.querySelector("#restartQuestions")
};

const state = {
  deck: [],
  currentIndex: 0,
  deckMode: "all",
  trickyQuestions: new Set()
};

const storage = {
  read(key, fallback = null) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }
};

const shuffle = (items) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

const getQuestionById = (id) => QUESTIONS.find((question) => question.id === id);

const getActiveQuestions = () => {
  if (state.deckMode === "tricky") {
    return [...state.trickyQuestions]
      .map(getQuestionById)
      .filter(Boolean);
  }

  return QUESTIONS;
};

const applyTheme = (theme) => {
  const isDark = theme === "dark";
  document.body.dataset.theme = isDark ? "dark" : "light";
  elements.themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
  elements.themeToggle.setAttribute("aria-pressed", String(isDark));
};

const initializeTheme = () => {
  const savedTheme = storage.read(THEME_STORAGE_KEY);
  const systemPrefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));
};

const toggleTheme = () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  storage.write(THEME_STORAGE_KEY, nextTheme);
};

const updateProgress = () => {
  const total = state.deck.length;
  const shown = total ? state.currentIndex + 1 : 0;
  const remaining = Math.max(total - shown, 0);

  elements.progress.textContent = total ? `${remaining} left` : "0 questions";
  elements.progressFill.style.width = total ? `${(shown / total) * 100}%` : "0%";
};

const updateDeckControls = () => {
  elements.allQuestionsDeck.setAttribute("aria-pressed", String(state.deckMode === "all"));
  elements.trickyQuestionsDeck.setAttribute("aria-pressed", String(state.deckMode === "tricky"));
  elements.allQuestionsCount.textContent = `${QUESTIONS.length} questions`;
  elements.trickyQuestionsCount.textContent = `${state.trickyQuestions.size} saved`;
};

const saveTrickyQuestions = () => {
  storage.write(TRICKY_QUESTIONS_STORAGE_KEY, [...state.trickyQuestions]);
  updateDeckControls();
};

const updateTrickyButton = () => {
  const currentQuestion = state.deck[state.currentIndex];
  const isTricky = currentQuestion ? state.trickyQuestions.has(currentQuestion.id) : false;
  elements.toggleTrickyQuestion.textContent = isTricky ? "Remove Tricky" : "Mark Tricky";
  elements.toggleTrickyQuestion.setAttribute("aria-pressed", String(isTricky));
  elements.toggleTrickyQuestion.hidden = !currentQuestion;
};

const renderAnswer = (answerLines) => {
  elements.answer.replaceChildren();

  if (answerLines.length === 1) {
    const line = document.createElement("p");
    line.className = "answer-line";
    line.textContent = answerLines[0];
    elements.answer.append(line);
    return;
  }

  const list = document.createElement("ul");
  list.className = "answer-list";

  answerLines.forEach((answerLine) => {
    const item = document.createElement("li");
    item.textContent = answerLine;
    list.append(item);
  });

  elements.answer.append(list);
};

const showCurrentQuestion = () => {
  const currentQuestion = state.deck[state.currentIndex];

  if (!currentQuestion) {
    elements.questionNumber.textContent = "Tricky";
    elements.questionText.textContent = "No tricky questions saved yet";
    elements.answer.replaceChildren();
    elements.answerPanel.hidden = true;
    elements.showAnswer.hidden = true;
    elements.nextQuestion.hidden = true;
    elements.restartQuestions.hidden = true;
    updateProgress();
    updateTrickyButton();
    return;
  }

  elements.questionNumber.textContent = `Question ${state.currentIndex + 1} of ${state.deck.length}`;
  elements.questionText.textContent = currentQuestion.question;
  renderAnswer(currentQuestion.answer);
  elements.answerPanel.hidden = true;
  elements.showAnswer.hidden = false;
  elements.nextQuestion.hidden = true;
  elements.restartQuestions.hidden = true;
  updateProgress();
  updateTrickyButton();
};

const finishDeck = () => {
  elements.questionNumber.textContent = "Complete";
  elements.questionText.textContent = "Question deck complete";
  elements.answer.replaceChildren();
  elements.answerPanel.hidden = true;
  elements.toggleTrickyQuestion.hidden = true;
  elements.showAnswer.hidden = true;
  elements.nextQuestion.hidden = true;
  elements.restartQuestions.hidden = false;
  elements.progress.textContent = "Complete";
  elements.progressFill.style.width = "100%";
  elements.restartQuestions.focus();
};

const startDeck = () => {
  state.deck = shuffle(getActiveQuestions());
  state.currentIndex = 0;
  showCurrentQuestion();
};

const setDeckMode = (mode) => {
  state.deckMode = mode;
  updateDeckControls();
  startDeck();
};

const revealAnswer = () => {
  elements.answerPanel.hidden = false;
  elements.showAnswer.hidden = true;
  elements.nextQuestion.hidden = false;
  elements.nextQuestion.focus();
};

const nextQuestion = () => {
  state.currentIndex += 1;

  if (state.currentIndex >= state.deck.length) {
    finishDeck();
    return;
  }

  showCurrentQuestion();
};

const toggleTrickyQuestion = () => {
  const currentQuestion = state.deck[state.currentIndex];

  if (!currentQuestion) {
    return;
  }

  if (state.trickyQuestions.has(currentQuestion.id)) {
    state.trickyQuestions.delete(currentQuestion.id);
  } else {
    state.trickyQuestions.add(currentQuestion.id);
  }

  saveTrickyQuestions();
  updateTrickyButton();

  if (state.deckMode === "tricky" && !state.trickyQuestions.has(currentQuestion.id)) {
    state.deck = state.deck.filter((question) => question.id !== currentQuestion.id);

    if (!state.deck.length) {
      showCurrentQuestion();
      return;
    }

    if (state.currentIndex >= state.deck.length) {
      state.currentIndex = state.deck.length - 1;
    }

    showCurrentQuestion();
  }
};

elements.themeToggle.addEventListener("click", toggleTheme);
elements.allQuestionsDeck.addEventListener("click", () => setDeckMode("all"));
elements.trickyQuestionsDeck.addEventListener("click", () => setDeckMode("tricky"));
elements.toggleTrickyQuestion.addEventListener("click", toggleTrickyQuestion);
elements.showAnswer.addEventListener("click", revealAnswer);
elements.nextQuestion.addEventListener("click", nextQuestion);
elements.restartQuestions.addEventListener("click", startDeck);

initializeTheme();
state.trickyQuestions = new Set(storage.read(TRICKY_QUESTIONS_STORAGE_KEY, []));
updateDeckControls();
startDeck();
