# Irish Road Signs Study Tool

A responsive, browser-based study tool for learning Irish road signs. The app shuffles signs into non-repeating study decks, reveals answers on demand, and lets users save difficult signs into a persistent "Tricky" deck using the browser's built-in `localStorage`.

## Features

- Shuffled study decks with no repeats until the deck is complete
- Deck options for all signs, common signs, and user-saved tricky signs
- Persistent tricky-sign practice powered by `localStorage`
- Complete ordered sign reference
- Dedicated common-sign reference page
- Responsive dashboard-style interface for mobile, tablet, and desktop
- Accessible semantic HTML, keyboard-friendly controls, and high-contrast UI states

## How To Use

1. Open the study tool in a browser through a local server or GitHub Pages.
2. Choose a deck: `All Signs`, `Most Common`, or `Tricky`.
3. Look at the sign and try to recall the meaning.
4. Select `Show Answer` to reveal the definition.
5. Use `Mark Tricky` to save difficult signs for later review.
6. Select `Next Sign` to continue through the shuffled deck.
7. Visit the `All Signs` or `Common Signs` views to review signs in order.

## Technologies Used

- HTML5
- CSS3 with Grid, Flexbox, custom properties, and responsive media queries
- Vanilla JavaScript using ES6+ syntax
- Browser `localStorage`
- Static JSON data

## Project Structure

```text
.
├── Images/
│   └── sign (...).png
├── app.js
├── common.html
├── common.js
├── index.html
├── README.md
├── signs-data.js
├── signs.json
└── styles.css
```

## Running Locally

You can open `index.html` directly in a browser. For the closest match to GitHub Pages behavior, run it through a local server:

Using Python:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Hosting With GitHub Pages

1. Create a new GitHub repository.
2. Add the project files to the repository, including `index.html`, `styles.css`, `app.js`, `signs.json`, `common.html`, `common.js`, and the `Images` folder.
3. Commit and push the files to GitHub.
4. Open the repository on GitHub.
5. Go to `Settings` > `Pages`.
6. Under `Build and deployment`, choose `Deploy from a branch`.
7. Select the `main` branch and the root folder `/`.
8. Save the settings.
9. GitHub will publish the site and provide a Pages URL.

## Customizing The Data

Edit `signs.json` to update sign definitions. The keys should match the sign numbers used in the image filenames, for example:

```json
{
  "1": "No Entry",
  "9": "Rural Speed Limit 80km/h"
}
```

Images should be stored in the `Images` folder using the pattern:

```text
sign (1).png
sign (2).png
```

The app also includes `signs-data.js` as a fallback so it can run when opened directly from the filesystem. If you change `signs.json`, update `signs-data.js` with the same definitions.
