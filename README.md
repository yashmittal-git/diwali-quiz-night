# Dimag ki Aatishbaazi - Diwali Quiz Night

A host-controlled Diwali party quiz: 10 rounds x 6 questions, a configurable
team count (2-8 teams, picked on the rules screen before naming teams),
5-second auto-start timer (2s pause), steal rule, manual host scoring (+10/+5), three
20-point Patakha extras (Godiji, Aankhon Ki Gustakhiyan, Grid Gains), a host
handbook with every answer, and a party-code gate (2222) to keep guests from
peeking at questions and answers.

## Run locally

    npm install
    npm run dev        # http://localhost:5173

## Production build

    npm run build      # outputs static site to dist/
    npm run preview    # serve the production build locally

The dist/ folder in this package is a prebuilt production build of the same code.

## Party code

The gate code is 2222 (four times two). It is anti-peeking only: anyone who
reads this source can see it. Home, rules and photo credits are public; the
code is required before rounds, questions, the Patakha extras and the host
handbook. It re-locks on every page load and does not touch saved scores.
To change it, edit PARTY_CODE in src/App.tsx.

## Host handbook

All answers (60 base + 3 Patakha), phone-friendly. Open it from the
"Host handbook" button on the home screen or the "Handbook" button on the
rounds screen, or press H on the home screen. On a self-hosted copy you can
also open the URL with #host. The handbook needs the party code too.

## Deploy to GitHub Pages with diwaliparty.yashmittal.co.in

1. Create a PUBLIC GitHub repository (e.g. diwali-quiz) and push this project.
2. In repo Settings -> Pages, deploy from the main branch (or use the
   Vite GitHub Actions workflow) - GitHub Pages is free for public repos.
3. The site builds with relative base './', so the SAME build works at the
   default project URL (<user>.github.io/<repo>/) and later at the custom
   subdomain root - no rebuild needed when the domain lands.
4. Add diwaliparty.yashmittal.co.in as the custom domain in the repo's Pages
   settings FIRST (this stops anyone else claiming it), then at your DNS
   provider (GoDaddy) create one CNAME record:
   diwaliparty.yashmittal.co.in -> <your-username>.github.io
   HTTPS is provisioned automatically. Do not use wildcard DNS records.

## Editing questions

All questions, answers and the lakes bank live in src/data.ts. The two Patakha
extras are in src/patakha.tsx. The handbook reads the same data, so it never
drifts from the game. Photo credits are on the in-app credits page; images
marked "supplied by the host" are Yash's own and unverified for license.
