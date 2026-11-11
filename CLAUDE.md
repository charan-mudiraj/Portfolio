# Charan Mudiraj – Portfolio

Personal portfolio site for Charan Mudiraj. The people reading it are recruiters and hiring managers, so accurate content and a professional look matter more than clever features.

The code was written in Sep 2024 – Feb 2025, before Charan's first full-time role and without AI tools, and hasn't been touched since. It's now being brought up to date with Claude Code.

## About Charan (source of truth for site content)

Full-stack engineer in Hyderabad, India (Charan's wording for the site header, 2026-11-11; the resume says "Full-stack developer"). B.Tech CSE, AVN Institute of Engineering and Technology (2021 – 2025).

Experience. The dates match the offer and experience letters, so use them exactly. The titles match too, with one exception noted below:

- **GrowMeOrganic**
  - Full Stack Engineer, full-time, Sep 2025 – present. Has also worked on the Django backend since Jan 2026.
    - The offer letter and the resume say "Frontend Developer". On 2026-11-11 Charan chose to show "Full Stack Engineer" on the site, after being told that background checks compare titles against the letters and that the linked resume says otherwise. Don't change it back without asking him.
  - Frontend Developer Intern, Sep 2024 – Aug 2025.
  - Tech used (Charan, 2026-11-11): React, React Router, Astro.js, Lottie, Django, Celery, REST APIs, PostgreSQL, Stripe, Docker, AWS S3, Claude Code. No Python chip; Charan said Django is enough.
  - Work done there:
    - Backend features in Django and PostgreSQL: reviewing UI designs, planning the architecture, writing DB migrations and REST APIs.
    - Led the project to build an internal tool that creates and maintains designs using Claude Code.
    - CSV upload and download that goes straight between the browser and S3, using presigned URLs.
    - A script that generates CSV files from JSON data (added by Charan 2026-11-11; no further detail given yet).
    - Internal React tools for tracking revenue, subscriptions and users, built on the Django backend.
    - Pages, components and features for the main React app and the Astro.js marketing site.
    - A custom React Router `dataStrategy` that lets child loaders await their parent loader's promise ([blog post](https://code-with-charan.hashnode.dev/handling-dependent-loaders-in-react-router-accessing-parent-loaders-promise-in-a-child-loader)).
    - Interviewed React intern candidates and co-led the intern team.
- **Wuri (Y Combinator W24)**
  - Software Developer Intern, Jun – Jul 2024.
  - Tech used: React, Tailwind CSS, Node.js (both added by Charan 2026-11-11), Firestore, Firebase Cloud Functions, Google Cloud Platform, MongoDB.
  - Work done there:
    - The only full-stack developer at the startup.
    - Built the IFF24 submission site (React, Firebase), which got 900+ submissions.
    - Built the first company website from Figma designs.
    - Built a Firestore admin dashboard.
    - Wrote Firebase Cloud Functions and the Firebase-to-MongoDB migration.

Skills:

These match the "Technical Skills" section of the resume (`public/Charan_Mudiraj_Resume.pdf`) as of 2026-11-10:

- **Languages:** JavaScript, TypeScript, Python, SQL, Java, HTML, CSS
- **Frontend:** React, React Router, Astro.js, Next.js, Recoil, Tailwind CSS
- **Backend:** Django, REST APIs, FastAPI, Node.js, Express.js, Firebase Cloud Functions
- **Databases:** PostgreSQL, MongoDB, Firebase Firestore
- **Cloud & tools:** AWS (S3, EC2, CloudFront), Google Cloud Platform, Git, GitHub, Claude Code
- **Used at GrowMeOrganic, not on the resume (Charan, 2026-11-11):** Lottie, Celery, Stripe, Docker.
- **On the site but not on the resume (Charan asked to keep them):** Bootstrap, Material UI, Dart, Flutter, C, Adobe Photoshop.

Links:

- GitHub: github.com/Charan-Mudiraj
- LinkedIn: linkedin.com/in/charan-mudiraj-868086230
- Blog: code-with-charan.hashnode.dev, with posts on the React Router fix and on building the Chat App.
- WhatsApp: +91 79932 92606, linked as `wa.me/917993292606`.
- Email: r.charan.m.gm@gmail.com (from the resume; Charan asked for an "Email me" button on 2026-11-10).
- Resume: `public/Charan_Mudiraj_Resume.pdf`. Charan supplies it. Its dates match "Experience" above, but it still titles the current role "Frontend Developer" (see the exception above).

Rules for content:

- Don't invent metrics, user counts, team sizes or achievements. If a piece of copy needs a number, ask Charan.
- Don't upgrade job titles and don't add other employers. Background checks compare them against the letters. The only exception is the current GrowMeOrganic title, which Charan chose deliberately (see above); for any other title change, point out the risk and ask him first.
- If Charan gives newer details, they win over this section. Update the section to match.

## Where the site is now

The home page has:

- a sticky top bar: section links that highlight the section being read (a menu on phones and tablets), the light/dark toggle, and the name, which fades in once the big one scrolls away;
- a header over a faint grid-and-glow background: "Hello there! I'm" + name, tagline and location; "View resume" and "Download" buttons; and GitHub, LinkedIn, Blog, WhatsApp and Email links;
- an Experience section (GrowMeOrganic and Wuri);
- "What people I've worked with say": three real Slack messages, one from Rudra Gupta (co-founder, GrowMeOrganic) and two from Akshay Megharaj (co-founder, Wuri);
- "Problems I've solved": two case studies (React Router dependent loaders, Wuri dashboard read caching), each with a diagram. The first is interactive;
- 36 skill icons (the resume's skills, plus Lottie, Celery and Stripe from GrowMeOrganic, plus the older ones), each of which filters the project grid;
- 11 project cards. The first 3 show, and a "View more" button reveals the rest;
- "Writing": cards for the two Hashnode posts;
- "Get in touch": email (with a copy button), WhatsApp and LinkedIn;
- a footer: © year and "Back to top". There's no link to the repo; Charan removed it on 2026-11-10.

The theme follows the browser/OS setting until the visitor picks one, and that choice is saved in localStorage under `theme`. Cards fade in on scroll, in-page links scroll smoothly, there's a "Skip to content" link for keyboard users, and the site has link-preview metadata and Vercel Web Analytics.

The online-status dot and the visitor chat widget have been hidden since 2026-11-10, to keep the site simple. Their code is still in the repo; see "How things work".

These parts are out of date compared with the profile above:

- All the projects are from before the job. Chat App and Get JSON are the two Charan lists on the resume. The rest are clones and take-home assignments.
- It was built desktop-first, but every section has now been checked at 360px, including the project cards and the "More details" dialog.
- Firebase Storage returns HTTP 402 for every project thumbnail. Until that's fixed, the cards fall back to the demo video's YouTube thumbnail or the project's stack icons (see the roadmap).

## Roadmap

These are in priority order. Tick an item off when it's done, and add new items as they're agreed.

- [x] **Experience section.**
  - Add GrowMeOrganic and Wuri, using the titles, dates and points from "About Charan" exactly as they're written.
  - Show both GrowMeOrganic roles under one company entry.
- [ ] **Fix the broken project thumbnails.**
  - The Firebase Storage bucket returns HTTP 402 to every request ("Cloud Storage for Firebase no longer supports Firebase projects that are on the no-cost Spark pricing plan"), so all project thumbnails are blank, including on the live site. First seen 2026-11-10.
  - Planned fix: put the images in `public/projects/` and point each project's `imgSrc` at them. Charan provides the image files, because the bucket won't serve them. The alternative is moving the Firebase project to the paid Blaze plan, which is Charan's call.
  - Only the projects that stay after "Narrow down the projects" need images.
  - A stopgap is in place: `ProjectThumbnail` in `ProjectCard.tsx` falls back to the YouTube video thumbnail, then to stack icons. It only kicks in when `imgSrc` fails, so it can stay after the fix. Two of the video thumbnails show movie artwork (Get JSON, Netflix Clone).
- [x] **Testimonials: real messages.** Done 2026-11-10.
  - The messages come from Slack screenshots Charan shared. Each one is quoted word for word, one paragraph per Slack message. Some messages were left out (for example Akshay's first line, which contained a blurred link); none were reworded.
  - On 2026-11-10 Charan confirmed that Akshay and Rudra are OK with being quoted on the site.
  - At Charan's request the leading "Btw" was dropped from Rudra's message. That's the only change; the rest is word for word.
  - Charan asked whether to polish the wording. The decision: don't reword quotes. Instead each card highlights one exact phrase (`highlight`) and shows "via Slack" (`source`). For polished wording, ask the person for a LinkedIn recommendation and quote that instead.
  - The full names come from the LinkedIn URLs Charan gave (akshay-megharaj…, rudra-gupta…). Dates aren't shown because the screenshots don't have them.
  - The `context` lines are from Charan's explanation. He doesn't remember what Rudra's message was about, so it has no context line.
  - To add more: same shape in `testimonials`, word for word, and with the person's OK to publish.
- [ ] **Case studies: Charan to review the wording.**
  - Both are in `caseStudies` in `constants.ts`. The React Router one comes from the resume and blog post.
  - The Wuri one was rewritten on 2026-11-10 from Charan's explanation and a Firestore screenshot (data layout `writers/{date}/iff24-submissions/{id}`, date docs with `lastModifiedTimestamp`). There are no read counts; "dropped significantly" is Charan's wording.
- [ ] **Turn on Vercel Web Analytics.**
  - `<Analytics />` is in `layout.tsx`, but data only flows once Analytics is enabled for the project in the Vercel dashboard.
  - The free plan counts page views. Tracking clicks on the resume buttons needs custom events, which are a paid feature.
- [x] **Update skills.** Done 2026-11-10.
  - The skills row now has every skill on the resume, plus the older ones Charan kept.
  - Charan chose to keep a single clickable row. Skills no project uses (Django, PostgreSQL, Python and others) show "No projects to show" when clicked.
  - Eight skills have no skillicons.dev icon and use local tiles in `public/skills/`: SQL, React Router, Recoil, REST APIs, Claude Code, Lottie, Celery and Stripe.
  - `metadata.description` in `layout.tsx` matches the current profile.
- [x] **Link previews, Writing, Contact, scroll fade-in.** Done 2026-11-10; see "How things work".
- [x] **Resume: view and download.**
  - The PDF is `public/Charan_Mudiraj_Resume.pdf`, served by Vercel's CDN rather than S3. "View resume" opens it in the browser's built-in PDF viewer. "Download" uses the `download` attribute, which only works for same-origin files.
  - Replace the PDF whenever the resume changes, keeping the same file name, and don't edit its contents here.
- [x] **WhatsApp link.**
  - A `wa.me` link in the header, with the pre-filled message "Hi Charan, I came across your portfolio and would like to connect." Both the number and the message are in `profile.whatsapp`.
- [x] **Tech per company.** Done 2026-11-11.
  - Each Experience card has a "Tech used" row (`stack` in `experience`). The lists are under "About Charan" and are now Charan-confirmed.
- [ ] **JSON-to-CSV bullet: Charan to add context.** The GrowMeOrganic bullet "A script that generates CSV files from JSON data." is minimal because no other detail was given. Ask what data it converted and who used it.
- [x] **Mobile layout.** Done 2026-11-10: the whole page works at 360px.
  - Project cards are `w-[318px] max-w-full`.
  - The "More details" dialog is `w-[calc(100%-2rem)] max-w-4xl`, capped at screen height, with the README scrolling and the buttons wrapping.
  - The theme toggle moved into the top bar.
  - If the chat widget comes back, check that it doesn't cover content on phones.
- [ ] **Narrow down the projects.** On hold: on 2026-11-10 Charan said the projects don't match his current level and asked to leave the section as it is for now.
  - Keep a few of the strongest projects. Chat App and Get JSON are the two on the resume.
  - Ask Charan which others stay before removing any.

## Stack

- Next.js 14 (App Router), React 18, strict TypeScript, Tailwind 3.
- UI: shadcn/ui (new-york style, zinc) on Radix, plus lucide-react. MUI is used only for `Tooltip` and a few icons, including WhatsApp.
- Analytics: `@vercel/analytics` (2.x).
- State: Jotai.
- Data: `marked` for project READMEs. Firebase (Firestore) is only used by the hidden online-status and chat features, so it isn't in the page bundle right now.
- There is no backend of its own. The hidden features talk to Firestore from the browser.
- Hosting: Vercel, building `main` from github.com/charan-mudiraj/Portfolio. The Node.js version comes from the Vercel project settings, since `package.json` has no `engines` field. Vercel discontinued 20.x in 2026, and builds on it fail right after cloning, so use 26.x. The build has been checked on Node 24 (local) and 26.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npx tsc --noEmit
```

There are no tests and no ESLint config. Because of that, `npm run lint` starts Next's interactive ESLint setup instead of linting. To check a change:

1. Run `npx tsc --noEmit`.
2. Run `npm run build`.
3. Look at the page in the browser in both light and dark themes.

Firebase config goes in `.env.local`. Only the hidden online-status and chat features read it, so the site runs without it. The file is gitignored; the local copy lists these names with empty values, to be filled from the Firebase console or the hosting dashboard:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
NEXT_PUBLIC_USERID_ENCRYPTION_KEY
```

## Layout

```
src/app/page.tsx                Home page; the whole page is a client component
src/app/layout.tsx              Font (Poppins 300), metadata, theme provider (follows the OS theme until the visitor picks one)
src/app/globals.css             Theme variables, .page-glow + .page-backdrop (grid), animations, README styles
src/app/admin/chat/page.tsx     Placeholder ("My Chat"); there is no admin chat UI yet
src/app/opengraph-image.tsx     Link-preview image (1200x630, edge runtime)
src/components/PageGlow.tsx     Purple glow at the top; replays its bloom on theme change
src/components/SiteNav.tsx      Sticky top bar: section links + "you are here" highlight, phone menu, theme toggle
src/components/ModeToggle.tsx   Light/dark toggle (cross-fades via the View Transitions API)
src/components/Hero.tsx         Top-of-page header (name, tagline, location, resume, links)
src/components/Experience.tsx   Experience section (company cards with a role timeline)
src/components/Testimonials.tsx "What people I've worked with say" (hides placeholders in production)
src/components/CaseStudies.tsx  "Problems I've solved" + their diagrams (interactive loader timeline)
src/components/Writing.tsx      Blog post cards
src/components/Contact.tsx      "Get in touch" (email + copy, WhatsApp, LinkedIn)
src/components/styles.ts        Shared class strings (card, pills, muted text)
src/components/icons.tsx        WhatsApp icon wrapper (MUI icon sized like lucide ones)
src/lib/links.ts                wa.me and mailto: link builders
src/components/ProjectCard.tsx  Preview/About tabs, thumbnail fallback, lazy hover video preview, "More details" dialog
src/components/Chat.tsx         Visitor chat widget (hidden; not imported anywhere)
src/components/ui/              shadcn components
public/skills/                  Skill icon tiles for skills skillicons.dev doesn't have
src/lib/constants.ts            siteUrl, profile, experience, testimonials, case studies, blog posts, projects, skill icon codes, message strings
src/lib/chat_utils.ts           Firestore helpers for visitors and messages (used only by Chat.tsx)
src/firestore.tsx               Firebase init; exports DB (and DBStorage, which is unused)
```

## How things work

**Projects.**

- Each entry in `projects` (`src/lib/constants.ts`) has `title` and `about` as HTML strings, rendered with `dangerouslySetInnerHTML`.
- `stack` holds `Skill` objects. Each `code` is a skillicons.dev icon id, used as `https://skillicons.dev/icons?i=<code>`.
- Thumbnails live in the Firebase Storage bucket `portfolio-4c137`, which currently returns 402 (see the roadmap). `ProjectThumbnail` falls back to `https://i.ytimg.com/vi/<youtubeVideoId>/hqdefault.jpg`, then to the stack icons.
- Only the first `INITIAL_PROJECT_COUNT` (3) projects render until "View more" is clicked. The limit applies after the skill filter, so the button only shows when more than 3 projects match. "Show fewer" jumps back to the Projects heading if it's above the screen. Hidden cards aren't mounted, so their YouTube players don't load until needed.
- "More Details" fetches the repo's README.md from raw.githubusercontent.com, trying `main` first and then `master`. It converts the README with `marked` and rewrites `./` image paths to absolute URLs.

**Header.** `profile` in `src/lib/constants.ts` holds the name, tagline ("Full-stack engineer", from the first line of "About Charan"; it also feeds the page title and the link-preview image), location and links, plus optional `resume`, `whatsapp` and `email` fields. `Hero.tsx` renders it, and each optional button only appears once its field is set. On phones the social links shrink to 44px icon-only buttons so they fit on one row.

**Testimonials.**

- Each entry has `messages` (one paragraph each), an optional `context` line, and name, role and company.
- `highlight` must match the message text character for character; it's rendered as a `<mark>` with a purple highlighter band. In dev, the console warns if it doesn't match.
- `source` shows as a small "via Slack" label. The name links to the person's LinkedIn (`link`) and the company to its page (`companyLink`).
- `Testimonials.tsx` filters out entries with `isPlaceholder` unless `NODE_ENV` is `development`. Next inlines that at build time, so production builds never contain sample quotes, and the section renders nothing if no real entry exists. In dev, placeholder cards carry a "Sample · dev only" badge.
- The section has `id="testimonials"`; the Wuri case study links to it.

**The Wuri case study (how the caching works).**

- Submissions live at `writers/{date}/iff24-submissions/{id}`, and each date doc has a `lastModifiedTimestamp`.
- A Cloud Function trigger sets that timestamp to now whenever a submission in that date's collection is created or updated.
- The dashboard caches each day's submissions in localStorage along with the timestamp it saw. On open it reads only the date docs, and re-fetches a day's submissions only if its timestamp is newer than the cached one.
- `FirestoreCacheDiagram` in `CaseStudies.tsx` shows this using the real July 2024 dates. Which days are marked as changed is illustrative.

**Case studies.**

- The text is in `caseStudies` and the diagrams are in `CaseStudies.tsx`, chosen by `id`. Backticks in the text render as inline code.
- The loader timeline's timings are illustrative and labelled that way. Keep it that way unless Charan gives real measurements.

**Link previews.**

- `metadata` in `layout.tsx` sets the title, description, Open Graph and Twitter tags. `metadataBase` comes from `siteUrl` in `constants.ts`, currently the `vercel.app` address because `bio.charan-mudiraj.top` stopped resolving.
- `opengraph-image.tsx` draws the preview image. It uses the edge runtime because in Next 14 the Node.js build of `next/og` breaks `next build` on Windows (`TypeError: Invalid URL`).

**Top bar and in-page navigation.**

- `SiteNav.tsx` links the sections in `SECTIONS`. Each target needs an `id` and `scroll-mt-20` so it lands below the 56px bar; links whose section isn't on the page are dropped.
- The "you are here" highlight comes from an IntersectionObserver band about 40% down the screen. `SPY_TARGETS` maps watched ids to nav items (`skills` counts as Projects, `intro` clears it), and reaching the page bottom selects Contact.
- The phone/tablet menu is a Radix dropdown with `modal={false}`, so opening it doesn't lock scrolling.
- `html` scrolls smoothly unless the visitor prefers reduced motion. Code that needs an exact jump must pass `{ behavior: "instant" }`; "Show fewer" does, because a smooth scroll racing a layout change was unreliable.

**Project cards.**

- Live, Code and APK are plain links styled as buttons, so there's no button inside a link. The hover video lives in `PreviewMedia`.
- The YouTube player only mounts once the card is within 300px of the screen, and only on devices with `(hover: hover) and (pointer: fine)`; touch screens never load it.
- `playerRef` is set only in `onReady`. The old `ref={playerRef}` made it point at the React component, so an early hover threw.
- The player sits in an `inert` wrapper (set via ref, since React 18 doesn't know the attribute), keeping the invisible iframe out of the tab order and away from screen readers.

**Glow and theme switch.**

- `.page-glow` stacks three radial gradients (beam, core, halo), coloured by `--glow-beam`, `--glow-core` and `--glow-halo`, with stronger values under `.dark`. The `glow-bloom` animation grows it from the top centre on page load.
- `PageGlow.tsx` replays the bloom in a `useLayoutEffect` whenever `resolvedTheme` changes, by resetting the CSS animation through `getAnimations()`.
- `ModeToggle` wraps the switch in `document.startViewTransition` for a 450ms cross-fade. Because next-themes applies the class in an effect, the toggle uses `flushSync(() => setTheme(...))` so the change lands inside the transition callback (checked: the class flips inside the callback).
- Without the View Transitions API, or when the visitor prefers reduced motion, the switch is instant and the glow doesn't animate.

**Fade-in on scroll.** Add the `reveal` class to an element. It's pure CSS in `globals.css` (scroll-driven animations), only applies when the browser supports them and the visitor hasn't asked for reduced motion, and never hides content otherwise.

**Experience.**

- The entries are in `experience` (`src/lib/constants.ts`), as plain strings rather than HTML, and the text matches "About Charan". When that section changes, update the entries too.
- A highlight with a `link` renders as `text (label).`, so leave the closing period off its `text`.
- Tailwind only scans `src/app` and `src/components`, so keep class names out of the data in `src/lib`.

**Skills and the skill filter.**

- `skillIconsKeywords` in `constants.ts` is the skills row, in display order. Its keys are referenced by `projects`, so don't rename them.
- The selected skills live in `skillsFilterAtom` (Jotai). A project is shown only if its stack includes every selected skill.
- Each icon is a `<button aria-pressed>`, so the filter works from the keyboard. Selected skills get a purple ring, and while filtering the rest fade back.
- When no project matches, the empty state checks each company's `stack` in `experience`. If a company used every selected skill, it says so ("At GrowMeOrganic I've worked with AWS S3", using the chip's own title) and links to Experience.
- Icons come from `skillIconSrc()` in `lib/utils.ts`: `https://skillicons.dev/icons?i=<code>`, or the skill's `src` if it has one.
- skillicons.dev answers an unknown id with HTTP 200 and an empty 256-byte SVG, so check a new id's response size, not its status.
- The tiles in `public/skills/` copy skillicons' style: a 256×256 rounded square, `rx=60`, fill `#242938`, with the glyph centred. React Router, Recoil, Claude, Celery and Stripe use Simple Icons logos (CC0, v13.21.0) in brand colours. SQL, REST APIs and Lottie use lucide's `database`, `braces` and `sparkles` glyphs in white; Simple Icons no longer has a LottieFiles logo.

**Hidden: online status and visitor chat.** Neither is rendered, and nothing imports `Chat.tsx` or `firestore.tsx`. To bring them back:

1. Fill in `.env.local`.
2. Fix the chat entries under "Known issues".
3. In `page.tsx`, re-add `<Chat />` and the online-status `useEffect` and dot. The last version of `page.tsx` that had both is `git show 2ef6192:src/app/page.tsx`.

Notes on how they worked:

**Online status.** On page load, the page read `background/online-status` (`{ isOnline: boolean }`) once with `getDoc`. Nothing in this repo writes that document. With an empty `.env.local`, Firestore connects to `projects/undefined` and the read fails with "client is offline".

**Visitor chat (Firestore).**

- When a visitor sends their first message, they get a doc in `users` with the shape `{ id, name, chatId }`, where `chatId === id`.
- That doc id is AES-encrypted and stored in localStorage under the key `userID`. The encryption key is a `NEXT_PUBLIC_` variable (fallback `"123"`), so it ships to the browser. This hides the id but doesn't secure it.
- Messages go into a top-level collection named after the visitor's id, ordered by `id`, a timestamp string from `getUniqueID`.
- A message's status goes WAITING → SENT → SEEN. The visitor's own client switches WAITING to SENT when its write echoes back. SEEN is meant to be set by the reader, but that code is commented out.
- The Firestore security rules aren't in this repo.

## Known issues

- In `ui/button.tsx`, `opacity-${...}` is built by string interpolation and produces `opacity-1`, which isn't a Tailwind class. Tailwind only generates classes that appear as complete strings in the source, so always write full class names.
- `Message.tsx` loads `clock.png`, `sent.png` and `seen.png` with relative paths, which break on nested routes. Use `/clock.png` and so on.
- `firebaseCollectionsNames.backgroud` in the constants is a typo and isn't used. The (hidden) online-status code hardcoded `"background"` instead.
- `getUniqueID` doesn't zero-pad milliseconds, so messages sent within the same second can sort out of order.
- The chat message list renders without React `key`s.
- `public/chat-app.mp4` (58 MB) is committed but unused. `next.svg` and `vercel.svg` are leftovers from the template.
- Imports mix relative paths and the `@/` alias (`@/*` → `src/*`). Both work.
- Dev only: clicking "View more" then "Show fewer" quickly can show `Uncaught (in promise) TypeError: Cannot read properties of null (reading 'playVideo')` in the Next error overlay. React Strict Mode's double mount makes react-youtube delay creating the player, and if the card unmounts first it calls `youtube-player(null)`. Production builds don't double-mount and don't show it (checked 2026-11-10).

## Working on this repo

- Charan hasn't read this code since early 2025, so briefly explain non-obvious changes and call out any old code a change depends on.
- Ask before major-version upgrades (Next, React, Tailwind, Firebase) and before adding or removing UI libraries.
- Commit only when asked.
