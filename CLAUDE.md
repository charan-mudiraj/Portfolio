# Charan Mudiraj – Portfolio

Personal portfolio site for Charan Mudiraj. The people reading it are recruiters and hiring managers, so accurate content and a professional look matter more than clever features.

The code was written in Sep 2024 – Feb 2025, before Charan's first full-time role and without AI tools, and hasn't been touched since. It's now being brought up to date with Claude Code.

## About Charan (source of truth for site content)

Full-stack developer in Hyderabad, India. B.Tech CSE, AVN Institute of Engineering and Technology (2021 – 2025).

Experience. These titles and dates match the offer and experience letters, so use them exactly:

- **GrowMeOrganic**
  - Frontend Developer, full-time, Sep 2025 – present. Has also worked on the Django backend since Jan 2026.
  - Frontend Developer Intern, Sep 2024 – Aug 2025.
  - Work done there:
    - Backend features in Django and PostgreSQL: reviewing UI designs, planning the architecture, writing DB migrations and REST APIs.
    - Led the project to build an internal tool that creates and maintains designs using Claude Code.
    - CSV upload and download that goes straight between the browser and S3, using presigned URLs.
    - Internal React tools for tracking revenue, subscriptions and users, built on the Django backend.
    - Pages, components and features for the main React app and the Astro.js marketing site.
    - A custom React Router `dataStrategy` that lets child loaders await their parent loader's promise ([blog post](https://code-with-charan.hashnode.dev/handling-dependent-loaders-in-react-router-accessing-parent-loaders-promise-in-a-child-loader)).
    - Interviewed React intern candidates and co-led the intern team.
- **Wuri (Y Combinator W24)**
  - Software Developer Intern, Jun – Jul 2024.
  - Work done there:
    - The only full-stack developer at the startup.
    - Built the IFF24 submission site (React, Firebase), which got 900+ submissions.
    - Built the first company website from Figma designs.
    - Built a Firestore admin dashboard.
    - Wrote Firebase Cloud Functions and the Firebase-to-MongoDB migration.

Skills:

- **Languages:** JavaScript, TypeScript, Python, SQL, Java
- **Frontend:** React, React Router, Astro.js, Next.js, Tailwind
- **Backend:** Django, REST APIs, FastAPI, Node.js, Express
- **Databases:** PostgreSQL, MongoDB, Firestore
- **Cloud & tools:** AWS (S3, EC2, CloudFront), GCP, Git, Claude Code

Links:

- GitHub: github.com/Charan-Mudiraj
- LinkedIn: linkedin.com/in/charan-mudiraj-868086230
- Blog: code-with-charan.hashnode.dev, with posts on the React Router fix and on building the Chat App.

Rules for content:

- Don't invent metrics, user counts, team sizes or achievements. If a piece of copy needs a number, ask Charan.
- Don't upgrade job titles (for example to "Full Stack Engineer") and don't add other employers. Background checks compare them against the letters.
- If Charan gives newer details, they win over this section. Update the section to match.

## Where the site is now

The home page has:

- a header ("Hello there! I'm" + name, tagline, location, and GitHub, LinkedIn and Blog links) over a faint grid-and-glow background;
- an Experience section (GrowMeOrganic and Wuri);
- skill icons that filter the project grid;
- 11 project cards.

The online-status dot and the visitor chat widget have been hidden since 2026-11-10, to keep the site simple. Their code is still in the repo; see "How things work".

These parts are out of date compared with the profile above:

- `metadata.description` in `src/app/layout.tsx` still says "MERN stack and Next.js ... multiple internship experiences".
- There's no about, resume or contact section. The header links to GitHub, LinkedIn and the blog.
- The skill icons (`skillIconsKeywords` in `src/lib/constants.ts`) are missing Python, Django, PostgreSQL, Astro and React Router.
- All the projects are from before the job. Chat App and Get JSON are the two Charan lists on the resume. The rest are clones and take-home assignments.
- It was built desktop-first (fixed 318px cards, the "More Details" dialog) and the project cards haven't been checked on mobile. The page padding and the skills row are now responsive, and the header and Experience section have been checked at 360px.
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
- [ ] **Update skills and metadata.**
  - Add skill icons for Python, Django, PostgreSQL, Astro and React Router. Check that each icon id exists on skillicons.dev first.
  - The skill icons also filter the projects, so a skill that no project uses shows "No projects to show". Decide with Charan how to handle that, for example a separate non-filtering skills list.
  - Rewrite `metadata.description` in `src/app/layout.tsx` to match the current profile.
- [ ] **Resume download button.**
  - Charan provides the current PDF. Put it in `public/` and link to it near the greeting at the top of the page.
  - Replace the PDF whenever the resume changes, and don't edit its contents here.
- [ ] **Mobile layout.**
  - Make the page work down to about 360px wide.
  - Known problem spots:
    - the fixed `w-[318px]` cards;
    - the "More Details" dialog's `max-w-[calc(100%-100px)]`;
    - the fixed chat widget, if it comes back (it covers text while scrolling).
- [ ] **Narrow down the projects.**
  - Keep a few of the strongest projects. Chat App and Get JSON are the two on the resume.
  - Ask Charan which others stay before removing any.

## Stack

- Next.js 14 (App Router), React 18, strict TypeScript, Tailwind 3.
- UI: shadcn/ui (new-york style, zinc) on Radix, plus lucide-react. MUI is used only for `Tooltip` and a few icons.
- State: Jotai.
- Data: `marked` for project READMEs. Firebase (Firestore) is only used by the hidden online-status and chat features, so it isn't in the page bundle right now.
- There is no backend of its own. The hidden features talk to Firestore from the browser.

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
src/app/layout.tsx              Font (Poppins 300), metadata, theme provider (dark by default)
src/app/globals.css             Theme variables, .page-backdrop (grid + glow), README styles
src/app/admin/chat/page.tsx     Placeholder ("My Chat"); there is no admin chat UI yet
src/components/Hero.tsx         Top-of-page header (name, tagline, location, links)
src/components/Experience.tsx   Experience section (company cards with a role timeline)
src/components/ProjectCard.tsx  Preview/About tabs, thumbnail fallback, YouTube preview on hover, "More Details" dialog
src/components/Chat.tsx         Visitor chat widget (hidden; not imported anywhere)
src/components/ui/              shadcn components
src/lib/constants.ts            Profile, experience entries, project data, skill icon codes, message strings
src/lib/chat_utils.ts           Firestore helpers for visitors and messages (used only by Chat.tsx)
src/firestore.tsx               Firebase init; exports DB (and DBStorage, which is unused)
```

## How things work

**Projects.**

- Each entry in `projects` (`src/lib/constants.ts`) has `title` and `about` as HTML strings, rendered with `dangerouslySetInnerHTML`.
- `stack` holds `Skill` objects. Each `code` is a skillicons.dev icon id, used as `https://skillicons.dev/icons?i=<code>`.
- Thumbnails live in the Firebase Storage bucket `portfolio-4c137`, which currently returns 402 (see the roadmap). `ProjectThumbnail` falls back to `https://i.ytimg.com/vi/<youtubeVideoId>/hqdefault.jpg`, then to the stack icons.
- "More Details" fetches the repo's README.md from raw.githubusercontent.com, trying `main` first and then `master`. It converts the README with `marked` and rewrites `./` image paths to absolute URLs.

**Header.** `profile` in `src/lib/constants.ts` holds the name, tagline ("Full-stack developer", from the first line of "About Charan"), location and links. `Hero.tsx` renders it.

**Experience.**

- The entries are in `experience` (`src/lib/constants.ts`), as plain strings rather than HTML, and the text matches "About Charan". When that section changes, update the entries too.
- A highlight with a `link` renders as `text (label).`, so leave the closing period off its `text`.
- Tailwind only scans `src/app` and `src/components`, so keep class names out of the data in `src/lib`.

**Skill filter.** The selected skills live in `skillsFilterAtom` (Jotai). A project is shown only if its stack includes every selected skill.

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

## Working on this repo

- Charan hasn't read this code since early 2025, so briefly explain non-obvious changes and call out any old code a change depends on.
- Ask before major-version upgrades (Next, React, Tailwind, Firebase) and before adding or removing UI libraries.
- Commit only when asked.
