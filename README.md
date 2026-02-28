# Project Portfolio

Premium one-page portfolio built with plain HTML, CSS, and JavaScript.

## Files
- `index.html`: Structure (hero, spotlight, about, project wall, story, contact)
- `styles.css`: Full visual system, responsive layout, motion
- `script.js`: Profile data source + rendering logic

## Edit Content
1. Open `script.js`
2. Update the `portfolioData` object:
- `headline`, `tagline`, `about`
- `stats`, `focus`, `skills`, `story`
- `links.github`, `links.linkedin`, `email`
- `projects`:
  - `title`
  - `summary`
  - `category`
  - `stack` (array)
  - `liveUrl` (optional)
  - `codeUrl` (optional)
  - `featured` (optional, one project)

## Run
Open `index.html` in your browser.

## Portrait Photo
- Place your portrait image at `assets/gaby-zaynoun.jpg`.
- If that file is missing, the site automatically uses `assets/profile-placeholder.svg`.

## Deploy (Vercel)
- This project is static and ready for Vercel.
- Repo: `https://github.com/gabyzaynoun/portfolio`
- Import the repo in Vercel and deploy.
